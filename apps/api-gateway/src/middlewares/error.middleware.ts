import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export class AppError extends Error {
    constructor(
        public message: string,
        public statusCode = 500
    ) {
        super(message);
    }
}

export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    logger.error(err);

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    res.status(500).json({
        message: "Internal Server Error",
        requestId: _req.headers["x-request-id"],
    });

}
