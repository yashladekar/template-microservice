import { z } from "zod";

export const envSchema = z.object({
    PORT: z.coerce.number().default(8000),
    NODE_ENV: z.enum(["development", "production", "test"]),
    USER_SERVICE_URL: z.url(),
    PRODUCT_SERVICE_URL: z.url(),
    JWT_PUBLIC_KEY: z.string().min(1),
    INTERNAL_TOKEN: z.string().min(1),
});

export const env = envSchema.parse(process.env);