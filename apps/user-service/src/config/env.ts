import { z } from "zod";
const envSchema = z.object({
    PORT: z.coerce.number().default(3001),
    DATABASE_URL: z.string().url(),
    INTERNAL_TOKEN: z.string().min(1),
});

export const env = envSchema.parse(process.env);
