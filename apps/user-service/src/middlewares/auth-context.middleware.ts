import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";

export function authContext(req: Request, _res: Response, next: NextFunction) {
    // Check health endpoint FIRST, before any auth checks
    if (req.path.startsWith("/health")) {
        return next();
    }

    const userId = req.headers["x-user-id"];
    const role = req.headers["x-user-role"];

    if (req.headers["x-internal-token"] !== env.INTERNAL_TOKEN) {
        return _res.status(403).json({ message: "Forbidden" });
    }

    if (!userId || !role) {
        return _res.status(401).json({ message: "Unauthorized" });
    }

    req.auth = {
        userId: String(userId),
        role: String(role),
    };

    next();
}