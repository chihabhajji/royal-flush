FROM nx-app-base AS builder

ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/builder
COPY . .
RUN pnpx nx build royal-flush-frontend ${BUILD_FLAG}

FROM nginx:1.19.2

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/builder/dist/apps/royal-flush-frontend ./
COPY --from=builder /app/builder/apps/royal-flush-frontend/nginx.conf /etc/nginx/nginx.conf