const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path')
const fs = require('fs')

module.exports ={
    async index(req,res){
        //manda buscar na base de dados os registros mais recentes 
        const posts = await Post.find().sort('-createdAt');

        return res.json(posts);
    },
    //route para salvar dados
    async store(req,res){
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;
        const [name, ext] = image.split('.');
        const fileName = `${name}.jpg`
        //redimensionando a imagem
        //usa o await porque é assincrono
        await sharp(req.file.path)
            .resize(500)
            .jpeg({quality: 70})
            .toFile(
                path.resolve(req.file.destination,'resized',fileName)
            )
        
        //apaga a foto original
        fs.unlinkSync(req.file.path);

        //criando o post para salvar a imagem no banco de dados
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName
        })

        req.io.emit('post realiado',post);
        return res.json(post);
        
    }
};