import { prisma } from "../../db/prisma";

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
