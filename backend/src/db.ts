import { PrismaClient } from "@prisma/client";

class PrismaDB {
    private static client: PrismaClient;
    private constructor() {}
    public static getInstance(): PrismaClient {
        if (!PrismaDB.client) {
            PrismaDB.client = new PrismaClient();
        }
        return PrismaDB.client;
    }
}

export const prisma = PrismaDB.getInstance();
