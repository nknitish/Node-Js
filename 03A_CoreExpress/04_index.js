import express from "express";
import morgan from "morgan";

const app = express();
const PORT = 4100;

//External Middleware
app.use(morgan("dev"));

app.get(`/`, (req, res) => res.send(`Hello World`));
app.get(`/wait`, (req, res) => {
  setTimeout(() => {
    res.send(`Result after one second`);
  }, 1000);
});

app.get(`/user`, (req, res) => res.send1(`User`));

app.get(`/error`, (req, res) => {});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // log error
  res.status(500).send("Try after some time");
});

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
