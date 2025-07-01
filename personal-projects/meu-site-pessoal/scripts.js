// Animação simples de boas-vindas e destaque de links de contato
window.addEventListener("DOMContentLoaded", function () {
  // Animação de fade-in para o main
  const main = document.querySelector("main");
  if (main) {
    main.style.opacity = 0;
    main.style.transition = "opacity 1.2s";
    setTimeout(() => {
      main.style.opacity = 1;
    }, 200);
  }

  // Efeito hover animado nos links de contato
  const contatoLinks = document.querySelectorAll("section#contato ul li a");
  contatoLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.background = "#e3f2fd";
      this.style.borderRadius = "5px";
      this.style.transition = "background 0.3s";
    });
    link.addEventListener("mouseleave", function () {
      this.style.background = "none";
    });
  });

  // Função para enviar o formulário via fetch
  const form = document.getElementById('contatoForm');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const mensagem = document.getElementById('mensagem').value;
      const statusDiv = document.getElementById('mensagemStatus');
      statusDiv.textContent = 'Enviando...';
      try {
        const response = await fetch('http://localhost:3000/enviar-formulario', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, email, mensagem })
        });
        const data = await response.json();
        if (response.ok) {
          statusDiv.textContent = 'Formulário enviado com sucesso! Verifique seu e-mail.';
          form.reset();
        } else {
          statusDiv.textContent = 'Erro ao enviar. Tente novamente mais tarde.';
        }
      } catch (err) {
        statusDiv.textContent = 'Erro ao conectar com o servidor.';
      }
    });
  }
});
