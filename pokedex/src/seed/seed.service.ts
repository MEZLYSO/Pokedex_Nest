import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interface/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) { }

  // Crear instacnia de Axios 
  // Forma erronea debido a que es una dependencia
  // Correcion con inyeccion de dependencias 

  async executedSeed() {

    await this.pokemonModel.deleteMany()

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

    // Insercion con Many para poder almacenar muchos elementos de manera optima
    const pokemonToInsert: { name: string, no: number }[] = []

    // Filtro de numero de pokemon donde filtramos el url
    data.results.forEach(({ name, url }) => {
      const segments = url.split('/')
      const no = +segments[segments.length - 2]
      // const pokemon = this.pokemonModel.create({ name, no })
      pokemonToInsert.push({ name, no })
    })
    await this.pokemonModel.insertMany(pokemonToInsert)
    return { message: "Sucess" }
  }

}
