const express = require("express");
//Preciso do express para criar o servidor, é um módulo que já vem com algumas funções necessárias

const app = express();
//Cria uma aplicação express. A função express() é uma função exportada pelo módulo express 

const port = 8000;
//Porta padrão 8080, não funcionou aqui

app.use(express.json());

app.get("/", function(req, res) {
    res.send("Minha primeira requisição");
});
//Primeiro parâmetro é a rota (/); segundo parâmetro a função
//Req - requisição (request) e res - resposta (response)
//Digitar no navegador http://localhost:8000/

app.get("/segunda-req", function(req, res) {
    res.send("Minha segunda requisição");
});
//Digitar no navegador http://localhost:8000/segunda-req
//GET: obter algo

app.get("/com-parametros", function(req, res){
    if (req.query.nome === 'Duda') {
        res.send("Duda chamou requisição");
    }
    res.send("Com parâmetros funciona! Sabadou " + req.query.nome);
});
//Não executa os dois blocos por que o send apenas pode ser executado uma vez em cada rota

//http://localhost:8000/com-parametros/
//No Postman: http://localhost:8000/com-parametros/?nome=Duda (lá é possível inserir os parâmetros e valores e ele monta a rota)

app.post("/meu-primeiro-post", function (req, res) {
    console.log(req.body);
    res.send("Meu post funciona!");
});
//POST: criar algo
//O req.body imprime no terminal o dado do body do servidor

app.put("/meu-primeiro-put/:id", function (req, res){
    console.log(req.body, req.params.id);
    res.send("Meu put funciona");
});
//PUT: alterar algo
//parâmetro id pensando na base de dados com milhares de dados, é
//Dois tipos de parametros para requisição - para GET costuma usar o query; e quando precisa usar um identificador ou algo assim, usa dessa maneira
//O req.params.id imprime no terminal o parâmetro passado no servidor

app.delete("/meu-primeiro-delete/:id", function (req, res){
    console.log(req.params.id);
    res.send("Meu delete funciona " + req.params.id);
});

app.listen(port, function() {
    console.log("Ouvindo a porta", port);
});
//npm run start