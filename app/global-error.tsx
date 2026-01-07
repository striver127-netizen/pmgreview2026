"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error("Global Application Error:", error)
    }, [error])

    return (
        <html>
            <body className="flex h-screen w-full flex-col items-center justify-center gap-4 p-4 text-center">
                <h2 className="text-2xl font-bold text-destructive">Application Error</h2>
                <div className="max-w-md rounded bg-muted/50 p-4 text-left font-mono text-sm">
                    <p className="font-semibold">{error.message}</p>
                    <p className="mt-2 text-xs text-muted-foreground break-all">{error.stack}</p>
                    {error.digest && <p className="mt-2 text-xs text-muted-foreground">Digest: {error.digest}</p>}
                </div>
                <Button onClick={() => reset()}>Try again</Button>
            </body>
        </html>
    )
}
