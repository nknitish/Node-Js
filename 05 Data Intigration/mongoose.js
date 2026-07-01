import express, { json } from "express";
import mongoose from "mongoose";
import studentModal from "./modal/studentModal.js";
const app = express();
const PORT = 4100;

app.use(express.json());

const dbUrl = `mongodb://localhost:27017`;
const dbName = "school";

await mongoose.connect(`${dbUrl}/${dbName}`).then(() => {
  console.log("-----------DB Connnected------------");
});

app.get("/", async (req, resp) => {
  const result = await studentModal.find();
  resp.send(result);
});

app.post("/add", async (req, resp) => {
  console.log(req.body);
  const result = await studentModal.create(req.body);
  resp.send({
    message: "Data Inserted",
    data: result,
  });
});

app.put("/update/:id", async (req, resp) => {
  const { id } = req.params;
  const result = await studentModal.findByIdAndUpdate(id, req.body);

  resp.send({
    message: "Data Updated",
    data: result,
  });
});

app.delete("/delete/:id", async (req, resp) => {
  const { id } = req.params;
  const result = await studentModal.findByIdAndDelete(id);

  resp.send({
    message: "Data Deleted",
    data: result,
  });
});

//server
app.listen(PORT, () => console.log(`App is running on ${PORT}`));
