import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "./error.middleware";
import { env } from "../config/env";

interface JwtPayload {
    sub: string;
    email: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            auth?: {
                userId: string;
                email: string;
                role: string;
            };
        }
    }
}

export function authenticate(req: Request, _res: Response, next: NextFunction) {
    const auth = req.headers.authorization;

    if (!auth?.startsWith("Bearer ")) {
        return next(new AppError("Unauthorized", 401));
    }
    const token = auth.replace("Bearer ", "");

    try {


        const payload = jwt.verify(token, env.JWT_PUBLIC_KEY) as JwtPayload;

        // 🔐 Attach trusted context to request
        req.auth = {
            userId: payload.sub,
            email: payload.email,
            role: payload.role,
        };

        next();
    } catch {
        return next(new AppError("Invalid token", 401));
    }
}

