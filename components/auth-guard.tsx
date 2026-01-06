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
                const decoded = decodeURIComponent(userInfoStr)
                const parsed = JSON.parse(decoded)
                setUser(parsed)

                // Sliding Expiration: Refresh key for 30 mins
                // We re-set the same cookie with a new Max-Age
                const isProduction = process.env.NODE_ENV === "production"
                const secureFlag = isProduction ? "; Secure" : ""
                document.cookie = `user_info=${userInfoStr}; path=/; max-age=${60 * 30}; SameSite=Lax${secureFlag}`
            } catch (e) {
                console.error("Failed to parse user_info cookie", e)
                // Fallback: try parsing raw string in case it wasn't encoded
                try {
                    const parsed = JSON.parse(userInfoStr)
                    setUser(parsed)
                } catch (e2) {
                    console.error("Failed to parse raw user_info cookie", e2)
                }
            }
        } else {
            // No user cookie found -> Redirect to /unauthorized
            // Using window.location.href to ensure a full redirect
            window.location.href = "/unauthorized"
        }

        setIsLoading(false)
    }, [])

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
