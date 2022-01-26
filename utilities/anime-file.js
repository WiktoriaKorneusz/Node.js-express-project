const fs = require("fs");
const path = require("path");

//path to json filr
const filePath = path.join(__dirname, "..", "data", "anime.json");

//function to get anime
const getAnimeData = () => {
    const fileData = fs.readFileSync(filePath);
    const storedAnime = JSON.parse(fileData);

    return storedAnime;
};

//function to rewrite anime file
const saveAnimeData = (storedAnime) => {
    fs.writeFileSync(filePath, JSON.stringify(storedAnime));
};

module.exports = {
    getAnimeData: getAnimeData,
    saveAnimeData: saveAnimeData,
};
