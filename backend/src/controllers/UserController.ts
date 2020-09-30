import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { key } from '../secret.json'
import { PrismaClient } from '@prisma/client'
import path from 'path'
import fs from 'fs'

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

        const currentuser = await prisma.user.findOne({
            where: {
                id: Number(id)
            }
        })

        if(!currentuser) {
            return res.status(500).json({ message: 'unknown user' })
        }

        const oldAvatar = currentuser.avatar
        
        if(oldAvatar !== 'default.png') {
            fs.unlinkSync(path.resolve(__dirname, '..', '..', 'uploads', 'userimages', oldAvatar))
        }

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

    async updateUser(req: Request, res: Response) {

        const { id } = req.params
        const { name, newPassword, currentPassword } = req.body

        const user = await prisma.user.findOne({
            where: {
                id: Number(id)
            }
        })

        if(!user) {
            return res.status(500).json({ error: 'undefined user!' })
        }

        if(!await bcrypt.compare(currentPassword, user.password)) {
            return res.status(500).json({ error: 'incorrect password!' })
        }

        const password = await bcrypt.hash(newPassword, 10)

        const updatedUser = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                name, password
            }
        })

        return res.status(200).json({ ...updatedUser, password: undefined })

    }

    async verifyToken(req: Request, res: Response) {

        const user = await prisma.user.findOne({
            where: {
                id: req.body.userId
            }
        })

        return res.status(200).json({ ...user, password: undefined })
        
    }

}

export default UserController