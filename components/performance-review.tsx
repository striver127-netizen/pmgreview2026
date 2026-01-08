"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-guard"
import { ReviewIntro } from "@/components/review-intro"
import { ReviewSelection, Target } from "@/components/review-selection"
import { ReviewComplete } from "@/components/review-complete"
import { ReviewQuestion, questions } from "@/components/review-question"
import { questionsType1, questionsType2, questionsType3, questionsType4 } from "@/components/questions-data"

export default function PerformanceReview() {
  const { user_id, user_nm } = useAuth()
  const [currentPage, setCurrentPage] = useState<"intro" | "selection" | "review" | "complete">(
    "intro"
  )
  const [selectedPerson, setSelectedPerson] = useState<string>("")
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [targets, setTargets] = useState<Target[]>([])
  const [isLoadingTargets, setIsLoadingTargets] = useState(false)
  const [currentQuestions, setCurrentQuestions] = useState(questions)
  const [reviewDescription, setReviewDescription] = useState("")

  // Helper to determine evaluation type
  const getEvaluationType = (target: Target) => {
    if (target.target_type === "ST") {
      if (target.target_grant === "leader") return "Type2"
      return "Type1"
    } else {
      if (target.target_grant === "leader") return "Type2"
      const teamIds = ["4", "42", "43", "44", "38"]
      if (target.target_team_id && teamIds.includes(String(target.target_team_id))) return "Type3"
      return "Type4"
    }
  }

  // Update questions when person is selected
  useEffect(() => {
    if (selectedPerson) {
      const target = targets.find((t) => t.target_id === selectedPerson)
      if (target) {
        const type = getEvaluationType(target)
        console.log("Evaluation Type:", type)

        switch (type) {
          case "Type1":
            setCurrentQuestions(questionsType1)
            setReviewDescription("함께 일한 경험을 바탕으로, 업무 수행과 협업 측면에서의 의견을 신중하게 작성해 주세요.")
            break
          case "Type2":
            setCurrentQuestions(questionsType2)
            setReviewDescription("Leadership, 팀을 이끄는 과정에서의 리더십과 업무 운영 경험을 바탕으로, 객관적인 의견을 작성해 주세요.")
            break
          case "Type3":
            setCurrentQuestions(questionsType3)
            setReviewDescription("PM to Specialist, 업무 협업 과정에서 느낀 전문성, 커뮤니케이션, 지원 수준을 바탕으로 의견을 작성해 주세요.")
            break
          case "Type4":
            setCurrentQuestions(questionsType4)
            setReviewDescription("Specialist to PM, 업무 요청과 협업 과정에서의 기획 이해도, 소통 방식, 협업 효율을 기준으로 의견을 작성해 주세요.")
            break
          default:
            setCurrentQuestions(questions)
            setReviewDescription("")
        }
      }
    }
  }, [selectedPerson, targets])

  const currentQuestion = currentQuestions[currentStep]

  const progress = ((currentStep + 1) / currentQuestions.length) * 100

  useEffect(() => {
    const fetchTargets = async () => {
      if (!user_id) return
      setIsLoadingTargets(true)
      try {
        const response = await fetch(`/api/external/review/list?user_id=${user_id}`)
        const data = await response.json()
        console.log("Review List Data:", data)

        const newTargets: Target[] = []

        // Helper to map API response items to Target objects
        const mapItems = (items: any, type: "OT" | "ST" | "GM" | "TL") => {
          if (!items || !Array.isArray(items)) return []
          return (
            items.map((item) => ({
              target_id: item.user_id,
              target_nm: item.user_nm,
              target_type: type,
              target_grant: item.grant,
              total: item.total,
              target_team_id: item.team_id,
            })) || []
          )
        }

        if (data) {
          if (data.TL) newTargets.push(...mapItems(data.TL, "TL"))
          if (data.ST) newTargets.push(...mapItems(data.ST, "ST"))
          if (data.GM) newTargets.push(...mapItems(data.GM, "GM"))
          if (data.OT) newTargets.push(...mapItems(data.OT, "OT"))

          setTargets(newTargets)
        } else {
          setTargets([])
        }
      } catch (error) {
        console.error("Failed to fetch review targets:", error)
        setTargets([])
      } finally {
        setIsLoadingTargets(false)
      }
    }

    if (currentPage === "selection") {
      fetchTargets()
    }
  }, [user_id, currentPage])

  // Error display state
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNext = async () => {
    setSubmitError(null) // Clear previous errors
    if (currentStep < currentQuestions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      if (confirm("평가를 완료합니다. 해당 내용으로 제출하시겠습니까?")) {
        setIsSubmitting(true)
        try {
          const payload = {
            user_id,
            user_nm,
            target_id: selectedPerson,
            answers: currentQuestions.map((q) => ({
              question_id: q.id,
              question_text: q.question,
              question_type: q.type,
              category: q.category,
              answer_value: answers[q.id],
            })),
          }

          console.log("Submitting payload:", payload)

          const response = await fetch("/api/review/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          })

          console.log("Response status:", response.status)

          if (response.ok) {
            setCurrentPage("complete")
          } else {
            const text = await response.text()
            console.log("Error response text:", text)

            try {
              const errorData = JSON.parse(text)
              const errorMessage = `Error: ${errorData.error}\nDetails: ${errorData.details}\n${errorData.stack || ''}`
              setSubmitError(errorMessage)
            } catch (e) {
              setSubmitError(`Error: Status ${response.status} - ${text}`)
            }

            alert("제출 중 오류가 발생했습니다. 아래 에러 메시지를 확인해주세요.")
          }
        } catch (error: any) {
          console.error("Submission error object:", error)
          console.error("Error Name:", error.name)
          console.error("Error Message:", error.message)

          const errorMessage = `Network/Unknown Error: ${error.name} - ${error.message || String(error)}`
          setSubmitError(errorMessage)
          alert("제출 중 오류가 발생했습니다.")
        } finally {
          setIsSubmitting(false)
        }
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value })
  }

  const isAnswered =
    answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== ""

  const teamMembers = targets.filter((t) => ["TL", "ST"].includes(t.target_type))
  const otherTeam = targets.filter((t) => ["GM", "OT"].includes(t.target_type))

  if (currentPage === "intro") {
    return <ReviewIntro onStart={() => setCurrentPage("selection")} questionCount={currentQuestions.length} />
  }

  if (currentPage === "selection") {
    return (
      <ReviewSelection isLoading={isLoadingTargets} teamMembers={teamMembers} otherTeam={otherTeam} selectedPerson={selectedPerson} onSelectPerson={setSelectedPerson} onBack={() => setCurrentPage("intro")} onContinue={() => setCurrentPage("review")} />
    )
  }

  if (currentPage === "complete") {
    return (
      <ReviewComplete onStartNew={() => {
        setCurrentPage("intro")
        setCurrentStep(0)
        setSelectedPerson("")
        setAnswers({})
      }} onViewSummary={() => console.log("Submitted:", answers)}
      />
    )
  }

  return (
    <div className="relative">
      <ReviewQuestion
        currentStep={currentStep}
        answers={answers}
        questions={currentQuestions}
        description={reviewDescription}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isSubmitting={isSubmitting} // Pass the loading state
      />
      {submitError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-900">
            <h3 className="mb-4 text-lg font-semibold text-red-600">제출 오류</h3>
            <p className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">
              에러가 발생했습니다. 아래 내용을 복사해서 전달해주세요.
            </p>
            <textarea
              className="h-40 w-full rounded border p-2 font-mono text-xs"
              readOnly
              value={submitError}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSubmitError(null)}
                className="rounded bg-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

}
