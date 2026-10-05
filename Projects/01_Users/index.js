import express from "express";
import userRouter from "./router/userRouter.js";
import postRouter from "./router/postRouter.js";
import "dotenv/config";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/error.js";
import { connectDB } from "./config/db.js";

// App
const app = express();
const PORT = process.env.PORT || 4000;

//connect to db
await connectDB();

//Middleware & Route
app.use(logger);

//Basic Route

app.get("/", (req, res) => res.send("Welome to Node Js Project"));

app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", postRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`App is running on PORT ${PORT}`));
