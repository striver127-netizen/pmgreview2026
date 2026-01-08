import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { Evaluation } from "@prisma/client"

export const dynamic = 'force-dynamic'

// Update type to handle potential Promise (Next.js 15) or Object
export async function GET(request: Request, context: { params: any }) {
    try {
        const params = await context.params
        const { userId } = params
        console.log("API userId received:", userId)
        // Fetch all evaluations for this target user
        const evaluations = await prisma.evaluation.findMany({
            where: {
                target_id: userId
            },
            orderBy: {
                created_at: 'desc'
            }
        })

        // Calculate basic stats
        const totalScore = evaluations.reduce((sum: number, ev: Evaluation) => sum + (ev.total_point || 0), 0)
        const averageScore = evaluations.length > 0 ? (totalScore / evaluations.length).toFixed(1) : 0

        return NextResponse.json({
            success: true,
            data: evaluations,
            stats: {
                count: evaluations.length,
                totalScore,
                averageScore
            }
        })

    } catch (error: any) {
        console.error("Review Detail API Error:", error)
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}
