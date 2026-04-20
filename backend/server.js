require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, async() => {
    console.log("O servidor está online e rodando na porta", PORT);
});