const path = require('path');
const cors = require('cors');
const express = require('express');
//utilizado para acessar o banco de dados do mongodb atlas
const mongoose = require('mongoose');
//cria um servidor para ser acessado pelo navegador
const app = express();

const server = require('http').Server(app);
//permite receber requisicoes e enviar requisicoes para todos os usuarios conectados na aplicação
const io = require('socket.io')(server);
//conecta no banco
mongoose.connect('mongodb+srv://root:root@cluster0-wm4mg.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
});
app.use((req,res)=>{
    req.io = io;
    next();
})
//permite que qualquer aplicação use este backend
app.use(cors());

app.use('/files',express.static(path.resolve(__dirname,'..','uploads','resized')));

app.use(require('./routes'));

//informa qq porta que será utilizada
server.listen(4444);

