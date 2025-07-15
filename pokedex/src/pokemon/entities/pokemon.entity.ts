import { Document } from "mongoose"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
// Hacen referencia a como el elemento almacenara 
// la informacion en la base de datos
@Schema()
//Define el esquema que tendra
export class Pokemon extends Document {

  // id: string <-- Mongo lo define

  @Prop({
    unique: true,
    index: true
  })
  name: string

  @Prop({
    unique: true,
    index: true
  })
  no: number

}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon)
