import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        console.log("Testing External API Connection...")
        const startTime = Date.now()

        // This is a test call with dummy data just to check connectivity
        // We expect it might return an error or valid JSON, but as long as it connects, it's good.
        const testUrl = `https://kobe.pmgasia.co.kr/api/review/point?user_id=test&target_id=test&point=0`

        const response = await fetch(testUrl, {
            signal: AbortSignal.timeout(5000) // 5s timeout
        })

        const duration = Date.now() - startTime
        const text = await response.text()

        return NextResponse.json({
            status: "success",
            message: "Connected to External API",
            httpStatus: response.status,
            responsePreview: text.substring(0, 200), // Preview first 200 chars
            durationMs: duration
        })
    } catch (error: any) {
        console.error("External API Connection Failed:", error)
        return NextResponse.json({
            status: "error",
            message: "Failed to connect to External API",
            errorName: error.name,
            errorMessage: error.message,
            stack: error.stack
        }, { status: 500 })
    }
}
