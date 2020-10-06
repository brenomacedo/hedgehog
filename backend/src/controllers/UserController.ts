import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import path from 'path'
import fs from 'fs'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const prisma = new PrismaClient()

class UserController {

    async createUser(req: Request, res: Response) {

        const { name, email, password: unhashedPassword } = req.body

        const verifyUser = await prisma.user.findOne({
            where: {
                email
            }
        })

        if(verifyUser) {
            return res.status(500).json({ msg: 'Email already exists!' })
        }

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

        const token = jwt.sign({ id: user.id }, String(process.env.AUTH), { expiresIn: 86400 })

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
                id: Number(req.body.userId)
            }
        })

        return res.status(200).json({ ...user, password: undefined })
        
    }

    async setRecoverToken(req: Request, res: Response) {

        const { email } = req.body

        const user = await prisma.user.findOne({
            where: {
                email
            }
        })

        if(!user) {
            return res.status(500).json({ msg: 'Email not found!' })
        }

        const data = new Date()
        data.setHours(data.getHours() + 1)

        const resetToken = crypto.randomBytes(8).toString('hex').toLocaleUpperCase()

        const newUser = await prisma.user.update({
            where: {
                email
            },
            data: {
                resetToken,
                expiresIn: Number(data)
            }
        })

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            secure: false,
            port: 587,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        })

        await transporter.sendMail({
            from: '"Hedgehog" <brenomacedo5432@gmail.com>',
            to: email,
            subject: 'Password redefinition - Hedgehog',
            text: `Use this token to recover your password: ${resetToken}`,
            html: `<h1>Use this token to recover your password: ${resetToken}</h1>`
        })

        return res.status(200).json({ ...newUser, password: undefined })

    }

    async resetPassword(req: Request, res: Response) {

        const { email, password: newPassword, token } = req.body

        const user = await prisma.user.findOne({
            where: {
                email
            }
        })

        if(!user) {
            return res.status(500).json({ msg: 'invalid user' })
        }

        if(token !== user?.resetToken) {
            await prisma.user.update({
                data: {
                    expiresIn: null,
                    resetToken: null
                },
                where: {
                    email
                }
            })
            return res.status(500).json({ msg: 'invalid token!' })
        }

        if(!user.expiresIn) {
            return res.status(500).json({ msg: 'token is not set' })
        }

        const test = new Date()
        test.setHours(test.getHours() + 1)

        if(Date.now() > user?.expiresIn) {
            return res.status(500).json({ current: Date.now(), expires: Number(test) })
        }

        const password = await bcrypt.hash(newPassword, 10)

        const newUser = await prisma.user.update({
            where: {
                email
            },
            data: {
                password
            }
        })

        return res.status(200).json({ msg: 'password updated!' })

    }

}

export default UserController