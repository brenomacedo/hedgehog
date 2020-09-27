import multer, { Options } from 'multer'
import crypto from 'crypto'
import path from 'path'

const multerConfig: Options = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            file.fieldname === 'music' ?
            cb(null, path.resolve(__dirname, '..', '..', 'uploads', 'music')) :
            cb(null, path.resolve(__dirname, '..', '..', 'uploads', 'musicimages'))
        },
        filename: (req, file, cb) => {
            const hash = crypto.randomBytes(16).toString('hex')
            const filename = file.originalname
            const newFilename = `${hash}-${filename}`
            
            if(file.fieldname === 'music') {
                req.body.music = newFilename
            } else {
                req.body.image = newFilename
            }
            
            cb(null, newFilename)
        }
    }),
    fileFilter: (req, file, cb) => {
        const allowedTypes = file.fieldname === 'music' ? [
            'audio/mpeg'
        ] : [
            'image/jpg',
            'image/png',
            'image/jpeg'
        ]

        const maxSize = file.fieldname === 'music' ? 1024*1024*8 : 1024*1024*2

        if(!allowedTypes.includes(file.mimetype)) {
            return cb(new Error(`invalid ${file.fieldname} file type`))
        }

        if(file.size > maxSize) {
            return cb(new Error(`${file.fieldname} file exceeds the limit of size`))
        }
        
        return cb(null, true)

    }
}

export default multerConfig