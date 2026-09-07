import express from "express";
import userRouter from "./router/userRouter.js";
import "dotenv/config";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/error.js";
import { connectDB } from "./config/db.js";

// App
const app = express();
const PORT = process.env.PORT;

//connect to db
await connectDB();

//Middleware & Route

app.use(logger);

app.use(express.json());
app.use("/users", userRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`App is running on PORT ${PORT}`));
