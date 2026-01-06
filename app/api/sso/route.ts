import { NextRequest, NextResponse } from "next/server"
import { decryptCommon } from "@/lib/crypto"

export async function GET(request: NextRequest) {
    const payload = request.nextUrl.searchParams.get("payload")
    return processSSORequest(request, payload)
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const payload = formData.get("payload") as string
        return processSSORequest(request, payload)
    } catch (e) {
        console.error("SSO POST Error:", e)
        return NextResponse.json({ error: "Invalid Form Data" }, { status: 400 })
    }
}

async function processSSORequest(request: NextRequest, encryptedPayload: string | null) {
    try {
        if (!encryptedPayload) {
            return NextResponse.json({ error: "No payload provided" }, { status: 400 })
        }

        // Fix: URL decoding might interpret '+' as ' ' (space).
        // Since standard Base64 doesn't use spaces, we can safely replace them back to '+'.
        const sanitizedPayload = encryptedPayload.replace(/ /g, "+")
        const decryptedJson = decryptCommon(sanitizedPayload)

        if (!decryptedJson) {
            return NextResponse.json(
                { error: "Decryption failed or invalid data" },
                { status: 400 }
            )
        }

        // Parse the JSON (expected: { user_id: "...", user_nm: "..." })
        let userInfo
        try {
            userInfo = JSON.parse(decryptedJson)
            //console.log(userInfo)
        } catch (e) {
            return NextResponse.json({ error: "Invalid JSON format in payload" }, { status: 400 })
        }

        // Successful Decryption
        // 1. Create a response that will redirect the user to the homepage
        // Fix for Azure SWA redirect issue: Use request.nextUrl to ensure we stay on the correct domain
        // instead of relying on the host header which might leak internal infrastructure hostnames.
        const url = request.nextUrl.clone()
        url.pathname = "/"
        url.search = "" // Clear any query parameters (like payload)

        const response = NextResponse.redirect(url, {
            status: 303, // See Other (commonly used for redirect after POST)
        })

        // 2. Set a cookie with the user info
        // allow the client to read it (httpOnly: false) so we can display the name
        // encoded in base64 or URI component to avoid cookie format issues
        // Detect if we are running locally (even in production mode like 'npm start')
        const isLocal =
            request.url.includes("localhost") ||
            request.url.includes("127.0.0.1") ||
            request.url.includes("0.0.0.0")
        const isSecure = process.env.NODE_ENV === "production" && !isLocal

        response.cookies.set("user_info", JSON.stringify(userInfo), {
            httpOnly: false,
            path: "/",
            maxAge: 60 * 30, // 30 minutes (Inactivity Timeout)
            sameSite: "lax",
            secure: isSecure, // HTTPS only in production (excluding localhost)
        })

        return response
    } catch (e) {
        console.error("SSO Processing Error:", e)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
