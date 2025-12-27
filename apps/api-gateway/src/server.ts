import dotenv from 'dotenv';
dotenv.config();

import app from "./app";
import { env } from "./config/env";
import logger from "./utils/logger";

const server = app.listen(env.PORT, () => {
    logger.info(`API Gateway running on port ${env.PORT}`);
});

const shutdown = () => {
    logger.warn("Shutting down API Gateway...");
    server.close(() => {
        logger.info("Server closed");
        process.exit(0);
    });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);