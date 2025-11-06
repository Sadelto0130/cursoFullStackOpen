import mongoose from 'mongoose'
import { URI_MONGODB } from './utils/config.js'
import { error, info } from './utils/logger.js'

mongoose.connect(URI_MONGODB)
  .then(() => info("Connected to MongoDB"))
  .catch(err => error('Error connecting to MongoDB:', err.message))

export default mongoose.connection