import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { key } from '../secret.json'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class UserController {

    async createUser(req: Request, res: Response) {

        const { name, email, password: unhashedPassword } = req.body

        const password = await bcrypt.hash(unhashedPassword, 10)

        const user = await prisma.user.create({
            data: {
                name, email, password
            }
        })

        return res.status(201).json({ ...user, password: undefined })
    }

    async authUser(req: Request, res: Response) {
        
        const { email, password } = req.body

        const user = await prisma.user.findOne({
            where: {
                email
            }
        })

        if(!user) {
            return res.status(500).json({ error: "Email or password incorrects!" })
        }

        if(!await bcrypt.compare(password, user.password)) {
            return res.status(500).json({ error: "Email or password incorrects!" })
        }

        const token = jwt.sign({ id: user.id }, key, { expiresIn: 86400 })

        return res.status(200).json({ user: {...user, password: undefined }, token })
    }

    async updateUserImage(req: Request, res: Response) {
    
        const { id } = req.params
        
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                avatar: req.body.filename
            }
        })

        return res.status(200).json({ ...user, password: undefined })

    }

}

export default UserController