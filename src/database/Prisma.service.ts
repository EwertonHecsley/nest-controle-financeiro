import { PrismaClient } from '@prisma/client';

export class PrismaService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }
}




