const express = require("express");
const path = require("path");
const routes = require("./routes");
const bodyParser = require("body-parser");

class AppController {
    app;
    constructor() {
        this.app = express();

        this.midlewares();
        this.useRouts();
        this.setUp();
    }

    useRouts() {
        this.app.use(routes);
    }

    midlewares() {
        this.app.use(express.static("public"));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        this.app.use(express.static(path.join(__dirname, "public")));
    }

    setUp() {
        this.app.set("view engine", "ejs");
        this.app.set("views", path.join(__dirname, "/views"));
    }
}

module.exports = new AppController().app;
