# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_API_KEY
ARG NEXT_PUBLIC_API_WITH_CREDENTIALS
ARG NEXT_PUBLIC_API_KEY_HEADER
ARG NEXT_PUBLIC_API_LANG_HEADER
ARG NEXT_PUBLIC_DEFAULT_DELAY
ARG NEXT_PUBLIC_UI_COOKIE_MAX_AGE
ARG NEXT_PUBLIC_UI_MOBILE_BREAKPOINT
ARG NEXT_PUBLIC_BASE_PATH
ARG API_KEY_PRIVATE
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG APPLE_CLIENT_ID
ARG APPLE_CLIENT_SECRET

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_KEY=$NEXT_PUBLIC_API_KEY
ENV NEXT_PUBLIC_API_WITH_CREDENTIALS=$NEXT_PUBLIC_API_WITH_CREDENTIALS
ENV NEXT_PUBLIC_API_KEY_HEADER=$NEXT_PUBLIC_API_KEY_HEADER
ENV NEXT_PUBLIC_API_LANG_HEADER=$NEXT_PUBLIC_API_LANG_HEADER
ENV NEXT_PUBLIC_DEFAULT_DELAY=$NEXT_PUBLIC_DEFAULT_DELAY
ENV NEXT_PUBLIC_UI_COOKIE_MAX_AGE=$NEXT_PUBLIC_UI_COOKIE_MAX_AGE
ENV NEXT_PUBLIC_UI_MOBILE_BREAKPOINT=$NEXT_PUBLIC_UI_MOBILE_BREAKPOINT
ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH
ENV API_KEY_PRIVATE=$API_KEY_PRIVATE
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV APPLE_CLIENT_ID=$APPLE_CLIENT_ID
ENV APPLE_CLIENT_SECRET=$APPLE_CLIENT_SECRET

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install PM2 globally
RUN npm install -g pm2

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
#COPY --from=builder /app/.env ./.env
COPY --from=builder /app/ecosystem.config.cjs ./ecosystem.config.cjs

# Copy the standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV DOMAIN="form-builder.monster"

# Start the application using PM2
CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]