import { PrismaClient } from "@prisma/client"
import { validateEnv } from "../../types/validateEnv"

declare global {
  var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()
if (validateEnv.NODE_ENV !== "production") globalThis.prisma = client

export default client