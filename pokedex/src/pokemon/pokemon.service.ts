import { BadRequestException, HttpCode, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) { }

  // Puedo definir el codigo de status
  @HttpCode(HttpStatus.CREATED)
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase()

    try {
      // Creando elemento en la base de datos de Mongo 
      const pokemon = await this.pokemonModel.create(createPokemonDto)

      return pokemon
    } catch (err) {
      if (err.code === 11000) {

        console.log(err)
        throw new BadRequestException(`Pokemon exist in db ${JSON.stringify(err.keyValue)}`)
      } else {
        throw new InternalServerErrorException('Cant create Pokemon - Check server Logs')
      }
    }

  }

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
