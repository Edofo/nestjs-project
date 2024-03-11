FROM node:21-alpine3.18

WORKDIR /app

COPY package.json /app
COPY pnpm-lock.yaml /app

RUN npm i -g pnpm

RUN pnpm install --frozen-lockfile

COPY . .

RUN npx prisma generate && pnpm build

CMD ["pnpm", "start:dev"]