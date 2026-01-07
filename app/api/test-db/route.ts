import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        console.log("Testing DB Connection...")
        const startTime = Date.now()

        // Try a simple query
        const count = await prisma.evaluation.count()

        const duration = Date.now() - startTime

        return NextResponse.json({
            status: "success",
            message: "Connected to Database",
            recordCount: count,
            durationMs: duration
        })
    } catch (error: any) {
        console.error("DB Connection Failed:", error)
        return NextResponse.json({
            status: "error",
            message: "Failed to connect to Database",
            errorName: error.name,
            errorMessage: error.message,
            stack: error.stack,
            dbUrlExists: !!process.env.DATABASE_URL
        }, { status: 500 })
    }
}
