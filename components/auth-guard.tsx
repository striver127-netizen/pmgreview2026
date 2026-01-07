"use client"

import { createContext, useContext, useEffect, useState } from "react"

export interface UserInfo {
    user_id: string
    user_nm: string
}

const AuthContext = createContext<UserInfo | null>(null)

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserInfo | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [debugError, setDebugError] = useState<string | null>(null)

    useEffect(() => {
        // Function to parse cookie safely
        const getCookie = (name: string) => {
            const value = `; ${document.cookie}`
            const parts = value.split(`; ${name}=`)
            if (parts.length === 2) return parts.pop()?.split(";").shift()
            return null
        }

        const userInfoStr = getCookie("user_info")
        if (userInfoStr) {
            try {
                // Try decoding first (Next.js/Browsers often URL encode cookie values)
                let decoded = decodeURIComponent(userInfoStr)

                // Double-decode check: If it still looks encoded (starts with %7B), decode again
                // This handles cases where Next.js or Browser double-encoded the value
                if (decoded.startsWith("%7B")) {
                    decoded = decodeURIComponent(decoded)
                }

                const parsed = JSON.parse(decoded)
                setUser(parsed)

                // Sliding Expiration: Refresh key for 30 mins
                const isProduction = process.env.NODE_ENV === "production"
                const secureFlag = isProduction ? "; Secure" : ""
                document.cookie = `user_info=${userInfoStr}; path=/; max-age=${60 * 30}; SameSite=Lax${secureFlag}`
            } catch (e) {
                console.error("Failed to parse user_info cookie", e)
                // Fallback: try parsing raw string in case it wasn't encoded
                try {
                    const parsed = JSON.parse(userInfoStr)
                    setUser(parsed)
                } catch (e2: any) {
                    console.error("Failed to parse raw user_info cookie", e2)
                    // DEBUG: Show error on screen instead of redirecting
                    const errorMsg1 = e instanceof Error ? e.message : String(e)
                    const errorMsg2 = e2 instanceof Error ? e2.message : String(e2)
                    setDebugError(`Cookie Parse Error: ${errorMsg1} | Fallback Error: ${errorMsg2} | Raw: ${userInfoStr}`)
                }
            }
        } else {
            // No user cookie found -> Redirect to /unauthorized
            // window.location.href = "/unauthorized"
            setDebugError("No 'user_info' cookie found.")
        }

        setIsLoading(false)
    }, [])

    if (debugError) {
        return (
            <div className="p-4 bg-red-100 text-red-700">
                <h3 className="font-bold">Authentication Debug Error</h3>
                <p className="break-all">{debugError}</p>
                <button
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
                    onClick={() => window.location.href = "/unauthorized"}
                >
                    Go to Unauthorized
                </button>
            </div>
        )
    }

    // While loading, we render nothing (or a spinner could be added here)
    if (isLoading) {
        return null
    }

    // Middleware protects the route, so if we reach here without a user,
    // it implies the cookie was deleted client-side or something odd.
    // For consistency, we don't render children if user is missing.
    // However, during dev/testing (if middleware is disabled), this might block.
    // We assume middleware is active.
    if (!user) {
        return null
    }

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === null) {
        throw new Error("useAuth must be used within an AuthGuard")
    }
    return context
}
