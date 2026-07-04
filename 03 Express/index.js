import express from "express";
import { log } from "./middleware/logger.js";
import { error404, globalErrorHandler } from "./middleware/error.js";
import usersRouter from "./routes/users.js";
import todosRouter from "./routes/todos.js";

const PORT = 4100;
const app = express();

// Build it middleware
app.use(express.json());

//Applying middleware on App level
app.use(log);
app.use(error404); // Custom middleware for error hanlding
app.use(globalErrorHandler); // Gloabl Error handler middleware

//Applying Routers
app.use("/users", usersRouter);
app.use("/todos", log, todosRouter); //Route level middleware

// Applying Route-level Middleware
app.get("/", log, (req, res) => {
  res.send("Welcome to Home Page");
});

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
