const prisma = require("../lib/prisma");
const { createCharacterSchema, updateCharacterByIdSchema } = require("../validators/character.validator")

const createCharacter = async (req, res) => {
    try {
        const validation = createCharacterSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ errors: validation.error.issues.map(e => e.message) });
        }

        const { name, personalityPrompt } = validation.data;

        const character = await prisma.character.create({
            data: { name, personalityPrompt },
        });

        res.status(201).json(character);    //retorna que foi criado com sucesso

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getCharacterById = async (req, res) => {
    try {
        const { id } = req.params;

        const character = await prisma.character.findUnique({
            where: { id },
        });

        if (!character) {
            return res.status(404).json({ message: "Character not found." });
        }

        res.status(200).json(character);

    } catch (error) {
        res.status(400).json({ message: "Invalid ID." });
    }
}

const updateCharacterById = async (req, res) => {
    try {
        const { id } = req.params;

        const validation = updateCharacterByIdSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ errors: validation.error.issues.map(e => e.message) });
        }

        const { name, personalityPrompt } = validation.data;

        const characterExists = await prisma.character.findUnique({
            where: { id: id }
        });

        if (!characterExists) {     //se o personagem nao existir, prisma mandaria um erro que cairia direto no catch
            return res.status(404).json({ message: "Character not found." });   //com essa parte, ele retorna um erro mais especifico
        }

        const updatedCharacter = await prisma.character.update({
            where: { id: id },
            data: { name, personalityPrompt }
        });

        res.status(200).json(updatedCharacter);

    } catch (error) {
        res.status(400).json({ message: "Invalid ID." });
    }
}

const deleteCharacterById = async (req, res) => {
    try {
        const { id } = req.params;

        const removedCharacter = await prisma.character.delete({
            where: { id: id }
        });

        if(!removedCharacter) {
            return res.status(404).json({ message: "Character not found." });
        }

        res.status(200).json(removedCharacter);

    } catch (error) {
        res.status(400).json({ message: "Invalid ID." });
    }
}


    
module.exports = {
    createCharacter,
    getCharacterById,
    updateCharacterById,
    deleteCharacterById
}