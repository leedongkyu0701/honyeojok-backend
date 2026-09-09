# 혼여족 Backend

혼자 여행하는 사용자를 위한 지역·스팟·여행 루트·커뮤니티 API 서버입니다. 소셜 로그인과 게시글 이미지 처리 파이프라인을 제공하며, PostgreSQL을 영속 저장소로 사용합니다.

## 구성

- Node.js 24, NestJS 11, TypeScript, TypeORM
- PostgreSQL
- OAuth: Google, Kakao, Naver
- Cloudflare R2, Queues, Workers, Images — 게시글 이미지 처리
- Redis — 선택적 캐시
- Sentry, Pino — 오류 추적 및 구조화 로그

## 로컬 실행

### 요구 사항

- Node.js 24.x (`>=24 <25`)
- npm
- PostgreSQL 17 권장
- Docker — Integration/E2E 테스트 실행 시에만 필요

### 1. 환경 변수 준비

```bash
cp .env.example .env.local
```

`.env.local`에 로컬 PostgreSQL 접속 정보와 JWT secret, OAuth client 정보를 설정합니다. 애플리케이션은 시작 시 환경 변수를 검증하므로, 사용하지 않는 OAuth provider라도 client ID, secret, redirect URI는 채워야 합니다.

로컬 기본값은 `APP_ENV=local`, `NODE_ENV=development`입니다. 두 값의 조합은 [환경 변수 스키마](src/config/env.schema.ts)에서 검증합니다.

### 2. 설치 및 데이터베이스 준비

```bash
npm ci
npm run migration:run:local
npm run seed:local
```

`seed:local`은 태그, 여행지, 스팟, 여행 루트 데이터를 넣습니다. 로컬 환경(`APP_ENV=local`)에서만 실행할 수 있습니다.

### 3. 서버 실행

```bash
npm run start:dev
```

`.env.example`의 기본 포트는 `5001`입니다. `SWAGGER_ENABLED=true`이면 Swagger UI는 `/docs`에서 확인할 수 있습니다.

## 환경 변수

[.env.example](.env.example)가 전체 목록과 기본값의 기준입니다. 주요 규칙은 다음과 같습니다.

| 영역         | 설정                                                                                                                   |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| HTTP         | `FRONTEND_BASE_URL`은 `CORS_ORIGINS`에 포함되어야 합니다. 프록시 뒤에서 실행하면 `TRUST_PROXY`를 설정합니다.           |
| Database     | `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_SSL`은 항상 필요합니다.                                 |
| Auth         | access/refresh JWT secret은 각각 32자 이상이어야 합니다. `COOKIE_SAMESITE=none`이면 `COOKIE_SECURE=true`가 필요합니다. |
| Image upload | `IMAGE_UPLOAD_ENABLED=true`이면 R2 credential, public URL, `MEDIA_WORKER_SECRET`이 모두 필요합니다.                    |
| Redis        | `REDIS_URL`이 비어 있으면 캐시를 비활성화합니다.                                                                       |
| Sentry       | `SENTRY_ENABLED=true`이면 `SENTRY_DSN`이 필요합니다.                                                                   |

개인 credential과 운영 환경 변수는 저장소에 넣지 않습니다. 배포 환경에서는 플랫폼의 환경 변수로 같은 값을 제공합니다.

## 데이터베이스 작업

로컬 명령은 `.env.local`을 사용합니다.

```bash
# migration 생성 및 적용
npm run migration:generate -- src/database/migrations/add-example
npm run migration:run:local

# 상태 확인 또는 마지막 migration 되돌리기
npm run migration:show:local
npm run migration:revert:local
```

배포 대상에서는 먼저 빌드한 뒤 배포 환경 변수를 사용합니다.

```bash
npm run build
npm run migration:run:deploy
npm run migration:show:deploy
npm run seed:deploy
```

`seed:deploy`는 `APP_ENV=staging` 또는 `production`에서만 실행됩니다.

## 테스트와 품질 검사

| 명령                       | 대상                                            | Docker |
| -------------------------- | ----------------------------------------------- | ------ |
| `npm test`                 | `src/**/*.spec.ts` Unit test                    | 불필요 |
| `npm run test:cov`         | Unit test coverage                              | 불필요 |
| `npm run test:integration` | migration, constraint, transaction, persistence | 필요   |
| `npm run test:e2e`         | AppModule + Supertest 핵심 HTTP 흐름            | 필요   |
| `npm run check`            | format, lint, typecheck, Unit test, build       | 불필요 |

Integration과 E2E는 각각 PostgreSQL 17 Testcontainer를 시작하고 migration을 적용한 뒤 종료합니다. 로컬 PostgreSQL이나 `.env.test`에 연결하지 않습니다.

Docker가 준비되어 있지 않다면 먼저 다음을 확인합니다.

```bash
docker info
```

## 이미지 처리 Worker

이미지 업로드를 활성화하면 API와 Worker가 다음 역할을 나눕니다.

1. API가 presigned upload URL을 발급하고 업로드 상태를 PostgreSQL에 기록합니다.
2. R2 object event가 Cloudflare Queue에 전달됩니다.
3. `workers/post-image-processor`가 원본을 검증·변환해 processed object를 저장합니다.
4. Worker가 내부 upload endpoint를 호출해 처리 상태를 갱신합니다.

Worker 개발과 배포 관련 명령은 다음과 같습니다.

```bash
npm run worker:image:dev
npm run worker:image:check
npm run worker:image:dry-run
npm run worker:image:deploy
```

Worker binding과 queue 설정은 [workers/post-image-processor/wrangler.jsonc](workers/post-image-processor/wrangler.jsonc)에 있습니다.

## 디렉터리

```text
src/
  bootstrap/       production/E2E 공용 HTTP bootstrap
  config/          환경 변수 검증과 configuration factory
  common/          guard, filter, interceptor, exception
  modules/         Auth, Posts, TripRoutes, Uploads 등 도메인 모듈
  infrastructure/  R2, Redis adapter
  database/        migration과 seed
test/
  integration/     PostgreSQL Testcontainers integration test
  e2e/             AppModule + Supertest E2E test
  support/         DB container, fixture, E2E app factory
workers/
  post-image-processor/  Cloudflare Queue consumer
```

HTTP server는 공통 bootstrap을 통해 CORS, cookie parser, Helmet, ValidationPipe를 적용합니다. 전역 throttling과 exception filter는 `AppModule`에서 등록하며, `/health/live`와 `/health/ready`는 각각 liveness 및 PostgreSQL readiness를 제공합니다.

## CI

`develop`과 `main` 대상 Pull Request에서는 다음 순서로 검증합니다.

1. `npm run check`
2. PostgreSQL Integration test
3. E2E test
4. 빈 PostgreSQL에 deploy migration 적용 및 상태 확인

CI의 migration smoke check용 PostgreSQL service와 Testcontainers는 역할이 분리되어 있습니다.
