"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users } from "lucide-react"

interface ReviewIntroProps {
    onStart: () => void
    questionCount: number
}

export function ReviewIntro({ onStart, questionCount }: ReviewIntroProps) {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-2xl p-8 md:p-12">
                <div className="flex flex-col items-center gap-6 text-center">
                    <div className="rounded-full bg-primary/10 p-4">
                        <Users className="h-16 w-16 text-primary" />
                    </div>
                    <div className="space-y-3">
                        <h1 className="text-4xl font-semibold text-balance md:text-5xl">
                            Performance Review
                        </h1>
                        <p className="text-muted-foreground text-pretty text-sm max-w-lg leading-relaxed">
                            본 평가는 구성원의 업무 수행 방식과 협업 역량을 보다 공정하고 입체적으로
                            평가하기 위한 다면평가 제도의 일환입니다. 평가는 실명 기반으로 진행되며,
                            평가자는 본인의 판단과 책임 하에 평가를 진행하게 됩니다. 개인적인
                            호불호가 아닌, 실제 업무 경험과 객관적인 사례를 기준으로 성실하게 응답해
                            주시기 바랍니다.
                        </p>
                    </div>
                    <div className="space-y-4 pt-4 w-full max-w-md">
                        <div className="rounded-lg border bg-muted/30 p-4 text-left">
                            <h3 className="font-medium mb-2">What to expect:</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Select the person you want to review</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Answer {questionCount} thoughtful questions</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>
                                        Provide an objective evaluation based on your experience.
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Approximately 10-15 minutes to complete</span>
                                </li>
                            </ul>
                        </div>
                        <Button size="lg" className="w-full" onClick={onStart}>
                            Get Started
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}
