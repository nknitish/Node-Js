import http from "http";

const PORT = 4800;
const server = http.createServer((req, res) => {
  console.log(req.url);
  res.write(`<h1>${req.url}</h1>`);
  res.end(`Server is running on ${PORT}`);
});

server.listen(PORT);

//Getting data from Enviroment
console.log(process.argv[2]);
