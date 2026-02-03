let PrismaClient: any;
try {
    PrismaClient = require('../generated/prisma').PrismaClient;
} catch (error) {
    console.error('❌ Prisma Client not found! Please run: npx prisma generate');
    throw new Error('Prisma Client is not generated. Run "npx prisma generate" first.');
}

const globalForPrisma = global as unknown as { prisma: any };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
