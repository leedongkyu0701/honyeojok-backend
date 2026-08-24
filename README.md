# 혼여족 Backend

혼자 여행하는 사용자를 위한 지역 기반 여행 정보·커뮤니티 플랫폼의 백엔드 API 서버입니다.

## 서비스 링크

- 배포 사이트: `https://www.honyeojok.com`

> 학습용 프로젝트로, 백엔드 서버의 Cold Start로 인해 첫 요청 시 응답에 시간이 걸릴 수 있습니다.

## 프로젝트 소개

혼여족은 여행 지역, 관광지, 여행 루트 정보를 제공하고 사용자가 게시글로 여행 경험을 공유할 수 있도록 하는 서비스입니다. 이 저장소는 NestJS 기반 REST API, 인증, 데이터 저장, 이미지 업로드 기능을 제공합니다.

## 주요 기능

- 카카오·구글·네이버 OAuth 로그인
- Access Token 및 Refresh Token 인증
- 여행지 조회와 검색
- 관광지 조회
- 여행 루트와 북마크
- 게시글·댓글·좋아요
- 이미지 업로드
- 사용자 프로필
- 헬스 체크

## 기술 스택

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Passport
- JWT
- Argon2
- Swagger
- Pino
- Sentry
- Cloudflare R2
- AWS SDK
- Jest

## 주요 기술적 구현

### OAuth 인증

카카오, 구글, 네이버 로그인 요청에서 각 OAuth 제공자 인증 페이지로 리다이렉트합니다. 콜백에서는 HTTPOnly 상태 쿠키로 OAuth `state`를 검증한 뒤 인가 코드를 토큰으로 교환하고, 제공자 사용자 정보를 조회합니다. 이후 제공자 ID를 기준으로 사용자를 조회하거나 생성하고 Refresh Token 쿠키를 설정한 뒤 프런트엔드 로그인 콜백 페이지로 리다이렉트합니다.

### Access Token과 Refresh Token

- Access Token과 Refresh Token을 별도 비밀키로 서명합니다.
- Refresh Token은 `HttpOnly` 쿠키로 전달됩니다.
- Refresh Token 재발급 시 새 Access Token과 Refresh Token을 발급하는 Rotation을 적용합니다.
- DB에는 Argon2id로 해시한 Refresh Token을 저장합니다.
- Refresh Token 쿠키를 이용해 Access Token을 재발급합니다.
- 로그아웃과 회원 탈퇴 시 저장된 Refresh Token을 무효화하고 쿠키를 제거합니다.

### 인증과 권한 처리

- `JwtAccessGuard`: Authorization Bearer Access Token을 검증합니다.
- `JwtRefreshGuard`: Refresh Token 쿠키를 검증합니다.
- `JwtOptionalGuard`: 토큰이 없거나 유효하지 않아도 비회원 요청으로 처리합니다.
- `OriginGuard`: 설정된 프런트엔드 Origin 또는 Referer를 확인합니다.
- `RoleGuard`: `@Roles()` 메타데이터와 사용자 역할을 비교합니다.

### 데이터베이스

PostgreSQL과 TypeORM을 사용합니다. 엔터티 자동 동기화 대신 마이그레이션을 관리하며, 여행지·관광지·여행 루트·게시글 저장 과정에 TypeORM 트랜잭션을 사용합니다.

### API 오류 처리

`BaseException`과 오류 코드를 공통으로 사용하며, 전역 Exception Filter가 오류를 `ok`, `code`, `message`, `requestId`, `path`, `timestamp` 형식으로 응답합니다. PostgreSQL 중복 키 오류와 유효성 검사 오류를 구분하고, 운영 환경에서는 오류의 상세 정보를 노출하지 않습니다.

### 요청 제한 및 로깅

NestJS Throttler로 기본·인증·게시글 요청을 제한합니다. Pino가 요청 로그와 Request ID를 처리하며, Authorization·Cookie·Set-Cookie 헤더는 마스킹합니다. 처리되지 않은 오류와 DB 오류는 Sentry에도 전송합니다.

### 이미지 업로드

게시글 이미지는 Multer로 수신한 뒤 Sharp로 회전 보정, 리사이즈, WebP 변환을 수행하고 Cloudflare R2에 AWS SDK(S3 호환 API)로 업로드합니다. 업로드 중 오류가 나면 이미 업로드한 이미지의 삭제를 시도합니다.

## 프로젝트 구조

```text
src/
├── config                 # 환경 검증과 typed configuration
├── common
├── database               # migrations, seeds, data source
├── infrastructure         # R2 등 외부 인프라 연동
├── modules
│   ├── auth
│   ├── destinations
│   ├── health
│   ├── posts
│   ├── spots
│   ├── tags
│   ├── trip-routes
│   └── users
├── app.module.ts
├── data-source.ts
├── instrument.ts
└── main.ts
```

## 실행 방법

### 요구 환경

- Node.js 24.x (`.nvmrc` 기준)
- PostgreSQL

### 설치

```bash
git clone https://github.com/leedongkyu0701/honyeojok-backend.git
cd honyeojok-backend
npm install
```

### 환경 변수

`.env.example`을 `.env.local`로 복사하고 OAuth·JWT·데이터베이스 값 등 비어 있는 값을 채웁니다. `.env.local`과 `.env.test`는 git에 포함하지 않습니다.

```bash
cp .env.example .env.local
```

`NODE_ENV`는 Node runtime 모드이며 `development`, `test`, `production`만 사용합니다. `APP_ENV`는 배포 stage이며 `local`, `development`, `staging`, `production`, `test`를 사용합니다. 유효한 조합은 다음과 같습니다.

| 용도 | NODE_ENV | APP_ENV |
| --- | --- | --- |
| Local | `development` | `local` |
| Test | `test` | `test` |
| Development 서버 | `production` | `development` |
| Staging | `production` | `staging` |
| Production | `production` | `production` |

기능 정책은 `NODE_ENV`로 추론하지 않습니다. Swagger, 상세 오류, DB TLS, cookie 보안, 로그 형식, 이미지 업로드, Sentry는 각각의 명시적 환경변수로 설정합니다. 시작 시 Zod schema가 모든 필수값과 R2/Sentry/cookie/CORS의 상호 조건을 검증하므로, 잘못된 설정은 요청 처리 전에 실패합니다.

`IMAGE_UPLOAD_ENABLED=false`면 R2 값은 필요하지 않습니다. `true`일 때는 R2 값 전체가 필요합니다. 배포 Development/Staging/Production 환경은 `.env.*` 파일이 아니라 Docker, CI 또는 cloud runtime의 environment/secret injection으로 값을 주입합니다.

`TRUST_PROXY`는 Express가 reverse proxy 뒤의 `X-Forwarded-For`, `X-Forwarded-Proto` 등 forwarded 정보를 신뢰할지 결정하는 boolean 설정입니다. Local에서는 `TRUST_PROXY=false`를 사용하고, Render Staging/Production에서는 `TRUST_PROXY=true`를 사용합니다.

### 서버 실행

```bash
npm run start:dev
```

### Swagger

`SWAGGER_ENABLED=true`이면 `http://localhost:5001/docs`에서 Swagger UI에 접근할 수 있습니다.

## 주요 명령어

| 목적 | 명령어 |
| --- | --- |
| 빌드 | `npm run build` |
| 서버 시작 | `npm run start` |
| Local 서버 | `npm run start:dev` |
| 배포 artifact 서버 | `npm run start:prod` |
| 린트 | `npm run lint` |
| 린트 자동 수정 | `npm run lint:fix` |
| 포맷 확인 | `npm run format:check` |
| 포맷 적용 | `npm run format` |
| 단위 테스트 | `npm run test` |
| E2E 테스트 | `npm run test:e2e` |
| Local migration 생성 | `npm run migration:generate -- src/database/migrations/<name>` |
| Local migration 실행 | `npm run migration:run:local` |
| Local migration 되돌리기 | `npm run migration:revert:local` |
| 배포 migration 실행 | `npm run migration:run:deploy` |
| Local 개발 seed | `npm run seed:local` |

Migration은 entity 변경 뒤 local DB에서 생성하고, migration 코드 검토 후 staging과 production에서는 build artifact에 대해 실행합니다. Production DB를 기준으로 migration을 생성하거나 개발 seed를 production에서 실행하지 않습니다.

## 개발자

- 이동규
- GitHub: https://github.com/leedongkyu0701
