import http from "http";
import fs from "fs";
import { json } from "stream/consumers";

const PORT = 4100;

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    fs.readFile(`html/form.html`, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("Internal Server Error");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }

  //Reading form data

  if (req.url == "/submit") {
    let dataBody = [];
    req.on("data", (chunk) => {
      dataBody.push(chunk);
    });

    req.on("end", () => {
      let rowData = Buffer.concat(dataBody).toString();
      res.end(rowData);
    });
  }
});

server.listen(PORT);
