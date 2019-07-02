const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload')
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.get('/posts',PostController.index);
routes.post('/posts', upload.single('image'),PostController.store);
//essa rota significa dar um like na foto
routes.post('/posts/:id/like',LikeController.store);
//exporta as rotas
module.exports= routes;