import { Router } from "express";
import { healthCheck } from "./health.controller";

const router: ReturnType<typeof Router> = Router();
router.get("/", healthCheck);
export default router;
