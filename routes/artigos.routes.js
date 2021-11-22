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
- Deletar um artigo
- Deletar todos os artigos
*/

module.exports = (app) => {
    const artigosController = require("../controllers/artigos.controller");
    let router = require("express").Router();

    router.post("/", artigosController.create);

    router.get("/", artigosController.findAll);

    router.get("/findByPk", artigosController.findByPk);

    router.get("/findOne", artigosController.findOne);

    router.get("/findAllPublished", artigosController.findAllPublished);

    router.put("/:id", artigosController.update);

    router.put("/", artigosController.updateMany);

    router.delete("/:id", artigosController.delete);

    router.delete("/", artigosController.deleteAll);

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


