const express = require("express");
const users = require("./data/users.json");

// create an express app instance
const app = express();

app.get("/", (req, res) => {
    console.log("GET request received on /");
    res.json(users);
});

app.listen(3000)