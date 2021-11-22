// regras de negócio do sistema de artigos.
const express = require("express");
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

exports.findByPk = (req, res) => {
    tabelaArtigos.findByPk(req.query.id)
    .then(function (user) {
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({message: "Não foi possível encontrar um usuário com o id=" + req.query.id
            });
        }
    }).catch(function () {
        res.status(500).send({
            message: "Erro obtendo usuário id=" + req.query.id
        });
    });
};

exports.findOne = (req, res) => {
    tabelaArtigos.findOne({where: {titulo: req.query.titulo}})
    .then(function (user) {
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({message: "Não foi possível encontrar um usuário."
            });
        }
    }).catch(function (error) {
        console.log(error)
        res.status(500).send({
            message: "Erro obtendo usuário"
        });
    });
};


exports.findAllPublished = (req, res) => {
    tabelaArtigos.findAll({where: {publicado: true}})
    .then (data => {
        res.send(data);
    }).catch (error => {
        res.status(500).send({ 
            message: "Não foi possível encontrar os artigos publicados"
        });
    });
};


exports.update = (req, res) => {
    const {body: updates} = req;
    const {id: idArtigo} = req.params;
    const query = { where: {id: idArtigo}, returning: true};
    //quando returning: true, o sequelize nos retorna uma lista com duas coisas:
    //- a quantidade de itens atualizados
    //- a lista dos itens atualizados

    tabelaArtigos
    .update(updates, query)
    .then (data => {
        const linhasAtualizadas = data[0];
        const artigosAtualizados = data[1];

        if(linhasAtualizadas == 0){
            res.status(404).send("Não foi encontrado nenhum registo com o id " + idArtigo);
        } else {
            res.send(artigosAtualizados);
        };
    }).catch (error => {
        console.log(error);
        res.status(500).send({ 
            message:"Não foi possível atualizar seu artigo"});
    });
};

exports.updateMany = (req, res) => {
    const {body: updates} = req;
    // const {descricao: descricaoArtigo} = req.params;
    const query = { returning: true, where: {descricao: "artigos realizado para a formação" }, 
};

    tabelaArtigos
    .update(updates, query)
    .then (data => {
        console.log(data);

        const linhasAtualizadas = data[0];
        if(linhasAtualizadas == 0){
            res.status(404).send("Não foi encontrado nenhum registo com a descrição ");
        } else {
            const artigosAtualizados = data[1];
            res.send(artigosAtualizados);
        };
    }).catch (error => {
        console.log(error);
        res.status(500).send("Não foi possível atualizar os artigos");
    });
};

exports.delete = (req, res) => {
    const {id: idArtigo} = req.params;
    tabelaArtigos
    .destroy({ where: {id: idArtigo}})
    .then(itensDeletados => {
        if (itensDeletados == 0) {
        res.send("O item com ID " + idArtigo + " não foi encontrado");
        } else {
            res.send("O item com ID " + idArtigo + " foi deletado");
        }
    }).catch(error => {
        res.status(500).send("Não foi possível deletar o artigo");
    });
};

exports.deleteAll = (req, res) => {
    tabelaArtigos
    .destroy({ where: {}, truncate: false})
    .then(itensDeletados => {
        res.send("Foram deletados " + itensDeletados + " artigos");
    }).catch(error => {
        res.status(500).send("Não foi possível deletar os artigos");
    });
};


