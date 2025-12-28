import express from "express";
import userRoutes from "./modules/users/user.route";
import { authContext } from "./middlewares/auth-context.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import healthRoutes from "./modules/health/health.route";
import { rateLimiter } from "./middlewares/rate-limit.middleware";


const app: express.Application = express();

app.use(express.json());
app.use(rateLimiter);
app.use("/health", healthRoutes);
app.use(authContext);
app.use("/users", userRoutes);

app.use(errorHandler);

export default app;
