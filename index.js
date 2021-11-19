const express = require("express");
const app = express(); 
const port = 8000;

app.use(express.json());

app.get("/", function(req, res) {
    res.send("Dasa Educa - Artigos");
});

const database = require("./models");
database.sequelizeDatabase.sync();
//database.sequelizeDatabase.sync({ force: true}).then(() => {
//    console.log("Drop and re-sync db");
//});

//sync: sincronizar os dados, o force força a sincronizar, mas faz perder tudo que tinha no banco.

const router = require("./routes/artigos.routes");
router(app);


app.listen(port, function() {
    console.log("Ouvindo a porta", port);
});
//npm run start