import app from "./app";
import { env } from "./config/env";
import logger from "./utils/logger";
import { prisma } from "./db/prisma";
const server = app.listen(env.PORT, () => {
    logger.info(`User Service running on port ${env.PORT}`);
});

const shutdown = async () => {
    logger.warn("Shutting down User Service...");
    await prisma.$disconnect();
    server.close(() => process.exit(0));
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
