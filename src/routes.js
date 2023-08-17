const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
    response.render("index", {
        colours: [
            { id: 1, name: "Blue" },
            { id: 2, name: "Red" },
            { id: 3, name: "Green" },
        ],
    });
    return;
});

module.exports = router;
