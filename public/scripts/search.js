const num = document.querySelector(".num");
const numberOfAnime = num.textContent;
const listItem = [...document.querySelectorAll(".anime-item")];
const input = document.querySelector("#search");
const searchButton = document.querySelector("#search-btn");
const list = document.querySelector("#anime-list");

const search = () => {
    let foundAnime = 0;
    //looping through every anime to check if it's title contains searched word
    listItem.forEach((anime) => {
        const animeName = anime.querySelector(".anime-name").textContent;

        if (
            animeName.toLowerCase().includes(input.value.toLowerCase().trim())
        ) {
            anime.style.display = "flex";
            foundAnime += 1;
        } else {
            anime.style.display = "none";
        }
    });
    //changing value of num if exist
    if (num) {
        num.textContent = foundAnime;
    }
};

searchButton.addEventListener("click", search);
