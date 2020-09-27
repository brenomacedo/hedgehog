import multer, { Options } from 'multer'
import crypto from 'crypto'
import path from 'path'

const multerConfig: Options = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'uploads', 'userimages'))
        },
        filename: (req, file, cb) => {
            const hash = crypto.randomBytes(16).toString('hex')
            const filename = file.originalname
            const newFilename = `${hash}-${filename}`
            
            req.body.filename = newFilename
            
            cb(null, newFilename)
        }
    }),
    dest: path.resolve(__dirname, '..', '..', 'uploads', 'userimages'),
    fileFilter: (req, file, cb) => {

        const allowedMimetyes = [
            'image/jpg',
            'image/jpeg',
            'image/png'
        ]

        if(allowedMimetyes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error(`invalid file type! ${file.mimetype}`))
        }
    },
    limits: {
        fileSize: 1024*1024*2
    }
}

export default multerConfig