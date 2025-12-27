import express, { Application } from "express";
import { errorHandler } from "./middlewares/error.middleware";
import userRoutes from "./modules/users/user.route";

const app: Application = express();

app.use(express.json());

app.use("/users", userRoutes);

app.use(errorHandler);

export default app;
