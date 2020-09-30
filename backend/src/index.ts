import cors from 'cors'
import express from 'express'
import routes from './routes'
import path from 'path'

const server = express()

server.use(cors())
server.use(express.static(path.resolve(__dirname, '..', 'uploads')))
server.use(express.json())
server.use(routes)

server.listen(3333)