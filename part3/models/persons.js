import mongoose from 'mongoose'

const numberValidators = [
  {
    // Minimum length validator
    validator: (number) => {
      if ((number[2] === "-" || number[3] === "-") && number.length < 8) {
        return false;
      }
      return true;
    },
    msg: "must be at least 8 digits",
  }
];

const phoneBookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 4,
    required: true
  }, 
  number: {
    type: String,
    minLength: 8,
    validate: numberValidators,
    required: true
  }
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