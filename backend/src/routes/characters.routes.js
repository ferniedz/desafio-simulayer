const express = require("express");
const router = express.Router();
const {
    createCharacter,
    getCharacterById,
    updateCharacterById,
    deleteCharacterById
} = require("../controllers/characters.controllers");

router.post("/", createCharacter);
router.get("/:id", getCharacterById);
router.patch("/:id", updateCharacterById);
router.delete("/:id", deleteCharacterById);

module.exports = router;