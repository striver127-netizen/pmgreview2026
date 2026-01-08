import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        console.log("Testing DB Connection...")

        // 1. Check Environment Variable
        const dbUrl = process.env.DATABASE_URL
        if (!dbUrl) {
            throw new Error("DATABASE_URL environment variable is NOT set.")
        }

        console.log("DATABASE_URL found:", dbUrl.substring(0, 10) + "...")

        // 2. Initialize Prisma Client dynamically to catch init errors
        const prisma = new PrismaClient()

        try {
            const count = await prisma.evaluation.count()
            await prisma.$disconnect()

            return NextResponse.json({
                status: "success",
                message: "Connected to Database",
                recordCount: count,
                dbUrlPrefix: dbUrl.substring(0, 8) + "..."
            })
        } catch (dbError: any) {
            await prisma.$disconnect()
            throw dbError
        }

    } catch (error: any) {
        console.error("DB Connection Failed:", error)
        return NextResponse.json({
            status: "error",
            message: "Failed to connect to Database",
            errorName: error.name,
            errorMessage: error.message,
            stack: error.stack,
            envVarExists: !!process.env.DATABASE_URL
        }, { status: 500 })
    }
}
