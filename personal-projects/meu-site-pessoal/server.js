const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure seu e-mail e senha do app (use senha de app, não a senha principal)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'matheusdolenga21@gmail.com', // seu e-mail
    pass: 'SUA_SENHA_DE_APP_AQUI' // gere uma senha de app no Google
  }
});

app.post('/enviar-formulario', async (req, res) => {
  const { nome, email, mensagem } = req.body;

  // E-mail para você
  const mailToYou = {
    from: 'matheusdolenga21@gmail.com',
    to: 'matheusdolenga21@gmail.com',
    subject: 'Novo contato pelo formulário',
    text: `Nome: ${nome}\nE-mail: ${email}\nMensagem: ${mensagem}`
  };

  // E-mail de confirmação para o usuário
  const mailToUser = {
    from: 'matheusdolenga21@gmail.com',
    to: email,
    subject: 'Recebemos seu contato!',
    text: `Olá, ${nome}!\n\nRecebemos sua mensagem e em breve entraremos em contato.\n\nMensagem enviada:\n${mensagem}\n\nAtenciosamente,\nMatheus Dolenga`
  };

  try {
    await transporter.sendMail(mailToYou);
    await transporter.sendMail(mailToUser);
    res.status(200).json({ message: 'Formulário enviado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao enviar e-mail.', error });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
