import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { user_id, target_id, answers } = body

        if (!user_id || !target_id || !answers) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const evaluation = await prisma.evaluation.create({
            data: {
                user_id,
                target_id,
                answers,
            },
        })

        return NextResponse.json({ success: true, id: evaluation.id }, { status: 201 })
    } catch (error: any) {
        console.error("Evaluation submission error:", error)
        // Temporary: Return explicit error to client for debugging
        return NextResponse.json({
            error: "Internal Server Error",
            details: error.message || String(error),
            stack: error.stack
        }, { status: 500 })
    }
}
