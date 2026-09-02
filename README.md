# 혼여족 Backend

혼여족 서비스의 Backend API 서버입니다.

지역·관광지·여행 루트·커뮤니티 기능을 제공하며,
게시글 이미지는 Cloudflare R2와 비동기 Worker를 이용해 처리합니다.

## Tech Stack

### Application

- Node.js 24
- NestJS 11
- TypeScript
- TypeORM
- PostgreSQL

### Infrastructure

- Cloudflare R2 — Object Storage
- Cloudflare Queues — 이미지 처리 Queue
- Cloudflare Workers — 이미지 처리 Worker
- Cloudflare Images — 이미지 변환
- Render — Backend 배포
- GitHub Actions — CI/CD

## Architecture

```text
                         Client
                           │
                           ▼
                      NestJS API
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
         PostgreSQL              Cloudflare R2
                               Original Upload
                                      │
                                      ▼
                               R2 Event Notification
                                      │
                                      ▼
                              Cloudflare Queue
                                      │
                                      ▼
                              Image Processor
                                  Worker
                                      │
                                      ▼
                            Processed Image (R2)
                                      │
                                      ▼
                                Backend Callback