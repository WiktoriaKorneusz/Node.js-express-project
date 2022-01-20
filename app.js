//requirement
const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const fetch = require('node-fetch');

//url to fetch (url1 + query + url2)
const url1 = `https://api.jikan.moe/v3/search/anime?q=`;
const url2 = `&page=1`;


//adding styles and scripts
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));

//routes
app.get("/", (req, res) => {
    const filePath = path.join(__dirname, "views", "index.html");
    res.sendFile(filePath);
});
app.get("/about", (req, res) => {
    const filePath = path.join(__dirname, "views", "about.html");
    res.sendFile(filePath);
});
app.get("/recommend", (req, res) => {
    const filePath = path.join(__dirname, "views", "recommend.html");
    res.sendFile(filePath);
});
app.get("/anime", (req, res) => {
    const filePath = path.join(__dirname, "views", "anime.html");
    res.sendFile(filePath);
});
app.get("/confirm", (req, res) => {
    const filePath = path.join(__dirname, "views", "confirm.html");
    res.sendFile(filePath);
});

//form handler
app.post("/recommend", async (req, res) => {
    //form data
    const animeData = req.body;

    //path to data storage
    const filePath = path.join(__dirname, "data", "anime.json");
    const fileData = fs.readFileSync(filePath);
    const storedAnime = JSON.parse(fileData);

    //fetching anime
    const response = await fetch(url1 + animeData.name + url2);
    const data = await response.json();
    const list = data.results;

    //finding the anime
    const anime = list.find(
        (anime) => anime.title.toLowerCase() == animeData.name.toLowerCase()
    );

    //adding image data to animeData
    let animeParams;
    if (anime){
        animeParams = {...animeData, img: anime.image_url};
    } else {
        animeParams = {...animeData, img: "img/imageNotFound.png"};
    }

    //pushing data to storage
    storedAnime.push(animeParams);
    fs.writeFileSync(filePath, JSON.stringify(storedAnime));

    //redirecting to confirm page
    res.redirect("/confirm");
    
});


app.listen(3000);
console.log("http://localhost:3000/");
