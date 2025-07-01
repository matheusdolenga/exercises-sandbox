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
});
