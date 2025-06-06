var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function enviar_dados(idUsuario,  dificuldade,  pontuacao, tempo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, senha);
    
    var instrucaoSql = `
        INSERT INTO resultado (idUsuario,  dificuldade,  pontuacao, tempo) VALUES (${idUsuario},  ${dificuldade},  ${pontuacao}, ${tempo});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    enviar_dados
};