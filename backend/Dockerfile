FROM node:18-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN pnpm install
COPY backend/ .
RUN pnpm run build

FROM node:18-alpine AS backend
WORKDIR /app/backend
COPY --from=backend-builder /app/backend/dist ./dist
COPY --from=backend-builder /app/backend/package*.json ./
RUN pnpm install --prod
EXPOSE 8080
CMD ["pnpm", "run", "start:prod"]