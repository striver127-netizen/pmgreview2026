"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export interface Question {
    id: string
    type: "rating" | "rating5" | "rating10" | "rating15" | "rating20" | "multiple-choice" | "text"
    category: string
    question: string
    options?: string[]
}
//실제 파일은 ./questions-data.ts에 있음.
export const questions: Question[] = [
    {
        id: "1",
        type: "rating",
        category: "Work Quality",
        question: "How would you rate the overall quality of your work this period?",
    },
    {
        id: "2",
        type: "multiple-choice",
        category: "Work Quality",
        question: "Which best describes your attention to detail?",
        options: [
            "I consistently catch and correct errors before submission",
            "I usually catch most errors with minimal review",
            "I sometimes need additional review to catch all errors",
            "I need significant support to ensure quality",
        ],
    },
    {
        id: "3",
        type: "text",
        category: "Work Quality",
        question:
            "Describe a project where you delivered exceptional quality and what made it successful.",
    },
    {
        id: "4",
        type: "rating",
        category: "Collaboration",
        question: "How effectively do you collaborate with team members?",
    },
    {
        id: "5",
        type: "multiple-choice",
        category: "Collaboration",
        question: "When working on team projects, you typically:",
        options: [
            "Take initiative and help coordinate team efforts",
            "Contribute actively and support team goals",
            "Complete assigned tasks independently",
            "Prefer working alone when possible",
        ],
    },
    {
        id: "6",
        type: "rating",
        category: "Professional Growth",
        question: "How committed are you to continuous learning and skill development?",
    },
    {
        id: "7",
        type: "text",
        category: "Professional Growth",
        question:
            "What new skills or knowledge have you acquired this period, and how have you applied them?",
    },
    {
        id: "8",
        type: "rating",
        category: "Goal Achievement",
        question: "How well did you meet your goals and objectives this period?",
    },
    {
        id: "9",
        type: "text",
        category: "Future Goals",
        question: "What are your top 3 professional goals for the next review period?",
    },
]

interface ReviewQuestionProps {
    currentStep: number
    answers: Record<string, string>
    questions: Question[]
    description?: string
    onAnswer: (value: string) => void
    onNext: () => void
    onPrevious: () => void
    isSubmitting?: boolean // New prop
}

export function ReviewQuestion({
    currentStep,
    answers,
    questions,
    description,
    onAnswer,
    onNext,
    onPrevious,
    isSubmitting = false, // Default to false
}: ReviewQuestionProps) {
    const currentQuestion = questions[currentStep]
    const progress = ((currentStep + 1) / questions.length) * 100
    const isAnswered =
        answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== ""

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-3xl space-y-6">
                {/* Header */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-semibold text-balance md:text-4xl">
                            Performance Review
                        </h1>
                        <p className="text-muted-foreground text-pretty">
                            {description ||
                                "Take your time to reflect on your performance and provide thoughtful responses."}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                Question {currentStep + 1} of {questions.length}
                            </span>
                            <span className="font-medium">{Math.round(progress)}% Complete</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div>
                </div>

                {/* Question Card */}
                <Card className="p-6 md:p-8">
                    <div className="space-y-6" key={currentQuestion.id}>
                        <div className="space-y-2">
                            <div className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                                {currentQuestion.category}
                            </div>
                            <h2 className="text-xl font-medium text-balance leading-relaxed md:text-2xl">
                                {currentQuestion.question}
                            </h2>
                        </div>

                        {/* Rating Scale */}
                        {currentQuestion.type === "rating5" && (
                            <div className="space-y-4 pt-4">
                                <RadioGroup value={answers[currentQuestion.id]} onValueChange={onAnswer} className="space-y-3">
                                    {[
                                        { value: "5", label: "Outstanding", desc: "매우 뛰어남, 기대 수준을 크게 상회하며 지속적으로 탁월한 성과를 보여줍니다." },
                                        { value: "4", label: "Exceeds Expectations", desc: "뛰어남, 대부분의 업무에서 기대 이상의 성과를 안정적으로 달성합니다." },
                                        { value: "3", label: "Meets Expectations", desc: "양호함, 업무를 정상적으로 수행하며 기대 수준을 달성합니다." },
                                        { value: "2", label: "Below Expectations", desc: "노력이 필요함, 기본적인 역할은 수행하지만 개선이 필요한 부분이 보입니다." },
                                        { value: "1", label: "Unsatisfactory", desc: "부족함, 업무 수행에 어려움이 있으며 명확한 개선 노력이 요구됩니다." },
                                        { value: "0", label: "Needs Improvement", desc: "매우 부족함, 기대 수준에 크게 미치지 못하며 즉각적인 개선과 지원이 필요합니다." },
                                    ].map((option) => (
                                        <div key={option.value} className="flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                                            <RadioGroupItem value={option.value} id={option.value} className="mt-0.5" />
                                            <Label htmlFor={option.value} className="flex-1 cursor-pointer space-y-1">
                                                <div className="font-medium">{option.label}</div>
                                                <div className="text-sm text-muted-foreground"> {option.desc}</div>
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        )}

                        {currentQuestion.type === "rating10" && (
                            <div className="space-y-4 pt-4">
                                <RadioGroup value={answers[currentQuestion.id]} onValueChange={onAnswer} className="space-y-3">
                                    {[
                                        { value: "10", label: "Outstanding", desc: "매우 뛰어남, 기대 수준을 크게 상회하며 지속적으로 탁월한 성과를 보여줍니다." },
                                        { value: "8", label: "Exceeds Expectations", desc: "뛰어남, 대부분의 업무에서 기대 이상의 성과를 안정적으로 달성합니다." },
                                        { value: "6", label: "Meets Expectations", desc: "양호함, 업무를 정상적으로 수행하며 기대 수준을 달성합니다." },
                                        { value: "4", label: "Below Expectations", desc: "노력이 필요함, 기본적인 역할은 수행하지만 개선이 필요한 부분이 보입니다." },
                                        { value: "2", label: "Unsatisfactory", desc: "부족함, 업무 수행에 어려움이 있으며 명확한 개선 노력이 요구됩니다." },
                                        { value: "0", label: "Needs Improvement", desc: "매우 부족함, 기대 수준에 크게 미치지 못하며 즉각적인 개선과 지원이 필요합니다." },
                                    ].map((option) => (
                                        <div key={option.value} className="flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                                            <RadioGroupItem value={option.value} id={option.value} className="mt-0.5" />
                                            <Label htmlFor={option.value} className="flex-1 cursor-pointer space-y-1">
                                                <div className="font-medium">{option.label}</div>
                                                <div className="text-sm text-muted-foreground"> {option.desc}</div>
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        )}

                        {currentQuestion.type === "rating15" && (
                            <div className="space-y-4 pt-4">
                                <RadioGroup value={answers[currentQuestion.id]} onValueChange={onAnswer} className="space-y-3">
                                    {[
                                        { value: "15", label: "Outstanding", desc: "매우 뛰어남, 기대 수준을 크게 상회하며 지속적으로 탁월한 성과를 보여줍니다." },
                                        { value: "12", label: "Exceeds Expectations", desc: "뛰어남, 대부분의 업무에서 기대 이상의 성과를 안정적으로 달성합니다." },
                                        { value: "10", label: "Meets Expectations", desc: "양호함, 업무를 정상적으로 수행하며 기대 수준을 달성합니다." },
                                        { value: "7", label: "Below Expectations", desc: "노력이 필요함, 기본적인 역할은 수행하지만 개선이 필요한 부분이 보입니다." },
                                        { value: "4", label: "Unsatisfactory", desc: "부족함, 업무 수행에 어려움이 있으며 명확한 개선 노력이 요구됩니다." },
                                        { value: "0", label: "Needs Improvement", desc: "매우 부족함, 기대 수준에 크게 미치지 못하며 즉각적인 개선과 지원이 필요합니다." },
                                    ].map((option) => (
                                        <div key={option.value} className="flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                                            <RadioGroupItem value={option.value} id={option.value} className="mt-0.5" />
                                            <Label htmlFor={option.value} className="flex-1 cursor-pointer space-y-1">
                                                <div className="font-medium">{option.label}</div>
                                                <div className="text-sm text-muted-foreground"> {option.desc}</div>
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        )}

                        {currentQuestion.type === "rating20" && (
                            <div className="space-y-4 pt-4">
                                <RadioGroup value={answers[currentQuestion.id]} onValueChange={onAnswer} className="space-y-3">
                                    {[
                                        { value: "20", label: "Outstanding", desc: "매우 뛰어남, 기대 수준을 크게 상회하며 지속적으로 탁월한 성과를 보여줍니다." },
                                        { value: "16", label: "Exceeds Expectations", desc: "뛰어남, 대부분의 업무에서 기대 이상의 성과를 안정적으로 달성합니다." },
                                        { value: "12", label: "Meets Expectations", desc: "양호함, 업무를 정상적으로 수행하며 기대 수준을 달성합니다." },
                                        { value: "8", label: "Below Expectations", desc: "노력이 필요함, 기본적인 역할은 수행하지만 개선이 필요한 부분이 보입니다." },
                                        { value: "4", label: "Unsatisfactory", desc: "부족함, 업무 수행에 어려움이 있으며 명확한 개선 노력이 요구됩니다." },
                                        { value: "0", label: "Needs Improvement", desc: "매우 부족함, 기대 수준에 크게 미치지 못하며 즉각적인 개선과 지원이 필요합니다." },
                                    ].map((option) => (
                                        <div key={option.value} className="flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                                            <RadioGroupItem value={option.value} id={option.value} className="mt-0.5" />
                                            <Label htmlFor={option.value} className="flex-1 cursor-pointer space-y-1">
                                                <div className="font-medium">{option.label}</div>
                                                <div className="text-sm text-muted-foreground"> {option.desc}</div>
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        )}

                        {currentQuestion.type === "rating" && (
                            <div className="space-y-4 pt-4">
                                <RadioGroup
                                    value={answers[currentQuestion.id]}
                                    onValueChange={onAnswer}
                                    className="space-y-3"
                                >
                                    {[
                                        {
                                            value: "10",
                                            label: "Excellent",
                                            desc: "매우 뛰어남",
                                        },
                                        {
                                            value: "4",
                                            label: "Very Good",
                                            desc: "Often exceeds expectations",
                                        },
                                        { value: "3", label: "Good", desc: "Meets expectations" },
                                        {
                                            value: "2",
                                            label: "Fair",
                                            desc: "Sometimes meets expectations",
                                        },
                                        {
                                            value: "1",
                                            label: "Needs Improvement",
                                            desc: "Rarely meets expectations",
                                        },
                                    ].map((option) => (
                                        <div
                                            key={option.value}
                                            className="flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                                        >
                                            <RadioGroupItem
                                                value={option.value}
                                                id={option.value}
                                                className="mt-0.5"
                                            />
                                            <Label
                                                htmlFor={option.value}
                                                className="flex-1 cursor-pointer space-y-1"
                                            >
                                                <div className="font-medium">{option.label}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {option.desc}
                                                </div>
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        )}

                        {/* Multiple Choice */}
                        {currentQuestion.type === "multiple-choice" && (
                            <div className="space-y-3 pt-4">
                                <RadioGroup
                                    value={answers[currentQuestion.id]}
                                    onValueChange={onAnswer}
                                    className="space-y-3"
                                >
                                    {currentQuestion.options?.map((option, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                                        >
                                            <RadioGroupItem
                                                value={option}
                                                id={`q${currentQuestion.id}-${index}`}
                                                className="mt-0.5"
                                            />
                                            <Label
                                                htmlFor={`q${currentQuestion.id}-${index}`}
                                                className="flex-1 cursor-pointer leading-relaxed"
                                            >
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        )}

                        {/* Text Input */}
                        {currentQuestion.type === "text" && (
                            <div className="pt-4">
                                <Textarea
                                    value={answers[currentQuestion.id] || ""}
                                    onChange={(e) => onAnswer(e.target.value)}
                                    placeholder="Share your thoughts here..."
                                    className="min-h-[200px] resize-none leading-relaxed"
                                />
                                <p className="mt-2 text-xs text-muted-foreground">
                                    Provide specific examples and details to support your response.
                                </p>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Navigation */}
                <div className="flex items-center justify-between gap-3">
                    <Button
                        variant="outline"
                        onClick={onPrevious}
                        disabled={currentStep === 0}
                        className="min-w-24 bg-transparent"
                    >
                        Previous
                    </Button>
                    <div className="flex gap-1.5">
                        {questions.map((_, index) => (
                            <div
                                key={index}
                                className={`h-1.5 w-1.5 rounded-full transition-colors ${index === currentStep
                                    ? "bg-primary w-6"
                                    : index < currentStep
                                        ? "bg-accent"
                                        : "bg-border"
                                    }`}
                            />
                        ))}
                    </div>
                    <Button
                        onClick={onNext}
                        disabled={!isAnswered || isSubmitting} // Disable when submitting
                        className={`min-w-24 ${currentStep === questions.length - 1 ? "bg-green-600 hover:bg-green-700" : ""}`}
                    >
                        {/* Show loading text if submitting on last step */}
                        {currentStep === questions.length - 1
                            ? (isSubmitting ? "Submitting..." : "Submit")
                            : "Next"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
