require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

const sceneRoutes = require("./src/routes/scenes.routes");
const characterRoutes = require("./src/routes/characters.routes");

app.use("/scenes", sceneRoutes);
app.use("/characters", characterRoutes);

const errorHandler = require("./src/middlewares/errorHandler");

app.use(errorHandler);

app.listen(PORT, async() => {
    console.log("The server is online and running on port", PORT);
});