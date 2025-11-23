import { PrismaClient } from "@/lib/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

const globalForPrisma = global as unknown as { prisma: typeof prisma }

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma
