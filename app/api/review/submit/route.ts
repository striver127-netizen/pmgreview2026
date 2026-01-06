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
    } catch (error) {
        console.error("Evaluation submission error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
