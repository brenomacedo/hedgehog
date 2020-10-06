import { Request, Response, NextFunction } from 'express'
import jwt, { DecodeOptions } from 'jsonwebtoken'

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization
    if(!header) {
        return res.status(500).json({ error: "Token not provided!" })
    }

    const headerStringArray = header.split(' ')

    if(headerStringArray.length !== 2) {
        return res.status(500).json({ error: "Invalid token format!" })
    }

    if(headerStringArray[0] !== 'Bearer') {
        return res.status(500).json({ error: "Invalid token format!" })
    }

    jwt.verify(headerStringArray[1], String(process.env.AUTH), (err, decoded: any) => {
        if(err) {
            return res.status(500).json({ error: "Invalid token!" })
        }

        req.body.userId = decoded.id
    })

    next()
}

export default AuthMiddleware