const { z } = require("zod")

const createSceneSchema = z.object({
    name: z.string().min(1, "The 'name' field is required."),
    description: z.string().min(1, "The 'description' field is required.")
})

const manageCharacterInSceneSchema = z.object({
    characterId: z.string().min(1, "The 'characterId' field is required"),
    action: z.enum(["add", "remove"], {
        message: "The 'action' field must be 'add' or 'remove'."
    })
})

module.exports = { 
    createSceneSchema,
    manageCharacterInSceneSchema
}