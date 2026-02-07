FROM node:20-alpine AS base

RUN addgroup -g 1001 -S nodejs && \
    adduser -S payload -u 1001

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

COPY dist ./dist

ENV NODE_ENV=production

USER payload

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/api/health || exit 1

CMD ["node", "dist/server.js"]
