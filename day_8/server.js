/* eslint-env node */
/* global process */
// Simple Express server for development
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

// Load environment variables from .env file
dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()
app.use(cors({ origin: true }))
app.use(express.json())

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
