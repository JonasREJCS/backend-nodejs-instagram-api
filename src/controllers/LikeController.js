const Post = require('../models/Post');

module.exports ={
    //route para salvar os likes
    async store(req,res){
        //busca o post por ID
        const post = await Post.findById(req.params.id);
        //incrementa o numero de likes
        post.likes +=1;
        //salva o post com o numero de likes atualizado
        await post.save();

        req.io.emit('like <3 <3 <3',post);
        return res.json(post);
        
    }
};