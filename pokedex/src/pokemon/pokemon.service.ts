import { BadRequestException, HttpCode, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) { }

  // Puedo definir el codigo de status
  // @HttpCode(HttpStatus.CREATED)
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase()
    try {
      // Creando elemento en la base de datos de Mongo 
      const pokemon = await this.pokemonModel.create(createPokemonDto)
      return pokemon
    } catch (err) {
      this.handleException(err)
    }

  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {

    let pokemon: Pokemon | null = null

    // Validacion si el id es numero y se busca por numero
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term })
    }

    //Validacion de MongoID y verifica por MongoID si existe el 
    //elemento dentro de la base
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term)
    }

    //Validacion por nombre busca en la base la existencia del nombre del pokemon 
    //y retorna el elemento
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() })
    }

    if (!pokemon) throw new NotFoundException(`Pokemon with id, name or no ${term} is not found`)
    return pokemon
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(term)

    try {
      if (updatePokemonDto.name) {
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase()
        await pokemon.updateOne(updatePokemonDto)
        return { ...pokemon.toJSON(), ...updatePokemonDto }
      }
    } catch (err) {
      this.handleException(err)
    }
  }

  async remove(id: string) {
    //Version 1
    // const pokemon = await this.findOne(id)
    // await pokemon.deleteOne()

    //Version 2
    // const res = await this.pokemonModel.findByIdAndDelete(id)
    //
    // Version 3 - Final
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id })
    if (deletedCount === 0)
      throw new BadRequestException(`Pokemon with id ${id}, not found`)
    return
  }

  private handleException(error: any) {
    if (error.code === 11000)
      throw new InternalServerErrorException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`)
    throw new InternalServerErrorException('Check logs')

  }
}
