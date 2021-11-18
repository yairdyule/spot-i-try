import express from 'express'
import spotify from './spotify'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use('/', spotify)

// app.get('/', (_, res) => {
//   res.send('helloooo world ;D')
// })

app.listen(process.env.PORT || 3000, () => {
  console.log(`express listening on http://localhost:3000/`)
})
