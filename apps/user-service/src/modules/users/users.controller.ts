import { Request, Response, RequestHandler } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { userService } from "./user.service";

export const createUser: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.create(req.body);
    res.status(201).json(user);
});

export const getUsers: RequestHandler = asyncHandler(async (_req: Request, res: Response) => {
    res.json(await userService.findAll());
});

export const getUser: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.findById(req.params.id!);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
});

export const updateUser: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const { userId, role } = req.auth!;

    if (role !== "ADMIN" && userId !== req.params.id) {
        return res.status(403).json({ message: "Forbidden" });
    }

    res.json(await userService.update(req.params.id!, req.body));
});

export const deleteUser: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    await userService.delete(req.params.id!);
    res.status(204).send();
});