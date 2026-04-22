const express = require("express");
const router = express.Router();
const {
    createScene,
    getScenes,
    getSceneById,
    deleteSceneById,
    manageCharacterInScene
} = require("../controllers/scenes");

router.post("/", createScene);
router.get("/", getScenes);
router.get("/:id", getSceneById);
router.delete("/:id", deleteSceneById);
router.post("/:id/characters", manageCharacterInScene);

module.exports = router;