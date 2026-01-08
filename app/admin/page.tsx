"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Team {
    team_id: string
    team_nm: string
}

interface User {
    team_id: string
    user_id: string
    user_nm: string
    cnt?: number
    ave?: number
    rating?: string
    // Add other properties if available from API
    [key: string]: any
}

interface AdminData {
    team: Team[]
    user: User[]
}

export default function AdminPage() {
    const router = useRouter()

    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState("")
    const [authError, setAuthError] = useState(false)

    // Data State
    const [data, setData] = useState<AdminData | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null)

    // Handle Login
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (password === "pmgkorea2025review") {
            setIsAuthenticated(true)
            localStorage.setItem("isAdminAuthenticated", "true")
            fetchData()
        } else {
            setAuthError(true)
            // Invalid password, just show error state
        }
    }

    // Check Auth on Mount
    useEffect(() => {
        const isAuth = localStorage.getItem("isAdminAuthenticated")
        if (isAuth === "true") {
            setIsAuthenticated(true)
            fetchData()
        }
    }, [])

    // Fetch Data
    const fetchData = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch("/api/external/review/admin")
            if (!res.ok) throw new Error("Failed to fetch admin data")
            const jsonData = await res.json()
            setData(jsonData)

            // Select first team by default if available
            if (jsonData.team && jsonData.team.length > 0) {
                setSelectedTeamId(jsonData.team[0].team_id)
            }
        } catch (err: any) {
            console.error(err)
            setError(err.message || "Unknown error")
        } finally {
            setLoading(false)
        }
    }

    // Render Login Screen
    if (!isAuthenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
                <Card className="w-full max-w-sm p-8 shadow-xl">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Admin Access</h1>
                        <p className="text-sm text-zinc-500 mt-2">Enter password to continue</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    setAuthError(false)
                                }}
                                className={authError ? "border-red-500" : ""}
                                autoFocus
                            />
                            {authError && <p className="text-xs text-red-500 mt-1">Incorrect password. Redirecting...</p>}
                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </form>
                </Card>
            </div>
        )
    }

    // Render Loading
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
                <div className="animate-pulse text-zinc-400 font-medium">Loading Admin Data...</div>
            </div>
        )
    }

    // Render Error
    if (error || !data) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
                <div className="text-red-500 text-center">
                    <h2 className="text-xl font-bold mb-2">Error Loading Data</h2>
                    <p>{error || "No data available"}</p>
                    <Button onClick={fetchData} variant="outline" className="mt-4">Retry</Button>
                </div>
            </div>
        )
    }

    // Filter Users by Selected Team
    const filteredUsers = data.user.filter(u => String(u.team_id) === String(selectedTeamId))

    // Render Main Layout (2:8 Split)
    return (
        <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950 font-sans">

            {/* Sidebar (Teams) - 20% */}
            <aside className="w-[250px] md:w-[20%] flex-shrink-0 border-r bg-white dark:bg-zinc-900 dark:border-zinc-800 overflow-y-auto">
                <div className="p-6 border-b dark:border-zinc-800 sticky top-0 bg-white dark:bg-zinc-900 z-10">
                    <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">Teams</h2>
                    <p className="text-xs text-zinc-500 mt-1">Select a team to view members</p>
                </div>
                <div className="p-3 space-y-1">
                    {data.team.map((team) => (
                        <button
                            key={team.team_id}
                            onClick={() => setSelectedTeamId(team.team_id)}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${String(selectedTeamId) === String(team.team_id)
                                ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
                                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                                }`}
                        >
                            {team.team_nm}
                        </button>
                    ))}
                </div>
            </aside>

            {/* Main Content (Users) - 80% */}
            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-8 flex items-end justify-between border-b pb-4 dark:border-zinc-800">
                        <div>
                            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                                {data.team.find(t => String(t.team_id) === String(selectedTeamId))?.team_nm || "Select a Team"}
                            </h1>
                            <p className="text-zinc-500 mt-1">
                                {filteredUsers.length} Members found
                            </p>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredUsers.map((user) => (
                            <Card key={user.user_id} className="p-5 hover:shadow-md transition-shadow dark:bg-zinc-900 dark:border-zinc-800">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="font-semibold text-lg text-zinc-800 dark:text-zinc-200">
                                        {user.user_nm}
                                    </div>
                                    <span className="text-xs font-mono text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 px-2 py-0.5 rounded">
                                        {user.user_id}
                                    </span>
                                </div>

                                {/* Additional User Info if available */}
                                <div className="mt-1 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                                    {/* Stats Row */}
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-zinc-500">Avg:</span>
                                            <span className="font-bold text-zinc-900 dark:text-zinc-100">
                                                {user.ave || 0} <span className="font-normal text-zinc-500">({user.cnt ? user.cnt : 0})</span>
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-zinc-500">Rating:</span>
                                            <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${user.rating ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-gray-100 text-gray-500'
                                                }`}>
                                                {user.rating || '-'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        {user.grant && (
                                            <span className={`text-xs px-2 py-1 rounded font-medium ${user.grant === 'leader'
                                                ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                                : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800'
                                                }`}>
                                                {user.grant === 'leader' ? 'Leader' : 'Member'}
                                            </span>
                                        )}

                                        <Button
                                            variant={user.ave && user.ave > 0 ? "default" : "ghost"}
                                            className={`text-xs px-3 py-1 h-auto font-medium ${user.ave && user.ave > 0
                                                ? "bg-blue-500 text-white hover:bg-blue-600 shadow-none"
                                                : "text-zinc-400 cursor-not-allowed hover:bg-transparent hover:text-zinc-400"
                                                }`}
                                            disabled={!user.ave || user.ave === 0}
                                            onClick={() => user.ave && user.ave > 0 && router.push(`/admin/review/${user.user_id}`)}
                                        >
                                            {user.ave && user.ave > 0 ? "View Details" : "Pending"}
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}

                        {filteredUsers.length === 0 && (
                            <div className="col-span-full py-20 text-center text-zinc-400 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                                No members found in this team.
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
