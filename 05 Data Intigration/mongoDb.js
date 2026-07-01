import express from "express";
import { ObjectId } from "mongodb";
import { MongoClient } from "mongodb";
const app = express();
const PORT = 4100;

//Middleware for form data -
app.use(express.urlencoded({ extended: true }));

//Middleware for json
app.use(express.json());

const dbUrl = `mongodb://localhost:27017`;
const dbName = "school";

//Creating clinet for mongodb
const client = new MongoClient(dbUrl);

client.connect().then((connection) => {
  const db = connection.db(dbName);
  const collection = db.collection("students");

  app.get(`/api`, async (req, resp) => {
    const data = await collection.find().toArray();
    resp.send(data);
  });

  app.post(`/api`, async (req, resp) => {
    const result = await collection.insertOne({ ...req.body });
    resp.send(result);
  });

  app.delete(`/api/:id`, async (req, resp) => {
    const id = req.params.id;

    if (!id) {
      resp.send({ message: "Id not found" });
      return false;
    }

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    resp.send(result);
  });
});

app.listen(PORT, () => console.log(`App is running on PORT ${PORT}`));
