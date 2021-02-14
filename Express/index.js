const express = require("express"); //importando o express
const app = express(); //Iniciando o express

app.get("/", function (req, res) {
  res.send("Bem vindo ao site teste");
});

//rota com parâmetro opcional
app.get("/blog/:artigo?", function (req, res) {
  var artigo = req.params.artigo;

  if (artigo) {
    res.send("Artigo: " + artigo);
  } else {
    res.send("Bem vindo ao blog!");
  }
});

//Query params canal/youtube?canal=nomedocanal
app.get("/canal/youtube", function (req, res) {
  var canal = req.query["canal"];
  if (canal) {
    res.send(canal);
  } else {
    res.send("Nenhum canal");
  }
});

//Rota com parâmetro
app.get("/ola/:nome/:empresa", function (req, res) {
  //REQ => Dado enviado pelo usuário
  //RES => Resposta que será enviada pelo usuário
  var empresa = req.params.empresa;
  var nome = req.params.nome;
  res.send("Oi " + nome + " do " + empresa);
});

app.listen(4000, function (erro) {
  if (erro) {
    console.log("Ocorreu um erro!");
  } else {
    console.log("Servidor iniciado com sucesso!");
  }
});
