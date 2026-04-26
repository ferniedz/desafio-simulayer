const express = require("express");
const router = express.Router();
const {
    createCharacter,
    getCharacters,
    getCharacterById,
    updateCharacterById,
    deleteCharacterById
} = require("../controllers/characters.controllers");

router.post("/", createCharacter);
router.get("/", getCharacters);     //funcao extra apenas para ser usado pelo formulario do frontend para adicionar persoangem a cena
router.get("/:id", getCharacterById);
router.patch("/:id", updateCharacterById);
router.delete("/:id", deleteCharacterById);

module.exports = router;