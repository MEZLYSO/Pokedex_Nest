# Imagen para almacenar dependencias
FROM node:latest AS deps
# RUN apt install libc6-dev
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn cache clean && yarn install --frozen-lockfile

# Imagen donde se almacena la aplicacion
FROM node:latest AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# En este se copea el build y lo ejecuta
FROM node:latest AS runner
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --prod
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD [ "node","dist/main" ]
