const express = require('express')
const routes = express.Router()
const multer = require('multer')
const multerConfig = require('./config/multer')

const Box = require('./controllers/BoxController')
const File = require('./controllers/FileController')

routes.post('/boxes', Box.store)
routes.get('/boxes/:id', Box.show)
routes.post('/boxes/:id/files', multer(multerConfig).single('file'), File.store)

module.exports = routes