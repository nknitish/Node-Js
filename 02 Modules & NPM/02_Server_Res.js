// Creating server in node js;

import http from "http";

const server = http.createServer((req, res) => {
  //Setting type for header
  res.setHeader(`content-type`, "text/html");
  res.write(`<html> 
    <head> <title> My Next App </title/> </head>
    <body><h1>Hello World </h1></body>
    </html>`);
  res.end("Response Sent");

  //Exit after request
  //process.exit();
});

server.listen(4800);

//Creating another Server

const data = [
  { id: "1", name: "Nknitish", age: 26 },
  { id: "2", name: "Naveen", age: 26 },
  { id: "3", name: "Bharose", age: 26 },
];
const server2 = http.createServer((req, res) => {
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify(data));
});

server2.listen(4801);
