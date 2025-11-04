import mongoose from 'mongoose'

const phoneBookSchema = new mongoose.Schema({
  name: String, 
  number: String
},{
  timestamps: true
})

phoneBookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
export const Phonebook = mongoose.model('Phonebook', phoneBookSchema)