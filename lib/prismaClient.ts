import { PrismaClient as GeneratedPrismaClient } from "./generated/prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: GeneratedPrismaClient | undefined
}

// TypeScript might complain about '0 arguments', so we cast
export const prisma =
  globalForPrisma.prisma ?? new GeneratedPrismaClient({} as any)

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}