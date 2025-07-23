import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommonModule } from './common/common.module';
import { EnvConfiguration } from './config/env.config';
import { PokemonModule } from './pokemon/pokemon.module';
import { SeedModule } from './seed/seed.module';
import { JoiValidationSchema } from './config/joi.validation';



@Module({
  imports: [
    //Configuracion para las variable de entorno
    //Esta configuracion debe ir primero para que 
    //se cargue desde el inicio
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      // Uso de joi para manejo de errores con las 
      // variables de entorno
      validationSchema: JoiValidationSchema
    }),

    // Servidor estatico
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),

    //Referencia a base de datos 
    // Este se pausa esperando que la base de datos se cargue 
    // o resuelva
    MongooseModule.forRoot(process.env.MONGODB!),

    PokemonModule,

    CommonModule,

    SeedModule
  ],
})
export class AppModule { }
