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

        usuarioModel.verificarApelidoExistente(apelido)
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

function login(req, res) {
    var apelido = req.body.apelidoServer;
    var senha = req.body.senhaServer;

    if (!apelido) {
        res.status(400).send("Seu login está undefined!");
    } else if (!senha) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(apelido, senha)
            .then((resultado) => {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`);

                if (resultado.length === 1) {
                    const user = resultado[0];

                    return res.json({
                        id: user.id,
                        senha: user.senha,
                        apelido: user.apelido
                    });

                } else if (resultado.length === 0) {
                    res.status(403).send("Login ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login!");
                }
            })
            .catch((erro) => {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    cadastrar,
    login
}

