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

        // DEBUG: Check files in prisma directory
        let prismaFiles: string[] = []
        try {
            const fs = require('fs')
            const path = require('path')
            // Try standard path
            const possiblePaths = [
                '/usr/swa_app/node_modules/.prisma/client',
                './node_modules/.prisma/client',
                path.resolve('node_modules/.prisma/client')
            ]

            for (const p of possiblePaths) {
                if (fs.existsSync(p)) {
                    prismaFiles.push(`Found at ${p}: ` + fs.readdirSync(p).join(', '))
                } else {
                    prismaFiles.push(`Not found at ${p}`)
                }
            }
        } catch (e: any) {
            prismaFiles.push("FS Access Error: " + e.message)
        }

        // 2. Initialize Prisma Client dynamically to catch init errors
        const prisma = new PrismaClient()

        try {
            const count = await prisma.evaluation.count()
            await prisma.$disconnect()

            return NextResponse.json({
                status: "success",
                message: "Connected to Database",
                recordCount: count,
                dbUrlPrefix: dbUrl.substring(0, 8) + "...",
                prismaFiles // Include debug info
            })
        } catch (dbError: any) {
            await prisma.$disconnect()

            return NextResponse.json({
                status: "error",
                message: "Failed to connect to Database",
                errorName: dbError.name,
                errorMessage: dbError.message,
                stack: dbError.stack,
                envVarExists: !!process.env.DATABASE_URL,
                prismaFiles // Include debug info
            }, { status: 500 })
        }

    } catch (error: any) {
        console.error("DB Connection Failed:", error)
        return NextResponse.json({
            status: "error",
            message: "Failed to connect to Database",
            errorName: error.name,
            errorMessage: error.message,
            stack: error.stack,
            envVarExists: !!process.env.DATABASE_URL,
            // @ts-ignore
            prismaFiles: typeof prismaFiles !== 'undefined' ? prismaFiles : ["Unknown"]
        }, { status: 500 })
    }
}
