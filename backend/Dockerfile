FROM node:18-alpine AS backend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm run build

FROM node:18-alpine AS backend
WORKDIR /app
COPY --from=backend-builder /app/dist ./dist
COPY --from=backend-builder /app/src ./src
COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install --prod
EXPOSE 8080
CMD ["pnpm", "run", "start:prod"]