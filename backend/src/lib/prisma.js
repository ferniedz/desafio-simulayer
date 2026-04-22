const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();      //conexão com bd

module.exports = prisma;