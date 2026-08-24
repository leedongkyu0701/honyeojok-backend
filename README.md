# 혼여족 Backend

혼자 여행하는 사용자를 위한 지역·관광지·여행 루트·커뮤니티 서비스의 API 서버입니다.

- Service: https://www.honyeojok.com
- Runtime: Node.js 24, NestJS, PostgreSQL, TypeORM

## 구성

애플리케이션은 NestJS 모듈 단위로 구성합니다.

- `auth`: 카카오·구글·네이버 OAuth, JWT Access/Refresh Token, 쿠키 인증
- `users`: 내 프로필, 닉네임, 작성 게시글과 북마크 조회
- `destinations`, `spots`, `tags`, `trip-routes`: 여행 콘텐츠 조회·관리
- `posts`: 게시글, 댓글, 좋아요, 조회 수, 이미지 업로드
- `health`: `GET /health` health check

공통 계층에서는 DTO validation, 예외 응답, 요청 제한, HTTP 캐시, Pino request logging을 처리합니다. 이미지 업로드는 Sharp로 WebP 변환 후 Cloudflare R2에 저장하며, 예외와 DB 오류는 설정에 따라 Sentry로 전송합니다.

```text
src/
├── common/                 # guard, filter, interceptor, decorator
├── config/                 # Zod environment validation 및 typed config
├── database/
│   ├── migrations/
│   └── seeds/
├── infrastructure/         # R2, image processing
├── modules/                # 도메인별 NestJS module
├── app.module.ts
├── data-source.ts          # TypeORM CLI와 deploy seed의 DataSource
└── main.ts
```

## 환경 변수

`.env.example`을 복사해 local 개발 값을 채웁니다.

```bash
cp .env.example .env.local
```

| 용도               | `NODE_ENV`    | `APP_ENV`     |
| ------------------ | ------------- | ------------- |
| Local              | `development` | `local`       |
| Test               | `test`        | `test`        |
| Development server | `production`  | `development` |
| Staging            | `production`  | `staging`     |
| Production         | `production`  | `production`  |

Nest 애플리케이션은 시작 시 Zod schema로 전체 환경 변수를 검증합니다. JWT, OAuth, CORS, R2, Sentry 등의 조건이 맞지 않으면 서버는 시작하지 않습니다.

반면 독립 실행 도구는 필요한 값만 검증합니다.

- TypeORM CLI: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_SSL`
- Local/deploy seed: `APP_ENV`과 위 `DB_*` 값

Local 실행은 `.env.local`을 사용합니다. Staging과 Production은 플랫폼 또는 GitHub Environment에서 환경 변수를 주입하며, `.env.*` 파일을 서버에 배포하지 않습니다.

## 로컬 개발

### 요구 사항

- Node.js `24.x` (`package.json`의 engines 범위: `>=24 <25`)
- PostgreSQL

### 설치와 실행

```bash
npm ci
npm run start:dev
```

`SWAGGER_ENABLED=true`이면 `http://localhost:5001/docs`에서 Swagger UI를 확인할 수 있습니다.

### 품질 검사

```bash
npm run format:check
npm run lint
npm run test
npm run build

# 위 검사를 순서대로 실행
npm run check
```

## 데이터베이스

TypeORM schema synchronization은 사용하지 않습니다. `synchronize=false`, `dropSchema=false`를 유지하고 모든 schema 변경은 migration으로 관리합니다.

### Migration

```bash
# Local TypeScript source와 .env.local 사용
npm run migration:generate -- src/database/migrations/<name>
npm run migration:run:local
npm run migration:show:local
npm run migration:revert:local

# 배포 artifact(dist)와 플랫폼 환경 변수 사용
npm run migration:show:deploy
npm run migration:run:deploy
npm run migration:revert:deploy
```

배포 환경에서는 빌드 후 `dist/data-source.js`를 기준으로 migration을 실행합니다. 자동 workflow는 migration revert를 실행하지 않습니다.

### Seed

```bash
# Local 전용: APP_ENV=local, .env.local, TypeScript source
npm run seed:local

# Staging 또는 Production 전용: 빌드 후 platform process.env 사용
npm run build
npm run seed:deploy
```

`seed:local`은 `APP_ENV=local`만 허용합니다. `seed:deploy`는 `APP_ENV=staging` 또는 `production`만 허용합니다.

Seed는 하나의 transaction에서 Tags, Destinations, Spots, TripRoutes 순서로 처리합니다. 재실행 시 Tags와 Destinations는 slug 기준 upsert를 수행하고, Spots와 TripRoutes는 기존 데이터를 현재 seed 값으로 갱신합니다. TripRoutes는 기존 Day와 Item을 삭제한 뒤 다시 생성하므로 일반 배포에 자동으로 포함하지 않습니다.

Deploy seed는 migration이 모두 적용된 DB에서만 수동으로 실행합니다. GitHub Actions의 `Seed Database` workflow는 Staging에서는 `develop` 브랜치만, Production에서는 `main` 브랜치와 `SEED_PRODUCTION` 확인값만 허용합니다.

## CI/CD

| Workflow            | Trigger                             | 책임                                                                       |
| ------------------- | ----------------------------------- | -------------------------------------------------------------------------- |
| `Backend CI`        | `develop`, `main` 대상 Pull Request | format, lint, test, build 및 빈 PostgreSQL 17에서 migration 전체 실행 검증 |
| `Deploy Staging`    | `develop` push                      | 품질 검사·빌드 후 Staging migration, Render Staging deploy hook 호출       |
| `Deploy Production` | `main` push                         | 품질 검사·빌드 후 Production migration, Render Production deploy hook 호출 |
| `Seed Database`     | 수동 실행                           | migration 적용 여부 확인 후 Staging 또는 Production seed 실행              |

Staging/Production migration과 deploy는 각각 GitHub Environment의 DB variables와 secrets를 사용합니다. 일반 배포 workflow에는 seed를 포함하지 않습니다.

## API와 운영 정책

- OAuth callback은 상태 쿠키를 검증한 뒤 로그인 처리를 수행합니다.
- Refresh Token은 `HttpOnly` cookie로 전달하고 DB에는 Argon2id hash를 저장합니다.
- 전역 `ValidationPipe`는 whitelist, forbidNonWhitelisted, transform 옵션을 사용합니다.
- `helmet`, CORS allowlist, custom throttling guard를 기본 적용합니다.
- Pino는 request ID를 만들고 Authorization·Cookie·Set-Cookie 값을 마스킹합니다.
- `/health`는 Render health check endpoint로 사용합니다.

상세 API 요청·응답과 인증 방법은 서버 실행 후 Swagger 문서에서 확인할 수 있습니다.

## 명령어 요약

| 목적                 | 명령어                         |
| -------------------- | ------------------------------ |
| 개발 서버            | `npm run start:dev`            |
| 빌드 artifact 실행   | `npm run start`                |
| 전체 품질 검사       | `npm run check`                |
| Local migration 실행 | `npm run migration:run:local`  |
| 배포 migration 실행  | `npm run migration:run:deploy` |
| Local seed           | `npm run seed:local`           |
| 배포 seed            | `npm run seed:deploy`          |
