FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginxinc/nginx-unprivileged:stable-alpine

USER root

RUN apk update && \
    apk upgrade --no-cache

COPY --from=build /app/dist /usr/share/nginx/html

RUN chown -R 101:101 /usr/share/nginx/html

USER 101

EXPOSE 8080

CMD ["nginx","-g","daemon off;"]
