FROM node:16.16.0 AS builder

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci --omit=dev

COPY . .
RUN npm run build

FROM nginx:1.23.0-alpine AS server
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]