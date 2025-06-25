// js/script.js

// Garante que o código só rode depois que a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o formulário pelo ID
    const form = document.getElementById('meuFormulario');

    // Verifica se o formulário existe na página atual antes de adicionar o listener
    if (form) {
        // Adiciona o evento de submit ao formulário
        form.addEventListener('submit', function(event) {
            // event.preventDefault() impede o envio do formulário
            // para que possamos validar os campos primeiro.

            let formValido = true;

            // Validação do campo Nome: exige pelo menos 3 caracteres
            const nome = document.getElementById('nome').value;
            if (nome.trim().length < 3) {
                alert('Por favor, insira um nome com pelo menos 3 caracteres.');
                formValido = false;
            }

            // Validação do campo E-mail: verifica se o e-mail está no formato correto
            const email = document.getElementById('email').value;
            // Regex que já valida a estrutura geral, incluindo o domínio.
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um e-mail válido.');
                formValido = false;
            }

            // Validação do campo Idade: exige idade mínima de 18 anos
            const idade = document.getElementById('idade').value;
            if (idade < 18) {
                alert('Você precisa ter pelo menos 18 anos.');
                formValido = false;
            }

            // Se o formulário não for válido, impede o envio
            if (!formValido) {
                event.preventDefault();
            }
            // Se for válido, o envio (GET para formAction.html) prosseguirá normalmente.
        });
    }
});