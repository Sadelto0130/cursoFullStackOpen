import 'dotenv/config'
import mongoose from 'mongoose'

mongoose.set('strictQuery', false)
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connecting to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

export default mongoose.connection