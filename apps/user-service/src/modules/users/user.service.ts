import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg"
const connectionString = process.env.DATABASE_URL
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
export const userService = {
    create: (data: { email: string; name?: string }) =>
        prisma.user.create({ data }),

    findAll: () => prisma.user.findMany(),

    findById: (id: string) =>
        prisma.user.findUnique({ where: { id } }),

    update: (id: string, data: any) =>
        prisma.user.update({ where: { id }, data }),

    delete: (id: string) =>
        prisma.user.delete({ where: { id } }),
};
