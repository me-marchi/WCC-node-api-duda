// rotas do sistema de artigos

/* 
GET
- Obter todos os artigos
- Obter um artigo específico
- Obter todos os artigos publicados

POST
- Criar um novo artigo

PUT
- Publicar meu artigo
- Editar meu artigo

DELETE
- Deletar um artigo.
*/

module.exports = (app) => {
    const artigosController = require("../controllers/artigos.controller");
    let router = require("express").Router();

    router.post("/", artigosController.create);

    app.use("/artigos", router); 
}

/*
router.post("/", artigosController.create);

é o mesmo que 

router.post("/", function (req, res) {
    artigosController.create(req,res);
});

porém mais resumido
*/


