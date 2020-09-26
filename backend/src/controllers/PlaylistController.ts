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
        const playlists = await prisma.playlist.findOne({
            where: {
                id: Number(id)
            }
        })
        return res.status(200).json(playlists)
    }


}

export default PlaylistController