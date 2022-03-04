const express = require('express')
const app = express()
const connectDB = require('./config/db')
const cors = require('cors')
require('dotenv').config()

const { PORT, MONGO_URI } = process.env

connectDB(MONGO_URI)

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/courses', require('./routes/api'))

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
