// instalando programas
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const res = require("express/lib/response");

// configurando o roteamento para teste no postman
const app = express();
app.use((bodyParser.urlencoded({extend: true})));
app.use(bodyParser.json());
const port = 3000;

//configurando o acesso ao mongodb
mongoose.connect('mongodb://127.0.0.1:27017/reveac2mia',
{
    useNewUrlParser : true,
    useUnifiedTopology: true,
    // serverSelectionTimoutMS: 20000
})

//criando a model do seu projeto
const PessoaSchema = new mongoose.Schema({
    nome : {type : String},
    email : {type: String, required: true},
    endereco : { type : String},
    numero : {type: Number},
    cep : {type : String, required: true},
    nasicmento : {type : Date, required: true}
})


const Pessoa = new mongoose.model("PEssoa",PessoaSchema);

//configurando os roteamentos
app.post("/cadastropessoa",async(req, res) => {
    const nome = req.body.nome
    const email = req.body.email
    const endereco = req.body.endereco
    const numero = req.body.numero
    const cep = req.body.cep
    const nascimento = req.body.nascimento

    const Pessoa = new Pessoa({
        nome : "Nibaum",
        email : "nibaum@gmail.com",
        endereco: "Rua Nibaum 123",
        numero : 12345-1234,
        cep : "12345-060",
        nasicmento : "03/02/07"
    })

    try{
        const newPessoa = await Pessoa.save()
        res.json({error : null, msg: "Cadastro ok", pessoaId : newPessoa_id});
    } catch(error){
        res.status(400).json({error})
    }
});

app.get("/", async(req,res)=>{
    res.sendFile(__dirname +"/index.html")
})

//configurando a porta
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)})
    