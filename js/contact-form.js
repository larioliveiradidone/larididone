/*
  FORMULÁRIO DE CONTATO (ainda sem função)

  Por enquanto o formulário não envia nada: este script impede o envio e avisa quem
  tentou, em vez de recarregar a página sem explicação. O aviso fica numa região
  role="status", então leitores de tela também o anunciam.

  Quando houver um serviço para receber as mensagens (ex.: Formspree, Netlify Forms):
    1. apague este arquivo e a linha <script> em contact.html;
    2. coloque o endereço do serviço no atributo action do <form> e method="post";
    3. marque como obrigatórios (required) os campos que precisarem e avise isso no texto.
*/
const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  status.textContent = "This form isn’t connected yet, so nothing was sent.";
});
