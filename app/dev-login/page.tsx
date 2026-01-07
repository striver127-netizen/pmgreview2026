"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DevLoginPage() {
    const router = useRouter()
    const [userId, setUserId] = useState("admin")
    const [userNm, setUserNm] = useState("Debug User")

    const handleLogin = () => {
        const userInfo = JSON.stringify({
            user_id: userId,
            user_nm: userNm
        })

        // Encode exactly as the AuthGuard expects (Next.js/Browsers often URL encode)
        // We use encodeURIComponent to ensure special chars are safe
        const encoded = encodeURIComponent(userInfo)

        const isSecure = window.location.protocol === 'https:'
        const secureFlag = isSecure ? '; Secure' : ''

        // Set cookie for 1 day
        const cookieString = `user_info=${encoded}; path=/; max-age=86400; SameSite=Lax${secureFlag}`
        document.cookie = cookieString

        console.log("Attempted to set cookie:", cookieString)
        console.log("Current document.cookie:", document.cookie)

        // Verify validity
        if (!document.cookie.includes("user_info=")) {
            alert("Cookie setting failed! Check console for details. Browser might be blocking cookies.")
            return
        }

        router.push("/")
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50 dark:bg-zinc-950">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Dev Login</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="userId">User ID</Label>
                        <Input
                            id="userId"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="userNm">User Name</Label>
                        <Input
                            id="userNm"
                            value={userNm}
                            onChange={(e) => setUserNm(e.target.value)}
                        />
                    </div>
                    <Button className="w-full" onClick={handleLogin}>
                        Set Cookie & Go Home
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
