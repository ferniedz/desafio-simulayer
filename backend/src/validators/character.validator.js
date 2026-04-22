const { z } = require("zod")

const createCharacterSchema = z.object({
    name: z.string().min(1, "The 'name' field is required."),
    personalityPrompt: z.string().min(1, "The 'personalityPrompt' field is required")
})

const updateCharacterByIdSchema = z.object({
    name: z.string().min(1).optional(),
    personalityPrompt: z.string().min(1).optional()
})

module.exports = {
    createCharacterSchema,
    updateCharacterByIdSchema
}