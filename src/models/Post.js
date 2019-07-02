const mongoose = require('mongoose');

//Diz quais colunas estarão disponiveis na tabela do banco
const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
        type: Number,
        default: 0,
    }
},{
    //armazena as alterações de registros
    timestamps: true,
});

module.exports = mongoose.model('Post',PostSchema);