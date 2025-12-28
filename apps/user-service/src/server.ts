import app from "./app";
import { env } from "./config/env";
import logger from "./utils/logger";
import { prisma } from "./db/prisma";
const server = app.listen(env.PORT, async () => {
    await prisma.$disconnect();
    logger.info(`User Service running on port ${env.PORT}`);
});

process.on("SIGTERM", () => server.close());
process.on("SIGINT", () => server.close());