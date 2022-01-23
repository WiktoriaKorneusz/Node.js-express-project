//requirement
const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const uuid = require("uuid");
const fetch = require("node-fetch");


const animeFile = require("./utilities/anime-file")
//url to Jikan API (url1 + query + url2)
const url1 = `https://api.jikan.moe/v3/search/anime?q=`;
const url2 = `&page=1`;

//setting up ejs template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//adding styles and scripts
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

//routes and rendering
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});
app.get("/recommend", (req, res) => {
    res.render("recommend");
});
app.get("/page-not-found", (req, res) => {
    res.status(404).render("404");
});
app.get("/something-went-wrong", (req, res) => {
    res.status(500).render("500");
});
app.get("/anime", (req, res) => {
    //path to data storage
    const storedAnime = animeFile.getAnimeData();

    //rendering anime list with variables
    res.render("anime", { num: storedAnime.length, animeList: storedAnime });
});

app.get("/anime/:id", (req, res) => {
    //path to data.json
    const storedAnime = animeFile.getAnimeData();

    const animeId = req.params.id;
    const anime = storedAnime.find((show) => show.id === animeId);
    if (anime) {
        res.render("individualAnime", { aid: animeId, anime: anime });
    } else {
        res.redirect("/page-not-found");
    }
});

app.get("/confirm", (req, res) => {
    res.render("confirm");
});

//form handler
app.post("/recommend", async (req, res) => {
    //form data
    const animeData = req.body;
    animeData.id = uuid.v4();
    //path to data.json
    
    const storedAnime = animeFile.getAnimeData();

    //fetching anime
    const response = await fetch(url1 + animeData.name + url2);
    const data = await response.json();
    const list = data.results;

    //finding the anime
    let animeParams;
    if (list) {
        const anime = list.find(
            (anime) => anime.title.toLowerCase() == animeData.name.toLowerCase()
        );
        //adding image data to animeData
        if (anime) {
            let startDate, endDate;
            if (!anime.end_date) {
                endDate = "N/A";
            } else {
                endDate = anime.end_date.slice(0, 10);
            }
            if (!anime.start_date) {
                startDate = "N/A";
            } else {
                startDate = anime.start_date.slice(0, 10);
            }
            animeParams = {
                ...animeData,
                img: anime.image_url,
                start: startDate,
                end: endDate,
                rate: anime.rated,
                score: anime.score,
                episodes: anime.episodes,
            };
        } else {
            animeParams = {
                ...animeData,
                img: "/img/imageNotFound.png",
                start: "N/A",
                end: "N/A",
                rate: "N/A",
                score: "N/A",
                episodes: "N/A",
            };
        }
    }

    //pushing data to storage
    storedAnime.push(animeParams);
    animeFile.saveAnimeData(storedAnime)

    //redirecting to confirm page
    res.redirect("/confirm");
});

app.use((req, res) => {
    res.redirect("/page-not-found");
});
app.use((error, req, res, next) => {
    res.redirect("/something-went-wrong");
});

app.listen(3000);
console.log("http://localhost:3000/");
