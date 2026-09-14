# ---------- Build ----------
FROM node:24-bookworm-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build


# ---------- Runtime ----------
FROM node:24-bookworm-slim AS runner

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 5001

USER node

CMD ["node", "dist/main.js"]