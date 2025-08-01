# Pokedex_Nest

# Deplayment

<div style="display:flex">

![Railway Badge](https://img.shields.io/badge/Railway-0B0D0E?logo=railway&logoColor=fff&style=for-the-badge)(https://pokedexnest-production-fbc0.up.railway.app/)

</div>

# TeckStack

<div style="display:flex">


![NestJS Badge](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=fff&style=for-the-badge)
![TypeScript Badge](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge)
![Yarn Badge](https://img.shields.io/badge/Yarn-2C8EBB?logo=yarn&logoColor=fff&style=for-the-badge)
![Docker Badge](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff&style=for-the-badge)

</div>

# Description

Desarrollo de una API REST con conexion a una base de datos en MongoDB para realizar
operaciones CRUD, similar a la PokeAPi empleando DTO's, POO,...

# Instructions

1. Clone the proyect
2. Exec
```
yarn install
```
3. I need Nest CLI
```
npm i -g @nestjs/cli
```

4. Up Database
```
docker compose -up -d
```
5. Clone the file __.env.template__ y renombrar a __.env__

6. Fill in enviroment to ```.env```

7. Execute proyect with DEV 
```
yarn add start:dev
```

8. Populate Database
Request to 
```
localhost:3000/api/v2/seed
```
# Production build
1. Create file ```.env.prod```
2. Create environment variables
3. Make the image proyect 
```
docker compose -f docker-compose.prod.yaml --env-file .env.prod up -d --build
```
