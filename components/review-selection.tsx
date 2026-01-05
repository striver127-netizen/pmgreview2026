"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export interface Target {
    target_id: string
    target_nm: string
    target_type: "OT" | "ST" | "GM" | "TL"
    target_grant?: string
    target_team_id?: string
    total: string
}

interface ReviewSelectionProps {
    isLoading: boolean
    teamMembers: Target[]
    otherTeam: Target[]
    selectedPerson: string
    onSelectPerson: (id: string) => void
    onBack: () => void
    onContinue: () => void
}

export function ReviewSelection({
    isLoading,
    teamMembers,
    otherTeam,
    selectedPerson,
    onSelectPerson,
    onBack,
    onContinue,
}: ReviewSelectionProps) {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-4xl space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-semibold text-balance md:text-4xl">
                        Select Person to Review
                    </h1>
                    <p className="text-muted-foreground text-pretty">
                        평가 대상자를 선택해 주세요.
                    </p>
                </div>

                {isLoading ? (
                    <div className="text-center py-12">Loading...</div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Team Section */}
                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-4 text-accent">Team Members</h2>
                            <div className="space-y-3">
                                {teamMembers.length > 0 ? (
                                    teamMembers.map((person) => (
                                        <Button
                                            key={person.target_id}
                                            variant={
                                                selectedPerson === person.target_id
                                                    ? "default"
                                                    : "outline"
                                            }
                                            className="w-full h-auto p-4 flex flex-col items-start gap-1 text-left"
                                            onClick={() => onSelectPerson(person.target_id)}
                                        >
                                            <span className="text-lg font-semibold">
                                                {person.target_nm}
                                            </span>
                                            <span className="text-sm opacity-80 font-normal">
                                                {person.target_id}({person.target_grant}) ({person.target_team_id})
                                            </span>
                                        </Button>
                                    ))
                                ) : (
                                    <p className="text-muted-foreground text-sm">
                                        No team members to review.
                                    </p>
                                )}
                            </div>
                        </Card>
                        {/* Other Team Section */}
                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-4 text-primary">Other Team</h2>
                            <div className="space-y-3">
                                {otherTeam.length > 0 ? (
                                    otherTeam.map((person) => (
                                        <Button
                                            key={person.target_id}
                                            variant={
                                                selectedPerson === person.target_id
                                                    ? "default"
                                                    : "outline"
                                            }
                                            className="w-full h-auto p-4 flex flex-col items-start gap-1 text-left"
                                            onClick={() => onSelectPerson(person.target_id)}
                                        >
                                            <span className="text-lg font-semibold">
                                                {person.target_nm}
                                            </span>
                                            <span className="text-sm opacity-80 font-normal">
                                                {person.target_id}
                                            </span>
                                        </Button>
                                    ))
                                ) : (
                                    <p className="text-muted-foreground text-sm">
                                        No management members to review.
                                    </p>
                                )}
                            </div>
                        </Card>
                    </div>
                )}

                <div className="flex justify-between items-center pt-4">
                    <Button variant="outline" onClick={onBack}>
                        Back
                    </Button>
                    <Button size="lg" disabled={!selectedPerson} onClick={onContinue}>
                        Continue to Review
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
