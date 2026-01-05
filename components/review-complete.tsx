"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

interface ReviewCompleteProps {
    onStartNew: () => void
    onViewSummary: () => void
}

export function ReviewComplete({ onStartNew, onViewSummary }: ReviewCompleteProps) {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-2xl p-8 md:p-12">
                <div className="flex flex-col items-center gap-6 text-center">
                    <div className="rounded-full bg-accent/10 p-4">
                        <CheckCircle2 className="h-16 w-16 text-accent" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-semibold text-balance">Review Complete!</h1>
                        <p className="text-muted-foreground text-pretty max-w-md">
                            성과 평가가 완료되었습니다. 작성하신 내용은 대상자에 대한 공정한 평가를 위해 신중하게 검토될 예정입니다.
                            참여해 주셔서 감사합니다.
                        </p>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <Button onClick={onStartNew} variant="outline">
                            Start Another Review
                        </Button>

                    </div>
                </div>
            </Card>
        </div>
    )
}
