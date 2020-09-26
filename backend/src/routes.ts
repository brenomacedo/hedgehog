import { Router } from 'express'
import PlaylistController from './controllers/PlaylistController'
import UserController from './controllers/UserController'
const routes = Router()

const userController = new UserController()
const playlistController = new PlaylistController()

routes.post('/user/create', userController.createUser)
routes.post('/user/auth', userController.authUser)
routes.post('/playlist/create', playlistController.createPlaylist)
routes.get('/playlist/user/:id', playlistController.getPlaylistsById)

export default routes