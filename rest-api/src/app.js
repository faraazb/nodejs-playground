const express = require("express");
const dotenv = require("dotenv");
const usersRouter = require("./routes/users.routes");
const User = require("./models/User.model");

// console.log(process.env.PORT);

const app = express();

app.use(express.json());

app.use("/users", usersRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT} 🟢`)
});
