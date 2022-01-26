const express = require("express")

const router = express.Router();

//home page
router.get("/", (req, res) => {
    res.render("index");
});

//about page
router.get("/about", (req, res) => {
    res.render("about");
});

module.exports = router;