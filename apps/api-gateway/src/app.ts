import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import pinoHttp from "pino-http";

import logger from "./utils/logger";
import { requestId } from "./middlewares/request-id.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import { rateLimiter } from "./middlewares/rate-limit.middleware";

import healthRoutes from "./modules/health/health.route";
import proxyRoutes from "./modules/proxy/proxy.route";

const app: Express = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestId);
app.use(pinoHttp({ logger }));
app.use(rateLimiter);

app.use("/health", healthRoutes); // BEFORE auth
app.use("/api", proxyRoutes);


app.use(errorHandler);

export default app;
