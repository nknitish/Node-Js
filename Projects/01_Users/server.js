import express from "express";
import userData from "./users.json" with { type: "json" };

const app = express();
const PORT = 4100;

app.get("/", (req, res) => {
  console.log(userData);
  res.send(userData);
});

app.get("/user/:id", (req, res) => {
  const paramsId = req.params.id;
  const filteredRecords = userData.filter((user) => user.id == paramsId);
  res.send(filteredRecords);
});

app.get("/username/:name", (req, res) => {
  const paramsName = req.params.name;
  res.send(
    userData.filter((user) =>
      user.name.toLowerCase().includes(paramsName.toLowerCase()),
    ),
  );
});

//
app.listen(PORT, () => console.log(`App is running on ${PORT}`));
