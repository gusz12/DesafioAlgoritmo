var usuarioModel = require("../models/usuarioModel");

function cadastrar(req, res) {
    var apelido = req.body.apelidoServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores | da pra simplificar
    if (apelido == undefined) {
        res.status(400).send("Seu apelido está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        usuarioModel.verificarEmailOuApelidoExistente(apelido)
            .then(usuarios => {
                let mensagem = "";

                for (i = 0; i < usuarios.length; i++) {
                    const user = usuarios[i];

                    if (user.apelido === apelido && !mensagem.includes("Apelido já cadastrado")) {
                        mensagem += "Apelido já cadastrado. ";
                    }
                }

                if (mensagem !== "") {
                    return res.status(409).send(mensagem);
                }

                return usuarioModel.cadastrar(apelido, senha);
            })
            .then(resultado => {
                if (resultado) {
                    res.status(201).json(resultado);
                } else {
                    res.status(500).send("Erro ao cadastrar o usuário.");
                }
            })
            .catch(erro => {
                console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var apelido = req.body.apelidoServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(apelido, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
}

module.exports = {
    cadastrar
}