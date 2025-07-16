import { PrismaClient } from '../app/generated/prisma';
// This file is used to create a single instance of Prisma Client
// to avoid issues with multiple connections in development mode.
declare global {
    var prisma: PrismaClient | undefined;
}

// Create a new Prisma Client instance
// This is necessary to avoid creating multiple instances in development mode
export const Db = globalThis.prisma || new PrismaClient();
// Ensure that the Prisma Client is only instantiated once in development
// to avoid exhausting database connections.
if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = Db;
}

//we can bring in this prisma variable in any file where we need to interact with the database.and we can use it to make quires be it data fetching adding or updating