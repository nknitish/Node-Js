import http from "http";
import fs from "fs";

// const server = http.createServer((req, res) => {
//   const myHtmlFile = fs.readFileSync("myHtml.html", "utf-8");
//   res.setHeader("content-type", "text/html");
//   res.write(myHtmlFile);
//   res.end();
// });

const server = http.createServer((req, res) => {
  fs.readFile("html/myHtml.html", (err, data) => {
    if (err) {
      res.write("Internal Server Error");
      res.end();
      return;
    }

    res.writeHead(200, { "content-type": "text/html" });
    res.write(data);
    res.end();
  });
});

server.listen(4100);
