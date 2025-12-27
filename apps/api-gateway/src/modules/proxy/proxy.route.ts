import { Router } from "express";
import { userProxy, productProxy } from "./proxy.service";

const router: Router = Router();

router.use("/users", userProxy);
router.use("/products", productProxy);

export default router;
