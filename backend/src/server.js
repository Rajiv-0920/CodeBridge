import express from 'express'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Hello, from root')
})

app.listen(PORT, () => {
  console.log(`Server is running on the port: ${PORT}`)
})
