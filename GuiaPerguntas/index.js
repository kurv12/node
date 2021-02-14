const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//Database
connection
  .authenticate()
  .then(() => {
    console.log("Conexão efetuada com sucesso!");
  })
  .catch((msgErro) => {
    console.log("msgErro");
  });

//Avisando ao express usar ejs como view engine
app.set("view engine", "ejs");
//Para aceitar arquivos estáticos (public)
app.use(express.static("public"));

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/", (req, res) => {
  Pergunta.findAll({ raw: true, order: [["id", "DESC"]] }).then((perguntas) => {
    res.render("index", {
      perguntas: perguntas,
    });
  });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  Pergunta.create({
    titulo: titulo,
    descricao: descricao,
  }).then(() => {
    res.redirect("/");
  });
});

app.get("/pergunta/:id", (req, res) => {
  var id = req.params.id;
  Pergunta.findOne({
    where: { id: id },
  }).then((pergunta) => {
    if (pergunta != undefined) {
      Resposta.findAll({
        where: { perguntaId: pergunta.id },
        order: [["id", "DESC"]],
      }).then((respostas) => {
        res.render("pergunta", {
          pergunta: pergunta,
          respostas: respostas,
        });
      });
    } else {
      res.redirect("/");
    }
  });
});

app.post("/responder", (req, res) => {
  var corpo = req.body.corpo;
  var perguntaId = req.body.pergunta;
  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId,
  }).then(() => {
    res.redirect("/pergunta/" + perguntaId);
  });
});

app.listen(8080, () => {
  console.log("App rodando!");
});

//EXEMPLO DE TRANSMITIR VARIÁVEIS

// app.get("/:nome/:lang", (req, res) => {
//   var nome = req.params.nome;
//   var lang = req.params.lang;
//   var exibirMSG = false;

//   var produtos = [
//     { nome: "Doritos", preco: 3.14 },
//     { nome: "ColaCola", preco: 5 },
//     { nome: "Leite", preco: 1.45 },
//   ];
//   res.render("index", {
//     nome: nome,
//     lang: lang,
//     empresa: "mega junior",
//     msg: exibirMSG,
//     produtos: produtos,
//   });
// });

//EM UM ARQUIVO EJS

// <!-- Imprimindo variáveis dinâmicas -->
//     <p><%= nome %></p>
//     <p><%= lang %></p>
//     <p><%= empresa %></p>

//     <% if(msg){ %>
//     <h3>Isso é uma mensagem de erro!</h3>
//     <% } %>
//     <!-- // -->
//     <% produtos.forEach(function(produto){ %>
//     <hr />
//     <p><%= produto.nome %></p>
//     <p><%= produto.preco %></p>
//     <% }) %>
