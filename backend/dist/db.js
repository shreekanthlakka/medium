"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
class PrismaDB {
    constructor() { }
    static getInstance() {
        if (!PrismaDB.client) {
            PrismaDB.client = new client_1.PrismaClient();
        }
        return PrismaDB.client;
    }
}
exports.prisma = PrismaDB.getInstance();
