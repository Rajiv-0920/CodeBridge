import express from 'express'
import 'dotenv/config'
import path from 'path'
import { connectDB } from './lib/db.js'

const app = express()
const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Hello, from health' })
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')))

  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'))
  })
}

const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server is running on the port: ${PORT}`)
    })
  } catch (error) {
    console.log(`Error starting the server: ${error}`)
  }
}

startServer()
