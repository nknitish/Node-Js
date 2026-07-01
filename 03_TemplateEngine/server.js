import express from "express";
const app = express();
const PORT = 4100;

//Middleware for form data
app.use(express.urlencoded({ extended: false }));

//setting Engine as ejs
app.set(`view engine`, "ejs");

// Routes
app.get(`/`, (req, res) => {
  res.render("home", { name: "Nitish", age: 27 });
});

app.get(`/add-user`, (req, res) => {
  res.render("form");
});

app.post(`/set-user`, (req, res) => {
  res.render(`submit`, { ...req.body });
});

//
app.listen(PORT, () => console.log(`App is running on ${PORT}`));
