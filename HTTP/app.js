var http = require("http");
//Nesse caso ele já carrega o pacote e ai é só escolher a porta onde irá escutar.
http
  .createServer(function (req, res) {
    res.end("<h1>Bem vindo ao Site teste!</h1>");
  })
  .listen(8080);

console.log("Meu servidor está rodando");
