import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { user_id, target_id, answers } = body

        if (!user_id || !target_id || !answers) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const categories = answers.map((a: any) => a.category)
        const questionIds = answers.map((a: any) => a.question_id)
        const answerValues = answers.map((a: any) => a.answer_value)
        const questionTexts = answers.map((a: any) => a.question_text)
        const questionTypes = answers.map((a: any) => a.question_type)

        // Calculate total points - sum of numeric answer values
        const totalPoint = answers.reduce((sum: number, a: any) => {
            const val = Number(a.answer_value)
            return sum + (isNaN(val) ? 0 : val)
        }, 0)

        const evaluation = await prisma.evaluation.create({
            data: {
                user_id,
                target_id,
                category: categories,
                question_id: questionIds,
                answer_value: answerValues,
                question_text: questionTexts,
                question_type: questionTypes,
                total_point: totalPoint,
            },
        })

        // Call external Point API
        try {
            const pointApiUrl = `https://kobe.pmgasia.co.kr/api/review/point?user_id=${encodeURIComponent(user_id)}&target_id=${encodeURIComponent(target_id)}&point=${totalPoint}`

            const pointResponse = await fetch(pointApiUrl)
            const pointResult = await pointResponse.json()

            if (pointResult.result !== 'success') {
                throw new Error("Point sync failed: Result is not success")
            }
        } catch (error) {
            console.error("Point API Error, rolling back evaluation:", error)
            // Rollback: delete the created evaluation
            await prisma.evaluation.delete({
                where: { id: evaluation.id }
            })
            throw error // Re-throw to be caught by the outer catch block
        }

        return NextResponse.json({ success: true, id: evaluation.id }, { status: 201 })
    } catch (error: any) {
        console.error("Evaluation submission error:", error)
        // Return JSON error even for catch block
        return NextResponse.json({
            error: "Internal Server Error",
            details: error.message || String(error),
            stack: error.stack,
            name: error.name
        }, { status: 500 })
    }
}
