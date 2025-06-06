    function cadastrar() {
        var apelidoVar = ipt_nome.value;
        var senhaVar = ipt_senha.value;
        var confSenha = ipt_confsenha.value;

        if (
            nomeVar == "" ||
            senhaVar == "" ||
            confirmacaoSenhaVar == "" ||
        ) {
            cardErro.style.display = "block";
            mensagem_erro.innerHTML =
                "Preecha todos os campos";

            finalizarAguardar();
            return false;
        } if (senhaVar.length < 8) {
            cardErro.style.display = "block";
            mensagem_erro.innerHTML =
                "Senha inválida. Deve conter no mínimo 8 dígitos.";

            finalizarAguardar();
            return false;
        } else if (confirmacaoSenhaVar != senhaVar) {
            cardErro.style.display = "block";
            mensagem_erro.innerHTML =
                "Campo senha e confirmação de senha devem ser iguais.";

            finalizarAguardar();
            return false;
        } else {
            setInterval(sumirMensagem, 5000);
        }

        // Enviando o valor da nova input
        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                apelidoServer: nomeVar,
                senhaServer: senhaVar
            }), 
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    cardErro.style.display = "block";

                    mensagem_erro.innerHTML =
                        "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

                    setTimeout(() => {
                        window.location = "login.html";
                    }, "2000");

                    limparFormulario();
                    finalizarAguardar();
                } else {
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
                finalizarAguardar();
            });

        return false;
    }

    function sumirMensagem() {
        cardErro.style.display = "none";
    }