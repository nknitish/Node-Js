import express from "express";
import path from "path";
// import LoginPage from "./views/Login.html";

const app = express();
const port = 4100;

const publicPath = path.resolve("public");

//using static files
app.use(express.static(publicPath));

//Absoulte path for views
const absPath = path.resolve("views");

//Setting Path
app.get("/", (req, res) => {
  res.sendFile(absPath + `/Login.html`);
});

//Apply a middleware
app.use((req, res) => {
  //apply 404
  res.status(404).sendFile(absPath + `/404.html`);
});

//starting server
app.listen(port, () => console.log(`App is running on ${port}`));
