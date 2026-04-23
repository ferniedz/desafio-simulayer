const prisma = require("../lib/prisma");
const { createSceneSchema, manageCharacterInSceneSchema } = require("../validators/scene.validator");
const { getScenesSchema } = require("../validators/pagination.validator");

const createScene = async (req, res) => {
    try {
        const validation = createSceneSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ errors: validation.error.issues.map(e => e.message) });
        }

        const { name, description } = validation.data;

        const scene = await prisma.scene.create({
            data: { name, description }
        });

        res.status(201).json(scene);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getScenes = async (req, res) => {
    try {
        const validation = getScenesSchema.safeParse(req.query);

        if (!validation.success) {  //eu tinha feito isso para que o usuario mandasse dados p/ pagina e limite de cenas por pagina na query, mas resolvi tirar essa parte do meu projeto, so que deixei esse trecho para nao dar problema
            return res.status(400).json({ message: "'Scenes' and 'limit' fields must be positive numbers." });
        }   //mas acaba servindo como uma validacao extra

        const { page, limit } = validation.data;

        let skip = (page - 1) * limit;

        const [total, scenes] = await Promise.all([
            prisma.scene.count(),
            prisma.scene.findMany({
                skip: skip,
                take: limit,
                include: { characters: { include: { character: true } } }
            })
        ]);

        res.status(200).json({
            scenes,
            "meta": {
                "totalItems": total,
                "totalPages": Math.ceil(total / limit),
                "currentPage": page,
                "itemsPerPage": limit
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });     //erro interno do servidor
    }
}

const getSceneById = async (req, res) => {
    try {
        const { id } = req.params;
        const scene = await prisma.scene.findUnique({
            where: { id },
            include: { characters: { include: { character: true } } }
        });

        if (!scene) {
            return res.status(404).json({ message: "Scene not found." });
        }

        res.status(200).json(scene);

    } catch (error) {
        res.status(400).json({ message: "Invalid ID." });
    }
}

const deleteSceneById = async (req, res) => {
    try {
        const { id } = req.params;

        const removedScene = await prisma.scene.delete({
            where: { id }
        });

        res.status(200).json(removedScene);

    } catch (error) {
        res.status(400).json({ message: "Invalid ID." });
    }
}

const manageCharacterInScene = async (req, res) => {
    try {
        const { id: sceneId } = req.params;     //pega o id da cena que é o mesmo da URL

        const validation = manageCharacterInSceneSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ errors: validation.error.issues.map(e => e.message) });
        }

        const { characterId, action } = validation.data;

        const scene = await prisma.scene.findUnique({
            where: { id: sceneId }
        });

        const character = await prisma.character.findUnique({
            where: { id: characterId }
        });

        if (!scene) {
            return res.status(404).json({ message: "Scene not found." });
        }

        if (!character) {
            return res.status(404).json({ message: "Character not found." });
        }

        const characterAlreadyInScene = await prisma.sceneCharacter.findUnique({
            where: {
                sceneId_characterId: { sceneId, characterId }
            }
        });

        if (action == "add") {

            if (characterAlreadyInScene) {
                return res.status(400).json({ message: "Character already in scene." });
            }

            const sceneCharacter = await prisma.sceneCharacter.create({
                data: { sceneId, characterId }
            });

            return res.status(201).json(sceneCharacter);    //criação de dado no banco de dados

        }

        if (action == "remove") {

            if (!characterAlreadyInScene) {
                return res.status(400).json({ message: "Character already not in scene." });
            }

            const sceneCharacter = await prisma.sceneCharacter.delete({
                where: { sceneId_characterId: { sceneId, characterId } }
            });

            return res.status(200).json(sceneCharacter);

        }

        if (action != "add" && action != "remove") {
            return res.status(400).json({ message: "Action must be 'add' or 'remove'." });
        }

    } catch (error) {
        res.status(400).json({ message: "Invalid ID(s)." });
    }
}

module.exports = {
    createScene,
    getScenes,
    getSceneById,
    deleteSceneById,
    manageCharacterInScene
}