import { Question } from "@/components/review-question"

export const RATING_OPTIONS = {
    rating5: [
        { value: "5", label: "Outstanding", desc: "매우 뛰어남, 기대 수준을 크게 상회하며 지속적으로 탁월한 성과를 보여줍니다." },
        { value: "4", label: "Exceeds Expectations", desc: "뛰어남, 대부분의 업무에서 기대 이상의 성과를 안정적으로 달성합니다." },
        { value: "3", label: "Meets Expectations", desc: "양호함, 업무를 정상적으로 수행하며 기대 수준을 달성합니다." },
        { value: "2", label: "Below Expectations", desc: "노력이 필요함, 기본적인 역할은 수행하지만 개선이 필요한 부분이 보입니다." },
        { value: "1", label: "Unsatisfactory", desc: "부족함, 업무 수행에 어려움이 있으며 명확한 개선 노력이 요구됩니다." },
        { value: "0", label: "Needs Improvement", desc: "매우 부족함, 기대 수준에 크게 미치지 못하며 즉각적인 개선과 지원이 필요합니다." },
    ],
    rating10: [
        { value: "10", label: "Outstanding", desc: "매우 뛰어남, 기대 수준을 크게 상회하며 지속적으로 탁월한 성과를 보여줍니다." },
        { value: "8", label: "Exceeds Expectations", desc: "뛰어남, 대부분의 업무에서 기대 이상의 성과를 안정적으로 달성합니다." },
        { value: "6", label: "Meets Expectations", desc: "양호함, 업무를 정상적으로 수행하며 기대 수준을 달성합니다." },
        { value: "4", label: "Below Expectations", desc: "노력이 필요함, 기본적인 역할은 수행하지만 개선이 필요한 부분이 보입니다." },
        { value: "2", label: "Unsatisfactory", desc: "부족함, 업무 수행에 어려움이 있으며 명확한 개선 노력이 요구됩니다." },
        { value: "0", label: "Needs Improvement", desc: "매우 부족함, 기대 수준에 크게 미치지 못하며 즉각적인 개선과 지원이 필요합니다." },
    ],
    rating15: [
        { value: "15", label: "Outstanding", desc: "매우 뛰어남, 기대 수준을 크게 상회하며 지속적으로 탁월한 성과를 보여줍니다." },
        { value: "12", label: "Exceeds Expectations", desc: "뛰어남, 대부분의 업무에서 기대 이상의 성과를 안정적으로 달성합니다." },
        { value: "10", label: "Meets Expectations", desc: "양호함, 업무를 정상적으로 수행하며 기대 수준을 달성합니다." },
        { value: "7", label: "Below Expectations", desc: "노력이 필요함, 기본적인 역할은 수행하지만 개선이 필요한 부분이 보입니다." },
        { value: "4", label: "Unsatisfactory", desc: "부족함, 업무 수행에 어려움이 있으며 명확한 개선 노력이 요구됩니다." },
        { value: "0", label: "Needs Improvement", desc: "매우 부족함, 기대 수준에 크게 미치지 못하며 즉각적인 개선과 지원이 필요합니다." },
    ],
    rating20: [
        { value: "20", label: "Outstanding", desc: "매우 뛰어남, 기대 수준을 크게 상회하며 지속적으로 탁월한 성과를 보여줍니다." },
        { value: "16", label: "Exceeds Expectations", desc: "뛰어남, 대부분의 업무에서 기대 이상의 성과를 안정적으로 달성합니다." },
        { value: "12", label: "Meets Expectations", desc: "양호함, 업무를 정상적으로 수행하며 기대 수준을 달성합니다." },
        { value: "8", label: "Below Expectations", desc: "노력이 필요함, 기본적인 역할은 수행하지만 개선이 필요한 부분이 보입니다." },
        { value: "4", label: "Unsatisfactory", desc: "부족함, 업무 수행에 어려움이 있으며 명확한 개선 노력이 요구됩니다." },
        { value: "0", label: "Needs Improvement", desc: "매우 부족함, 기대 수준에 크게 미치지 못하며 즉각적인 개선과 지원이 필요합니다." },
    ],
    rating: [
        { value: "10", label: "Excellent", desc: "매우 뛰어남" },
        { value: "4", label: "Very Good", desc: "Often exceeds expectations" },
        { value: "3", label: "Good", desc: "Meets expectations" },
        { value: "2", label: "Fair", desc: "Sometimes meets expectations" },
        { value: "1", label: "Needs Improvement", desc: "Rarely meets expectations" },
    ]
}

/**
 * case 같은팀(ST)
 *      case "leader": 타입2
 *      case "member": 타입1
 * case 다른팀(OT)
 *      case "leader": 타입2
 *      case "member":
 *          case team_id in (4,42,43,44,38): 타입3
 *          case else: 타입4
 */

export const questionsType1: Question[] = [
    { id: "1", type: "rating5", category: "사내 생활", question: "[규율 준수] 사내 방침을 충실히 따르고 있는가?" },
    { id: "2", type: "rating5", category: "사내 생활", question: "[관계 형성] 팀원간의 화합을 위해 노력하고 있는가?" },
    { id: "3", type: "rating5", category: "사내 생활", question: "[관계 형성] 타 부서와의 원만한 관계 형성 및 유지를 위해 노력하고 있는가?" },
    { id: "4", type: "rating10", category: "업무태도", question: "[책임감] 책임회피와 전가를 하지 않으며 주어진 일을 완수하려는 자세를 가졌는가?" },
    { id: "5", type: "rating10", category: "업무태도", question: "[적극성] 주어진 업무 및 지시사항을 적극적으로 임하는가?" },
    { id: "6", type: "rating5", category: "업무태도", question: "[피드백] 주어진 업무에 대한 처리 과정 및 업무 결과에 대해 적절한 피드백을 주고받고 있는가?" },
    { id: "7", type: "rating10", category: "수행능력", question: "[이해력] 주어진 업무에 대한 내용을 정확하게 이해하며 실행하고 있는가?" },
    { id: "8", type: "rating10", category: "수행능력", question: "[의견 제시] 주어진 업무를 수행하기 위한 다양한 의견을 적극적으로 제시하고 있는가?" },
    { id: "9", type: "rating10", category: "수행능력", question: "[업무 속도] 업무를 신속하게 수행하기 위한 최선의 노력을 행하고 있는가?" },
    { id: "10", type: "rating10", category: "수행능력", question: "[꼼꼼함] 실수를 최소화하기 위해 노력하며 같은 실수를 반복하지 않는가?" },
    { id: "11", type: "rating10", category: "수행능력", question: "[일정 준수] 주어진 업무를 일정에 맞게 완료하는가?" },
    { id: "12", type: "rating10", category: "수행능력", question: "[완성도] 주어진 업무의 결과물에 대한 완성도가 직급 대비 부족하지 않은가?" },
    { id: "13", type: "rating10", category: "수행능력", question: "[효율성] 업무를 효율적으로 완수하기 위해 최선을 다하고 있는가?" },
    { id: "14", type: "rating10", category: "수행능력", question: "[개선 노력] 부족한 부분을 잘 파악하고 있으며, 개선하기 위해 노력하고 있는가?" },
    { id: "15", type: "text", category: "추가의견", question: "본 평가 항목에서 충분히 다루지 못한 내용이나, 평가 대상자의 업무 수행과 협업 과정에서의 의견이 있다면 자유롭게 작성해 주세요." },

]

export const questionsType2: Question[] = [
    { id: "1", type: "rating5", category: "사내 생활", question: "[규율 준수] 사내 방침을 충실히 따르고 있는가?" },
    { id: "2", type: "rating5", category: "사내 생활", question: "[관계 형성] 팀원간의 화합을 위해 노력하고 있는가?" },
    { id: "3", type: "rating5", category: "사내 생활", question: "[관계 형성] 타 부서와의 원만한 관계 형성 및 유지를 위해 노력하고 있는가?" },
    { id: "4", type: "rating5", category: "수행능력", question: "[의견 제시] 주어진 업무를 수행하기 위한 다양한 의견을 적극적으로 제시하고 있는가?" },
    { id: "5", type: "rating5", category: "수행능력", question: "[업무 속도] 업무를 신속하게 수행하기 위한 최선의 노력을 행하고 있는가?" },
    { id: "6", type: "rating5", category: "수행능력", question: "[꼼꼼함] 실수를 최소화하기 위해 노력하며 같은 실수를 반복하지 않는가?" },
    { id: "7", type: "rating10", category: "수행능력", question: "[일정 준수] 주어진 업무를 일정에 맞게 완료하는가? " },
    { id: "8", type: "rating10", category: "수행능력", question: "[완성도] 주어진 업무의 결과물에 대한 완성도가 우수한가?" },
    { id: "9", type: "rating10", category: "리더쉽", question: "[책임감] 어려운 상황이나 이슈 발생 시 책임을 회피하거나 전가하지 않고, 문제 해결과 결과 도출을 위해 끝까지 책임을 완수하기 위해 노력하는가?" },
    { id: "10", type: "rating15", category: "리더쉽", question: "[피드백] 주어진 업무에 대한 처리 과정 및 업무 결과에 대해 적절한 피드백을 주고받고 있는가?" },
    { id: "11", type: "rating15", category: "리더쉽", question: "[효율성 관리] 효율성 향상을 위해 적절한 방법을 제시하고 있는가?" },
    { id: "12", type: "rating10", category: "리더쉽", question: "[문제 해결] 문제 발생 시 해결을 위한 최적의 방법을 적용하는가?" },
    { id: "13", type: "rating10", category: "리더쉽", question: "[팀(셀) 성장] 팀(셀)의 성장을 위해 적절한 방법을 제시 및 실행하고 있는가?" },
    { id: "14", type: "rating10", category: "리더쉽", question: "[개선 노력] 본인 및 팀원들의 부족한 부분을 잘 파악하고 있으며, 개선하기 위해 노력하고 있는가?" },
    { id: "15", type: "text", category: "추가의견", question: "본 평가 항목에서 충분히 다루지 못한 내용이나, 리더십과 업무 운영 과정에서 느낀 추가 의견이 있다면 자유롭게 작성해 주세요." },
]

export const questionsType3: Question[] = [
    { id: "1", type: "rating10", category: "업무 속도", question: "업무를 신속하게 수행하기 위한 최선의 노력을 행하고 있는가?" },
    { id: "2", type: "rating10", category: "꼼꼼함", question: "실수를 최소화하기 위해 노력하며 같은 실수를 반복하지 않는가?" },
    { id: "3", type: "rating10", category: "피드백", question: "주어진 업무에 대한 처리 과정 및 업무 결과에 대해 적절한 피드백을 주고받고 있는가?" },
    { id: "4", type: "rating10", category: "일정 준수", question: "주어진 업무를 일정에 맞게 완료하는가?" },
    { id: "5", type: "rating10", category: "책임감", question: "주어진 업무에 책임감을 가지고 임하는가?" },
    { id: "6", type: "rating10", category: "창의성", question: "업무 수행 시 전문성을 바탕으로 개선 의견이나 대안을 제시하고, 새로운 접근 방식이나 아이디어를 제안하는가?" },
    { id: "7", type: "rating10", category: "효율성 관리", question: "AE의 브리프와 커뮤니케이션 내용을 정확히 이해하고, 재작업 또는 반복적인 과정 없이 효율적으로 업무를 수행하는가?" },
    { id: "8", type: "rating20", category: "문제 해결", question: "문제가 발생하거나 방향 수정이 필요할 때, 관련 부서와 원활히 소통하며 해결책을 모색하는가?" },
    { id: "9", type: "rating20", category: "완성도", question: "주어진 업무의 결과물에 대한 완성도가 우수한가?" },
    { id: "10", type: "text", category: "추가의견", question: "본 평가 항목에서 충분히 다루지 못한 내용이나, 리더십과 업무 운영 과정에서 느낀 추가 의견이 있다면 자유롭게 작성해 주세요." },
]

export const questionsType4: Question[] = [
    { id: "1", type: "rating10", category: "업무 이해도", question: "요청 업무의 특성(제작물,플랫폼,퍼포먼스 외)에 대하여 잘 이해하고 있는가?" },
    { id: "2", type: "rating10", category: "클라이언트 이해도", question: "클라이언트 요청을 내부 업무 관점에서 정리하여, 스페셜리스트가 실행 가능하도록 명확히 전달하는가?(브리프, 커뮤니케이션 등)" },
    { id: "3", type: "rating10", category: "정보 공유", question: "클라이언트로부터 요청받은 업무 내용을 상세히 공유하는가?" },
    { id: "4", type: "rating10", category: "일정 조율", question: "업무에 필요한 최소한의 일정 확보를 위해 노력하는가?" },
    { id: "5", type: "rating10", category: "의사 결정", question: "프로젝트의 주요 단계마다, 신속한 의사결정과 일관성있는 커뮤니케이션을 하고 있는가?" },
    { id: "6", type: "rating10", category: "창의성", question: "창의적인 결과물을 만들기 위한 아이디어, 제안을 하고 있는가?" },
    { id: "7", type: "rating10", category: "효율성", question: "수정을 최소화하기 위한 노력(수정사항 취합 요청 외)에 최선을 다하고 있는가?" },
    { id: "8", type: "rating20", category: "내부 피드백", question: "합리적이고 타당한 내부 피드백을 제공하고 있는가?" },
    { id: "9", type: "rating20", category: "문제 해결", question: "문제가 발생하거나 방향 수정이 필요할 때, 관련 부서와 원활히 소통하며 해결책을 모색하는가?" },
    { id: "10", type: "text", category: "추가의견", question: "본 평가 항목에서 충분히 다루지 못한 내용이나, 업무 요청 및 협업 과정에서 느낀 소통 방식과 협업 효율에 대한 추가 의견이 있다면 자유롭게 작성해 주세요." },
]