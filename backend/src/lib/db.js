// lib/db.js
import mongoose from 'mongoose'

// Optional: Caching the connection object in the global scope to prevent
// hot-reloading issues in development, though not strictly required for production.
const connection = {}

export const connectDB = async () => {
  if (connection.isConnected) {
    console.log('Using existing database connection')
    return
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI)
    connection.isConnected = db.connections[0].readyState
    console.log('Database connected successfully')
  } catch (error) {
    console.error(`Database connection error: ${error}`)
    process.exit(1) // Exit process if initial connection fails
  }
}
