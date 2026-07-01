import express from "express";
import { haldleUser, handleDynamicUser } from "./controller/usercontroller.js";

const app = express();
const PORT = 4100;

app.set("view engine", "ejs");

//Routes
app.get(`/`, haldleUser);

//Dynamic Route -> user/name
app.get(`/user/:name`, handleDynamicUser);

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
