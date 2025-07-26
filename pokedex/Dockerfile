# # Definimos la imagen a utilizar para 
# # levantar el servicio
# FROM node:18-alpine3.15 
#
# # Creamos directorio
# RUN mkdir -p /var/www/pokedex
# # Definimos el directorio de trabajo
# WORKDIR /var/www/pokedex
#
# #Copiamos del origen al destino de los 
# #archivos
# COPY . ./var/www/pokedex/
# COPY package.json tsconfig.json tsconfig.build.json /var/www/pokedex/
#
# #Dar permisos para ejecutar la aplicacion
# RUN adduser --disabled-password pokeuser
# RUN chwn -R pokeuser:pokeuser /var/www/pokedex
# USER pokeuser
#
# # Limpieza de cache
# RUN yarn cache clean --force
#
# EXPOSE 3000
#
# CMD [ "yarn","start" ]


# Imagen para almacenar dependencias
FROM node:18-alpine3.15 AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Imagen donde se almacena la aplicacion
FROM node:18-alpine3.15 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# En este se copea el build y lo ejecuta 
FROM node:18-alpine3.15 AS runner
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --prod 
COPY --from=builder /app/dist ./dist

# EXPOSE 3000

CMD [ "node","dist/main" ]

