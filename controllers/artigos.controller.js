// regras de negócio do sistema de artigos.
const { request, response } = require("express");
const database = require("../models"); 
//Quando se tem um arquivo chamado index.js, você não precisa colocar o nome dele ao chamá-lo em outro arquivo, pois já é padrão do js
const tabelaArtigos = database.artigos;

//Cria um novo artigo
exports.create = (req, res) => {
    const artigo = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        publicado: req.body.publicado
    };

    tabelaArtigos.create(artigo)
    .then(() => res.send("Artigo criado com sucesso"))
    .catch((error) => {
        console.log(error);        
        res.status(500).send("Ocorreu um erro ao tentar salvar o arquivo");
    })
};

//Promise: algo que é esperado, mas que pode ou não acontecer. A promessa pode ser resolvida ou rejeitada
//Aqui temos a promessa de que artigos serão criados para que o código seja executado
//Síncrona e assíncrona (algo que pode demorar um tempo indefinido para ocorrer, sendo dependente de outros fatores que determinam esse tempo)
//Then: o create cria o artigo, aí então (then) dá a mensagem
//Catch: caso não tenha criado o artigo, dá o erro de número 500 e a mensagem dizendo que deu erro

exports.findAll = (req, res) => {
    tabelaArtigos.findAll()
    .then(function (data) { 
        res.send(data);
    })
    .catch(function () {
        res.status(500).send("Ocorreu um erro obtendo os artigos");
    });
};

//findAll e create são propriedades de um objeto
//podem ter qualquer nome, assim como uma variável
//eles estão listados no arquivo artigos.routes, através do get e post e exportados para os outros arquivos para serem utilizados através do exports
