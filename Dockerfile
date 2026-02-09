FROM node:20-alpine AS base

# ---- Install dependencies ----
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy root package files and workspace package files
COPY package.json package-lock.json* ./
COPY apps/web/package.json ./apps/web/package.json
COPY packages/shared/package.json ./packages/shared/package.json

RUN npm ci

# ---- Build ----
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules 2>/dev/null || true
COPY --from=deps /app/packages/shared/node_modules ./packages/shared/node_modules 2>/dev/null || true

# Copy source code
COPY package.json turbo.json ./
COPY apps/web ./apps/web
COPY packages/shared ./packages/shared

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npx turbo build --filter=@fit/web

# ---- Production runner ----
FROM base AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy standalone output
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

USER nextjs

EXPOSE 8080

CMD ["node", "apps/web/server.js"]
