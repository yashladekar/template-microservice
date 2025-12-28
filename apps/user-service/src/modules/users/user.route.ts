import { Router } from "express";
import {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
} from "./users.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createUserSchema, updateUserSchema } from "./user.schema";

const router: Router = Router();


router.post("/", validate(createUserSchema), createUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", validate(updateUserSchema), updateUser);
router.delete("/:id", deleteUser);

export default router;



