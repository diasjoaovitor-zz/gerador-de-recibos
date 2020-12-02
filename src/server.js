import express from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'

import routes from './routes.js'

const APP_PORT = process.env.PORT || 3001

const app = express()

dotenv.config()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join('client/build')))
app.use(routes)
app.listen(APP_PORT, () => console.log('> Server is running...'))