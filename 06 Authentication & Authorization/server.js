import express, { json } from "express";

const app = express();
const PORT = 4100;

app.use(express.json());

app.get("/", (req, res) => res.send("Hello World"));

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
