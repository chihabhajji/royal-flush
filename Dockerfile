FROM node:16.17.1-alpine3.15 as BASE

RUN apk update && apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@8.6.1 --activate 

WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile -P
RUN pnpm add -d nx
CMD ["pnpx", "nx", "run", "royal-flush-frontend:serve:production"]