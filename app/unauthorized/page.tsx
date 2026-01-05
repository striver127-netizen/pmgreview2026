import { AlertCircle } from "lucide-react"

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="text-center space-y-4 max-w-sm">
                <div className="flex justify-center text-destructive">
                    <AlertCircle className="w-12 h-12" />
                </div>
                <h1 className="text-xl font-bold">접근 제한됨</h1>
                <p className="text-muted-foreground">
                    잘못된 경로로 접근하셨습니다.
                    <br />
                    그룹웨어(kobe.pmgasia.co.kr)를 통해 접속해 주세요.
                </p>
            </div>
        </div>
    )
}
