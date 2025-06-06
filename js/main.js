function enviar_dados() {
    // if (

    //     apelidoVar == "" ||
    //     senhaVar == "" ||
    //     confSenhaVar == ""
    //     ) {
    //     cardErro.style.display = "block";
    //     mensagem_erro.innerHTML =
    //         "Preecha todos os campos";

    //     finalizarAguardar();
    //     return false;
    // } if (senhaVar.length < 8) {
    //     cardErro.style.display = "block";
    //     mensagem_erro.innerHTML =
    //         "Senha inválida. Deve conter no mínimo 8 dígitos.";

    //     finalizarAguardar();
    //     return false;
    // } else if (confSenhaVar != senhaVar) {
    //     cardErro.style.display = "block";
    //     mensagem_erro.innerHTML =
    //         "Campo senha e confirmação de senha devem ser iguais.";

    //     finalizarAguardar();
    //     return false;
    // } else {
    //     setInterval(sumirMensagem, 5000);
    // }

    // Enviando o valor da nova input

    fetch(`/usuarios/enviar_dados/${idUsuario},  ${dificuldade},  ${pontuacao}, ${tempo}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            usuario_id: idUsuario,
            dificuldade_id: dificuldade,
            pontuacao: pontuacao,
            tempo: tempo
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