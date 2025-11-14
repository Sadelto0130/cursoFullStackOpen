import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  favoriteGenre: {
    type: String
  }
})

export default model('User', userSchema)