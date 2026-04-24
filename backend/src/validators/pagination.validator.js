const { z } = require("zod");

const getScenesSchema = z.object({
    page: z.coerce.number().positive().default(1),
    limit: z.coerce.number().positive().default(9)
});

module.exports = { getScenesSchema }