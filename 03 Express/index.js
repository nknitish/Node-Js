import express from "express";

const PORT = 4100;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World 6");
  res.end();
});

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
