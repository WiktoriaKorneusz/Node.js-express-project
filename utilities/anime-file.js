const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "data", "anime.json");

const getAnimeData = () => {
    const fileData = fs.readFileSync(filePath);
    const storedAnime = JSON.parse(fileData);

    return storedAnime;
};

const saveAnimeData = (storedAnime) => {
    fs.writeFileSync(filePath, JSON.stringify(storedAnime));
};

module.exports = {
    getAnimeData: getAnimeData,
    saveAnimeData: saveAnimeData,
};
