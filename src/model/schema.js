const mongoose = require("mongoose");

const Schema = new mongoose.Schema ({
    titulo: String,
    imagem: String,
    conteudo: String

})

const model = mongoose.model("newsportal", Schema);
module.exports = model;