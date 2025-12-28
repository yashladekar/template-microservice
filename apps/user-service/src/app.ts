import express from "express";
import userRoutes from "./modules/users/user.route";
import { authContext } from "./middlewares/auth-context.middleware";
import { errorHandler } from "./middlewares/error.middleware";

const app: express.Application = express();

app.use(express.json());

// 🔒 trust gateway only
app.use(authContext);

app.use("/users", userRoutes);
app.use(errorHandler);

export default app;
