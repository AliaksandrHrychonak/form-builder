FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY frontend/ .
RUN pnpm run build

FROM node:18-alpine AS frontend
WORKDIR /app/frontend
COPY --from=frontend-builder /app/frontend/.next ./.next
COPY --from=frontend-builder /app/frontend/public ./public
COPY --from=frontend-builder /app/frontend/pnpm-lock.yaml ./
COPY --from=frontend-builder /app/frontend/node_modules ./node_modules
EXPOSE 3000
CMD ["pnpm", "start"]