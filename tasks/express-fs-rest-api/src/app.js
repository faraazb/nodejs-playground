const express = require("express");
const dotenv = require("dotenv");
const usersRouter = require("./routes/users.routes");
const { sendErrorResponse } = require("./helpers/response");

const app = express();

// get environment variables from .env file
dotenv.config()
const PORT = process.env.PORT || 3000;

app.use(express.json());

// app routes
app.use("/users", usersRouter);

app.use(sendErrorResponse);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🟢`)
});
