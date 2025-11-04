import mongoose from 'mongoose'
import 'dotenv/config' 

mongoose.set('strictQuery', false)

const url = process.env.URI_MONGODB

mongoose.connect(url)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error('Error connecting to MongoDB:', err.message))

export default mongoose.connection