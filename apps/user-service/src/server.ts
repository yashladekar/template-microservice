import app from "./app";
import { env } from "./config/env";
import logger from "./utils/logger";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg"
const connectionString = process.env.DATABASE_URL
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
const server = app.listen(env.PORT, async () => {
    await prisma.$disconnect();
    logger.info(`User Service running on port ${env.PORT}`);
});

process.on("SIGTERM", () => server.close());
process.on("SIGINT", () => server.close());