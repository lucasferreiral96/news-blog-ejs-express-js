const express = require("express");
const app = express();


app.get("/", (req, res) => {
    res.send("<h1>Inicio do projeto \"Blog de notícias usando EJS e Express JS\"");

})


app.listen(8080, () => {
    console.log("Servidor Online");
})