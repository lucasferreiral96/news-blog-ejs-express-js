const express = require("express");
const app = express();
const api = require("./src/routes/api");
const methods = require("./src/model/methods");
const schema = require("./src/model/schema")
const mongoose = require("mongoose");
const axios = require("axios");

// const newsRouter = require("./src/routes/news");

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/css', express.static(__dirname + '/src/public/css'));
app.use('/model', express.static(__dirname+('/src/model')))

app.set('views', __dirname+'/src/views');
app.set('view engine', 'ejs');



app.get("/", (req, res) => {
    res.render("index");
    
})


app.get("/noticias", async (req, res) => {

    try {
        const newsApi = await axios.get(`http://localhost:3000/api`);
        res.render('posts', {articles: newsApi.data});

    } catch (error) {
        if(error.response){
            res.render('posts', {articles: null});
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.header);
        }else if(error.request){
            res.render('posts', {articles: null});
            console.log(error.request)
        }else{
            console.log(error.message);
            res.render('posts', {articles: null});
        }
    }
});

app.get("/api", async (req, res) => {
    const dados = await methods.getData();

    dados.map((resultados) => resultados.toJSON()).forEach(element => {
        console.log(element);
    });
    res.send(dados);
})

app.post("/postar",  (req, res) => {
    const bodydata = req.body;
    const newdata = new schema(bodydata);

    console.log(newdata);

    newdata.save().then((sucesso) => {
        if(sucesso){
            
            res.status(200).json({sucesso:"Dados cadastrados com sucesso"});
        }else{
            res.status(500).json({msg: "Erro ao cadastrar: "+error.message})
        }
    })

})

app.get("/newpost", (req, res) => {
    res.render("newpost");
})


mongoose.connect('mongodb://localhost:27017/newsportal').then((sucesso) => {
    if(sucesso){
        console.log("Conectado ao MongoDB");
    }

    app.listen(3000, () => {
        console.log("Servidor Online");
    })

}).catch((erro) => {
    console.log("Erro ao conectar ao MongoDB: "+erro.message);
})