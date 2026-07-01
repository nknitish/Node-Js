import express from "express";
import path from "path";

const app = express();
const PORT = 4100;

// Middleware
const publicPath = path.resolve("public");
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("views/myForm.html"));
});

app.post("/submit", (req, res) => {
  res.send(`${req.body.name} -> Form Submitted`);
});

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
