import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class PlaylistController {
    
    async createPlaylist(req: Request, res: Response) {
        const { name, userId } = req.body
        const playlist = await prisma.playlist.create({
            data: {
                name, User: {
                    connect: {
                        id: userId
                    }
                }
            }
        })

        return res.status(201).json(playlist)
    }

    async getPlaylistsById(req: Request, res: Response) {
        const { id } = req.params
        const playlists = await prisma.playlist.findMany({
            where: {
                userId: Number(id)
            }
        })
        return res.status(200).json(playlists)
    }

    async addMusicToPlaylist(req: Request, res: Response) {
        const { playlistId, musicId } = req.body

        const PlaylistToMusic = await prisma.playlistToMusic.create({
            data: {
                Music: {
                    connect: {
                        id: musicId
                    }
                },
                Playlist: {
                    connect: {
                        id: playlistId
                    }
                }
            }
        })

        return res.status(200).json(PlaylistToMusic)
    }

}

export default PlaylistController