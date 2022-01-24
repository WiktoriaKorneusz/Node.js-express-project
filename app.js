//requirement
const express = require("express");
const path = require("path");
const app = express();


const defaultRoutes = require("./routes/default")
const animeRoutes = require("./routes/anime")

//setting up ejs template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//adding styles and scripts
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

//routes and rendering

app.use("/", defaultRoutes)
app.use("/", animeRoutes)

app.use((req, res) => {
    res.status(404).render("404");
});
app.use((error, req, res, next) => {
    res.status(500).render("500");
});

app.listen(3000);
console.log("http://localhost:3000/");
