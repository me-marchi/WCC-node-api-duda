const express = require("express");
//Preciso do express

const app = express();
//Cria uma aplicação express. A função express() é uma função exportada pelo módulo express 

const port = 8000;
//Porta padrão é 8080, porém esta não funcionou na minha máquina, tendo que usar a 8000

app.get("/", function(req, res) {
    res.send("Minha primeira requisição");
});
//Primeiro parâmetro é a rota (/); segundo parâmetro a função
//Digitar no navegador http://localhost:8000/

app.get("/segunda-req", function(req, res) {
    res.send("Minha segunda requisição");
});
//Digitar no navegador http://localhost:8000/segunda-req

app.get("/com-parametros", function(req,res){
    res.send("Com parâmetros funciona! Sabadou " + req.query.nome);
});
//http://localhost:8000/com-parametros/

app.listen(port, function() {
    console.log("Ouvindo a porta", port);
});
//npm run start

