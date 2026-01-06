"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-guard"
import { ReviewIntro } from "@/components/review-intro"
import { ReviewSelection, Target } from "@/components/review-selection"
import { ReviewComplete } from "@/components/review-complete"
import { ReviewQuestion, questions } from "@/components/review-question"
import { questionsType1, questionsType2, questionsType3, questionsType4 } from "@/components/questions-data"

export default function PerformanceReview() {
  const { user_id } = useAuth()
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

        const newTargets: Target[] = []

        // Helper to map API response items to Target objects
        const mapItems = (items: any[], type: "OT" | "ST" | "GM" | "TL") => {
          return (
            items?.map((item) => ({
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

  const handleNext = async () => {
    if (currentStep < currentQuestions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      if (confirm("평가를 완료합니다. 해당 내용으로 제출하시겠습니까?")) {
        try {
          const payload = {
            user_id,
            target_id: selectedPerson,
            answers: currentQuestions.map((q) => ({
              question_id: q.id,
              question_text: q.question,
              question_type: q.type,
              category: q.category,
              answer_value: answers[q.id],
            })),
          }

          const response = await fetch("/api/review/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          })

          if (response.ok) {
            setCurrentPage("complete")
          } else {
            alert("제출 중 오류가 발생했습니다. 다시 시도해 주세요.")
          }
        } catch (error) {
          console.error("Submission error:", error)
          alert("제출 중 오류가 발생했습니다. 다시 시도해 주세요.")
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
    <ReviewQuestion
      currentStep={currentStep}
      answers={answers}
      questions={currentQuestions}
      description={reviewDescription}
      onAnswer={handleAnswer}
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  )
}

