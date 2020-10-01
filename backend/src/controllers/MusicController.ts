import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient

class MusicController {
    
    async createMusic(req: Request, res: Response) {

        const { name, author, music: url, image: avatar } = req.body

        const music = await prisma.music.create({
            data: {
                name, author, avatar, url
            }
        })

        return res.status(201).json(music)

    }

    async getMusicByPlaylist(req: Request, res: Response) {

        const { id } = req.params

        const data = await prisma.playlist.findOne({
            where: {
                id: Number(id)
            },
            include: {
                PlaylistToMusic: {
                    include: {
                        Music: true
                    }
                }
            }
        })

        return res.status(201).json(data)
    }

}

export default MusicController