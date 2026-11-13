
const formulario = document.getElementById("formCadastro");
const campoNome = document.getElementById("nome");
const campoEmail = document.getElementById("email");
const mensagem = document.getElementById("mensagem");
const botao = document.getElementById("btnCadastrar");

formulario.addEventListener("submit", async function(event) {
    event.preventDefault();

    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim();

    mensagem.textContent = "";
    mensagem.className = "";

    // Verifica campos vazios
    if (!nome || !email) {
        mostrarMensagem("Preencha todos os campos!", "erro");
        return;
    }

    // Validação do formato do e-mail
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email)) {
        mostrarMensagem("Digite um e-mail válido!", "erro");
        return;
    }

    botao.disabled = true;
    botao.textContent = "Cadastrando...";

    try {
        const resposta = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                email: email
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.mensagem || "Erro ao realizar cadastro.");
        }

        mostrarMensagem(dados.mensagem, "sucesso");

        // Limpa os campos somente após o sucesso
        formulario.reset();

    } catch (erro) {
        mostrarMensagem(
            erro.message || "Não foi possível conectar ao servidor.",
            "erro"
        );

    } finally {
        botao.disabled = false;
        botao.textContent = "Cadastrar usuário";
    }
});

function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;
}
