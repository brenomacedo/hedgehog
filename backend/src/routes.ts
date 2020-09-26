import { Router } from 'express'
import UserController from './controllers/UserController'
const routes = Router()

const userController = new UserController()

routes.post('/user/create', userController.createUser)

export default routes