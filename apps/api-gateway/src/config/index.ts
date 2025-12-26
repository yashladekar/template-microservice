import { z } from "zod"

import dotenv from 'dotenv';
dotenv.config();

const envSchema = z.object({
    PORT: z.string().regex(/^\d+$/).transform(Number).default(8000),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    USER_SERVICE_URL: z.string().url().default('http://localhost:3001'),
    PRODUCT_SERVICE_URL: z.string().url().default('http://localhost:3002'),
})


export const config = {
    port: process.env.PORT || 8000,
    services: {
        userService: process.env.USER_SERVICE_URL || 'http://localhost:3001',
        productService: process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002',
    },
    rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per window
    },
};

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error('❌ Invalid environment variables:', parsedEnv.error.format());
    process.exit(1);
}

export const env = parsedEnv.data;