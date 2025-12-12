/* eslint-env node */
/* global process */
// Minimal Google Sign-In token verification server (ESM)
import express from 'express'
import cors from 'cors'
import { OAuth2Client } from 'google-auth-library'

const PORT = process.env.PORT || 3000
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID

if (!CLIENT_ID) {
  console.warn('Warning: GOOGLE_CLIENT_ID is not set. Set it in .env')
}

const client = new OAuth2Client(CLIENT_ID)
const app = express()
app.use(cors({ origin: true }))
app.use(express.json())

// Token-based sign-in (Google Identity Services ID token)
app.post('/tokensignin', async (req, res) => {
  const idToken = req.body.id_token
  if (!idToken) {
    return res.status(400).json({ error: 'Missing id_token' })
  }
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: CLIENT_ID,
    })
    const payload = ticket.getPayload()
    res.json({
      ok: true,
      user: {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        email_verified: payload.email_verified,
      },
    })
  } catch (err) {
    console.error('verifyIdToken error:', err)
    res.status(401).json({ error: 'Invalid ID token' })
  }
})

app.listen(PORT, () => {
  console.log(`Auth server listening on ${PORT}`)
})
