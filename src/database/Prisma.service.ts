import { PrismaClient } from '@prisma/client';

export class PrismaService {
    public prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }
}




