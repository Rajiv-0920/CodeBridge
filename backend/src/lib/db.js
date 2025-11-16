import mongoose from 'mongoose'
import 'dotenv/config'

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error(`Mongo URI is not defined in environment variable`)
    }
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Mongodb Connected')
  } catch (error) {
    console.log('Error to connect mongodb ', error)
    process.exit(1)
  }
}
