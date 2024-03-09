const express = require("express");
const apiRouter = express.Router();
const methods = require("../model/methods");


apiRouter.get("", async (req, res) => {
    const dados = await methods.getData();

    dados.map((resultados) => resultados.toJSON()).forEach(element => {
        console.log(element);
    });

    console.log(dados);
    res.send(dados);
})

module.exports = apiRouter;