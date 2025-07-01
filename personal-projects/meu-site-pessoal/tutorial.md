# Tutorial: Como configurar o envio de e-mails do formulário de contato

Este tutorial explica como configurar o backend para que o formulário de contato do seu site envie os dados para seu e-mail e envie uma confirmação automática para quem preencheu.

## 1. Pré-requisitos
- Node.js instalado ([download aqui](https://nodejs.org/))
- Conta Gmail (recomenda-se ativar a verificação em duas etapas)

## 2. Gerando uma senha de app no Gmail
1. Acesse https://myaccount.google.com/security
2. Ative a verificação em duas etapas, se ainda não estiver ativa.
3. Após ativar, acesse "Senhas de app".
4. Gere uma senha de app para "E-mail" e "Computador".
5. Copie a senha gerada.

## 3. Instalando as dependências
Abra o terminal na pasta `meu-site-pessoal` e execute:

```
npm init -y
npm install express nodemailer cors body-parser
```

## 4. Configurando o backend
1. No arquivo `server.js`, substitua:
   ```js
   pass: 'SUA_SENHA_DE_APP_AQUI'
   ```
   pela senha de app gerada no passo 2.

2. Salve o arquivo.

## 5. Rodando o servidor
No terminal, execute:

```
node server.js
```

O servidor estará rodando em http://localhost:3000

## 6. Testando o formulário
1. Abra o site normalmente (arquivo `contato.html`).
2. Preencha o formulário e envie.
3. Você receberá um e-mail com os dados preenchidos.
4. Quem preencheu receberá um e-mail de confirmação.

## 7. Possíveis problemas
- Se o e-mail não chegar, verifique se a senha de app está correta.
- Veja se o servidor está rodando sem erros no terminal.
- Verifique a caixa de spam.

---
Dúvidas? Consulte o README ou peça ajuda!
