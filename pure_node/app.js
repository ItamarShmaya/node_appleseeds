import http from "http";
import fs from "fs";
import path from "path";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.method !== "GET") {
    res.writeHead(400);
    return res.end("not found");
  }

  if (req.url === "/raw-html") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    return res.end("<h1>Welcome</h1>");
  }
  if (req.url === "/users") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    fs.readFile("./js/users.json", (err, content) => {
      res.end(content);
    });
    return;
  }

  if (req.url === "/styles.css") {
    res.statusCode = 200;
    res.writeHead(200, { "Content-Type": "text/css" });
    fs.readFile(`${__dirname}/css/styles.css`, (err, content) => {
      res.end(content);
    });
    return;
  }
  if (req.url === "/index.js") {
    res.statusCode = 200;
    res.writeHead(200, { "Content-Type": "text/javascript" });
    fs.readFile(`${__dirname}/js/index.js`, (err, content) => {
      res.end(content);
    });
    return;
  }

  const urlPath = req.url === "/" ? "/public/index.html" : req.url;
  const file = path.join(__dirname, urlPath);

  fs.readFile(file, (err, content) => {
    switch (req.url.slice(-3)) {
      case "css":
        res.writeHead(200, { "Content-Type": "text/css" });
        break;
      case ".js":
        res.writeHead(200, { "Content-Type": "text/javascript" });
        break;
      case "tml":
        res.writeHead(200, { "Content-Type": "text/html" });
        break;
    }
    if (err) res.end(err);
    res.end(content);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
