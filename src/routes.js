import express from 'express'
import Controller from './controllers.js'

const controller = new Controller()

const routes = express.Router()

routes.get('/api/:yearMonth', controller.data)
routes.post('/api', controller.create)

export default routes