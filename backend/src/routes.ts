import { Router } from 'express'
import MusicController from './controllers/MusicController'
import PlaylistController from './controllers/PlaylistController'
import UserController from './controllers/UserController'
import multer from 'multer'
import multerUserConfig from './config/multerUser'
import multerMusicConfig from './config/multerMusic'
const routes = Router()

const userController = new UserController()
const playlistController = new PlaylistController()
const musicController = new MusicController()

routes.post('/user/create', userController.createUser)
routes.post('/user/auth', userController.authUser)
routes.put('/user/update/image/:id', multer(multerUserConfig).single('file'), userController.updateUserImage)
routes.put('/user/update/data/:id', userController.updateUser)
routes.post('/playlist/create', playlistController.createPlaylist)
routes.get('/playlist/user/:id', playlistController.getPlaylistsById)
routes.post('/music/create', multer(multerMusicConfig).fields([
    { name: 'music', maxCount: 1 },
    { name: 'image', maxCount: 1 }
]), musicController.createMusic)
routes.get('/music/playlist/:id', musicController.getMusicByPlaylist)
export default routes