const express = require("express");
const animeFile = require("../utilities/anime-file")
const uuid = require("uuid");
const fetch = require("node-fetch");

const router = express.Router();

//url to Jikan API (url1 + query + url2)
const url1 = `https://api.jikan.moe/v3/search/anime?q=`;
const url2 = `&page=1`;

router.get("/recommend", (req, res) => {
    res.render("recommend");
});

//posting sorted anime
router.get("/anime", (req, res) => {
    let sort = req.query.sort;
    if (!sort) {
        sort = "1"
    }
    //path to data storage
    const storedAnime = animeFile.getAnimeData();

    switch(sort){
        case "1":
            //sorting via index (from newest to oldest)
            storedAnime.sort( (a, b) => a.index > b.index ? -1 : 1);
            break;
        case "2":            
            //sorting via index (from oldest to newest)
            storedAnime.sort( (a, b) => a.index > b.index ? 1 : -1);
            break;
        case "3":
            //sorting via name (ascending)
            storedAnime.sort( (a, b) => a.name > b.name ? 1 : -1);
            break;
        case "4":
            //sorting via name (descending)
            storedAnime.sort( (a, b) => a.name > b.name ? -1 : 1);
            break;
            
    }


    //rendering anime list with variables
    res.render("anime", { num: storedAnime.length, animeList: storedAnime });
});

//individual anime page
router.get("/anime/:id", (req, res) => {
    //getting anime list
    const storedAnime = animeFile.getAnimeData();

    const animeId = req.params.id;
    const anime = storedAnime.find((show) => show.id === animeId);
    if (anime) {
        res.render("individualAnime", { aid: animeId, anime: anime });
    } else {
        res.redirect("/page-not-found");
    }
});

//confirm page
router.get("/confirm", (req, res) => {
    res.render("confirm");
});

//form handler
router.post("/recommend", async (req, res) => {
    //form data
    const animeData = req.body;

    //adding individual id
    animeData.id = uuid.v4();

    //getting anime json file
    const storedAnime = animeFile.getAnimeData();
    const index = storedAnime.length;

    //fetching anime from  Jikan API
    const response = await fetch(url1 + animeData.name + url2);
    const data = await response.json();
    const list = data.results;

    //finding the anime
    let animeParams;
    if (list) {
        const anime = list.find(
            (anime) => anime.title.toLowerCase() == animeData.name.toLowerCase()
        );
        //adding data to animeData if anime if found in list
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
                index: index
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
                index: index
            };
        }
    }

    //pushing data to storage
    storedAnime.push(animeParams);
    animeFile.saveAnimeData(storedAnime);

    //redirecting to confirm page
    res.redirect("/confirm");
});

module.exports = router;
