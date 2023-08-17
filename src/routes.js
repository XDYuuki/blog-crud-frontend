const express = require("express");
const router = express.Router();
const access = require("./auth/access");
const axios = require("./services/axiosConfig");

router.post("/new-post", (request, response) => {
    console.log("Body do post reate request: ", request.body);
    console.log("Access", access);

    if (access.isLoggedIn) {
        axios
            .post("items", {
                title: request.body.title,
                content: request.body.content,
                authorId: access.id,
            })
            .then((answer) => {
                console.log(answer.data);

                axios
                    .get("items")
                    .then((answer) => {
                        console.log("Posts:", answer.data);
                        response.render("pages/home", {
                            posts: answer.data.posts,
                        });
                    })
                    .catch((err) => {
                        console.log("error:", err);
                        response.render("pages/home", { posts: [] });
                    });
            })
            .catch((err) => {
                console.log("Error:", err);
                response.render("pages/home", { posts: [] });
            });
    } else {
        response.render("pages/landing");
    }
    return;
});

router.post("/signup", (request, response) => {});

router.get("/logout", (request, response) => {
    console.log("logout request");
    access.email = "";
    access.name = "";
    access.isLoggedIn = false;
    access.id = 0;

    response.render("pages/landing");
});

//login
router.post("/", (request, response) => {
    console.log("Body: ", request.body);

    //const answer = handlelogon(request.body.email);
    axios
        .post("login", {
            email: request.body.email,
        })
        .then((answer) => {
            console.log("post answer status", answer.status);

            if (answer.status == "200") {
                console.log("Data to check:", answer.data);
                access.email = answer.data.author[0].email;
                access.name = answer.data.author[0].name;
                access.isLoggedIn = true;
                access.id = answer.data.author[0].id;

                axios
                    .get("items")
                    .then((answer) => {
                        console.log("Posts:", answer.data);
                        response.render("pages/home", {
                            posts: answer.data.posts,
                        });
                    })
                    .catch((err) => {
                        console.log("error:", err);
                        response.render("pages/home", { posts: [] });
                    });
            } else {
                response.render("pages/landing");
            }
        })
        .catch((err) => {
            console.log("error:", err);
        });

    return;
});

router.get("/", (request, response) => {
    console.log("Isloged in:", access.isLoggedIn);
    if (access.isLoggedIn) {
        axios
            .get("items")
            .then((answer) => {
                console.log("Posts:", answer.data);
                response.render("pages/home", { posts: answer.data.posts });
            })
            .catch((err) => {
                console.log("error:", err);
                response.render("pages/home", { posts: [] });
            });
    } else {
        response.render("pages/landing");
    }
    return;
});

module.exports = router;
