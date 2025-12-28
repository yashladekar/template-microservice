import { Request, Response, NextFunction } from "express";

import type auth from "../types/express";

declare global {
    namespace Express {
        interface Request {
            auth?: typeof auth;
        }
    }
}

export function authContext(req: Request, _res: Response, next: NextFunction) {
    const userId = req.headers["x-user-id"];
    const role = req.headers["x-user-role"];
    if (req.headers["x-internal-token"] !== process.env.INTERNAL_TOKEN) {
        return _res.status(403).json({ message: "Forbidden" });
    }

    if (!userId || !role) {
        return next(new Error("Missing auth context"));
    }

    req.auth = {
        userId: String(userId),
        role: String(role),
    };

    next();
}
