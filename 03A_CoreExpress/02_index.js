import express from "express";
const app = express();
const PORT = 4100;

const checkAge = (req, res, next) => {
  if (!req.query.age || req.query.age < 18) {
    res.send(`<h1> Alert! You can't access this page </h1>`);
  }
  next();
};

const getURl = (req, res, next) => {
  console.log("URL ->", req.url);
  next();
};

//Applying middleware globally
// app.use(getURl);
// app.use(checkAge);

// Applying middleware mannually
//Routes
app.get("/", getURl, (req, res) => res.send("Helo world"));
app.get("/user", checkAge, (req, res) => res.send("User Page"));
app.get("/products", checkAge, getURl, (req, res) => res.send("Product Page"));

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
