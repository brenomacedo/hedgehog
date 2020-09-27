import multer, { Options } from 'multer'
import crypto from 'crypto'
import path from 'path'

const multerConfig = (destination: 'user' | 'music') => {

    const config: Options = {
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path.resolve(__dirname, '..', '..', 'uploads', destination))
            },
            filename: (req, file, cb) => {
                const hash = crypto.randomBytes(16).toString('hex')
                const filename = file.originalname
                const newFilename = `${hash}-${filename}`
                req.body.filename = newFilename
                cb(null, newFilename)
            }
        }),
        dest: path.resolve(__dirname, '..', '..', 'uploads', destination),
        fileFilter: (req, file, cb) => {

            const allowedMimetyes = destination === 'user' ? [
                'image/jpg',
                'image/jpeg',
                'image/png'
            ] : [
                'audio/mp3'
            ]
    
            if(allowedMimetyes.includes(file.mimetype)) {
                cb(null, true)
            } else {
                cb(new Error('Invalid file type!'))
            }
        },
        limits: {
            fileSize: 1024*1024*2
        }
    }

    return config

}

export default multerConfig