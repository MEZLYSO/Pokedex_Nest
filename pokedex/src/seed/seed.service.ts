import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interface/poke-response.interface';

@Injectable()
export class SeedService {

  // Crear instacnia de Axios 
  // Forma erronea debido a que es una dependencia
  // Correcion con inyeccion de dependencias 
  private readonly axios: AxiosInstance = axios

  async executedSeed() {

    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')

    // Filtro de numero de pokemon donde filtramos el url
    data.results.forEach(({ name, url }) => {
      const segments = url.split('/')
      const no: number = +segments[segments.length - 2]
    })

    return data.results
  }

}
