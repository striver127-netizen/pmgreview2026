"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { RATING_OPTIONS } from "@/components/questions-data"

export default function ReviewDetailPage() {
    const params = useParams()
    // Ensure userId is treated as string to avoid type issues
    const userId = Array.isArray(params?.userId) ? params.userId[0] : params?.userId as string

    const [data, setData] = useState<any[]>([])
    const [stats, setStats] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!userId) return
        fetch(`/api/reviews/${userId}`)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setData(res.data)
                    setStats(res.stats)
                }
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [userId])

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-zinc-950 text-gray-400">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-4 w-4 rounded-full bg-blue-500 animate-bounce mb-4"></div>
                    Loading Reviews...
                </div>
            </div>
        )
    }

    // Helper to handle potential Prisma JSON types which might come as strings or objects
    const safeParse = (val: any) => {
        if (typeof val === 'string') {
            try {
                return JSON.parse(val)
            } catch (e) {
                return val // return as is if not valid JSON
            }
        }
        return val
    }

    const getAnswerDetails = (type: string, value: string) => {
        if (!type || type === 'text') return null;

        const options = RATING_OPTIONS[type as keyof typeof RATING_OPTIONS];
        if (options) {
            const match = options.find(o => o.value === String(value));
            if (match) {
                return {
                    label: match.label,
                    desc: match.desc
                };
            }
        }
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-8 font-sans">
            {/* Header */}
            <header className="mb-10 max-w-4xl mx-auto">
                <Link href="/admin" className="text-sm font-medium text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-4 inline-block transition-colors">
                    ← Back to Dashboard
                </Link>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{decodeURIComponent(userId)}</h1>
                        <p className="text-gray-500 mt-1">Review Details</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="flex gap-4">
                        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 text-center min-w-[100px]">
                            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Total Reviews</div>
                            <div className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-1">{stats?.count || 0}</div>
                        </div>
                        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 text-center min-w-[100px]">
                            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Avg Score</div>
                            <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-1">{stats?.averageScore || "0.0"}</div>
                        </div>
                        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 text-center min-w-[100px]">
                            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Total Points</div>
                            <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{stats?.totalScore || 0}</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Review List */}
            <main className="space-y-6 max-w-4xl mx-auto">
                {data.map((review: any) => {
                    // Ensure arrays are arrays
                    const questionText = Array.isArray(review.question_text) ? review.question_text : (safeParse(review.question_text) || []);
                    const answerValue = Array.isArray(review.answer_value) ? review.answer_value : (safeParse(review.answer_value) || []);
                    const category = Array.isArray(review.category) ? review.category : (safeParse(review.category) || []);
                    const questionType = Array.isArray(review.question_type) ? review.question_type : (safeParse(review.question_type) || []);

                    return (
                        <div key={review.id} className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-50 dark:border-zinc-800 flex items-center justify-between bg-gray-50/50 dark:bg-zinc-800/30">
                                <div className="text-sm font-medium text-gray-500 flex items-center gap-3">
                                    <span>Review Date: {new Date(review.created_at).toLocaleDateString()}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                                        Reviewer: {review.user_nm} ({review.user_id})
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-400">Total Score:</span>
                                    <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{review.total_point}</span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="grid gap-6">
                                    {Array.isArray(questionText) && questionText.map((q: string, idx: number) => {
                                        const answer = Array.isArray(answerValue) ? answerValue[idx] : "";
                                        const cat = Array.isArray(category) ? category[idx] : "General";
                                        const type = Array.isArray(questionType) ? questionType[idx] : "text";

                                        return (
                                            <div key={idx} className="pb-4 border-b border-gray-100 dark:border-zinc-800 last:border-0 last:pb-0">
                                                <div className="flex items-start gap-3 mb-2">
                                                    <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-gray-100 text-gray-500 dark:bg-zinc-800 dark:text-zinc-400 mt-0.5">
                                                        {cat}
                                                    </span>
                                                    <p className="text-gray-800 dark:text-gray-200 font-medium">{q}</p>
                                                </div>
                                                <div className="pl-[calc(2rem)]">
                                                    {type === 'text' ? (
                                                        <p className="text-gray-600 dark:text-gray-400 italic bg-gray-50 dark:bg-zinc-800/50 p-3 rounded-lg text-sm leading-relaxed">
                                                            "{answer}"
                                                        </p>
                                                    ) : (
                                                        <div className="flex flex-wrap items-center gap-3">
                                                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 rounded-md text-sm font-bold shadow-sm whitespace-nowrap">
                                                                <span>Score:</span>
                                                                <span>{answer}</span>
                                                            </div>
                                                            {(() => {
                                                                const details = getAnswerDetails(type, answer);
                                                                if (details) {
                                                                    return (
                                                                        <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                                                                            <span className="font-semibold text-gray-900 dark:text-gray-200 mr-2">{details.label}</span>
                                                                            <span className="text-gray-300 mr-2">|</span>
                                                                            <span className="italic">{details.desc}</span>
                                                                        </div>
                                                                    )
                                                                }
                                                                return null;
                                                            })()}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}

                {data.length === 0 && (
                    <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-800 text-gray-400">
                        No reviews found for this user.
                    </div>
                )}
            </main>
        </div>
    )
}
