import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { userProxy } from "./proxy.service";

const router: Router = Router();

router.use("/users", authenticate, userProxy);

export default router;
