import app from "./app";
import { env } from "./config/env";
import logger from "./utils/logger";

const server = app.listen(env.PORT, () => {
    logger.info(`User Service running on port ${env.PORT}`);
});

process.on("SIGTERM", () => server.close());
process.on("SIGINT", () => server.close());
