import { Router } from 'express'
import MusicController from './controllers/MusicController'
import PlaylistController from './controllers/PlaylistController'
import UserController from './controllers/UserController'
import multer from 'multer'
import multerUserConfig from './config/multerUser'
import multerMusicConfig from './config/multerMusic'
import AuthMiddleware from './middlewares/auth'
const routes = Router()

const userController = new UserController()
const playlistController = new PlaylistController()
const musicController = new MusicController()

routes.post('/user/create', userController.createUser)
routes.post('/user/auth', userController.authUser)
routes.get('/user/token', AuthMiddleware, userController.verifyToken)
routes.put('/user/update/image/:id', multer(multerUserConfig).single('file'), userController.updateUserImage)
routes.put('/user/update/data/:id', userController.updateUser)
routes.post('/playlist/create', playlistController.createPlaylist)
routes.post('/playlist/music', playlistController.addMusicToPlaylist)
routes.delete('/playlist/delete/:id', playlistController.deletePlaylist)
routes.get('/playlist/user/:id', playlistController.getPlaylistsById)
routes.post('/music/create', multer(multerMusicConfig).fields([
    { name: 'music', maxCount: 1 },
    { name: 'image', maxCount: 1 }
]), musicController.createMusic)
routes.get('/music/playlist/:id', musicController.getMusicByPlaylist)
routes.get('/music/all', musicController.getAllMusics)
routes.get('/music/search', musicController.searchMusic)
routes.put('/password/token', userController.setRecoverToken)
routes.put('/password/reset', userController.resetPassword)
export default routes