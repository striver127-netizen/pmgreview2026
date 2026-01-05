import { NextRequest, NextResponse } from "next/server"
import { decryptCommon } from "@/lib/crypto"

export async function POST(request: NextRequest) {
    try {
        // Read form-data (e.g. <form action="..." method="POST">)
        const formData = await request.formData()

        // Assume the PHP server sends the encrypted string in a field named named 'data' or 'payload'
        // You can change 'payload' to whatever field name you use in the standard form post
        const encryptedPayload = formData.get("payload") as string

        if (!encryptedPayload) {
            return NextResponse.json({ error: "No payload provided" }, { status: 400 })
        }

        const decryptedJson = decryptCommon(encryptedPayload)

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
            console.log(userInfo)
        } catch (e) {
            return NextResponse.json({ error: "Invalid JSON format in payload" }, { status: 400 })
        }

        // Successful Decryption
        // 1. Create a response that will redirect the user to the homepage
        const response = NextResponse.redirect(new URL("/", request.url), {
            status: 303, // See Other (commonly used for redirect after POST)
        })

        // 2. Set a cookie with the user info
        // allow the client to read it (httpOnly: false) so we can display the name
        // encoded in base64 or URI component to avoid cookie format issues
        const isProduction = process.env.NODE_ENV === "production"

        response.cookies.set("user_info", JSON.stringify(userInfo), {
            httpOnly: false,
            path: "/",
            maxAge: 60 * 30, // 30 minutes (Inactivity Timeout)
            sameSite: "lax",
            secure: isProduction, // HTTPS only in production
        })

        return response
    } catch (e) {
        console.error("SSO Error:", e)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
