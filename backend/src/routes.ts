import { Router } from 'express'
import MusicController from './controllers/MusicController'
import PlaylistController from './controllers/PlaylistController'
import UserController from './controllers/UserController'
const routes = Router()

const userController = new UserController()
const playlistController = new PlaylistController()
const musicController = new MusicController()

routes.post('/user/create', userController.createUser)
routes.post('/user/auth', userController.authUser)
routes.post('/playlist/create', playlistController.createPlaylist)
routes.get('/playlist/user/:id', playlistController.getPlaylistsById)
routes.post('/music/create', musicController.createMusic)
routes.get('/music/playlist/:id', musicController.getMusicByPlaylist)

export default routes