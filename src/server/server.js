require('dotenv').config({ path: 'src/server/.env' })
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000 // Default to 3000 if PORT isn't set in .env

app.post('/api/message', (req, res) => {
  const { text } = req.body

  res.json({
    response: `Received: ${text}`,
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
