  function entrar() {
        aguardar();

        var apelidoVar = ipt_nome.value;
        var senhaVar = ipt_senha.value;

        if (apelidoVar == "" || senhaVar == "") {
            cardErro.style.display = "block"
            mensagem_erro.innerHTML = "Você deixou todos os campos em branco ";
            finalizarAguardar();
            return false;
        }
        else {
            setInterval(sumirMensagem, 5000)
        }

        console.log("FORM LOGIN: ", apelidoVar);
        console.log("FORM SENHA: ", senhaVar);

        fetch("/usuarios/login", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                apelidoServer: apelidoVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    sessionStorage.APELIDO_USUARIO = json.apelido;
                    sessionStorage.ID_USUARIO = json.idUsuario;

                    setTimeout(function () {
                        window.location = "../public/index.html";
                    }, 1000); // apenas para exibir o loading

                });

            } else {

                console.log("Houve um erro ao tentar realizar o login!");

                resposta.text().then(texto => {
                    console.error(texto);
                    finalizarAguardar(texto);
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;
    }

    function sumirMensagem() {
        cardErro.style.display = "none"
    }