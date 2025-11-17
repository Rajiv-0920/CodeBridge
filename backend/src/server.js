import express from 'express'
import 'dotenv/config'
import path from 'path'
import cors from 'cors'
import { serve } from 'inngest/express'
import { connectDB } from './lib/db.js'
import { functions, inngest } from './lib/inngest.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))

app.use('/api/inngest', serve({ client: inngest, functions }))

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
