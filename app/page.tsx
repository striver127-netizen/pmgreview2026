import PerformanceReview from "@/components/performance-review"
import { AuthGuard } from "@/components/auth-guard"

export default function Page() {
    return (
        <AuthGuard>
            <main className="min-h-screen bg-background">
                <PerformanceReview />
            </main>
        </AuthGuard>
    )
}
