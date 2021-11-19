// configuração do banco de dados

//Não colocar este link no GitHub por que assim, qualquer um pode ter acesso e alterar todos os dados
//npm install --save dotenv

const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    connectionsStringUrl: process.env.DB_CONNECTION_STRING_URL,
    dialect: "postgres"
};

