import { Question } from "@/components/review-question"
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
    { id: "9", type: "rating10", category: "리더쉽", question: "[책임감] 책임회피와 전가를 하지 않으며 주어진 일을 완수하려는 자세를 가졌는가?" },
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
    { id: "5", type: "rating20", category: "책임감", question: "주어진 업무에 책임감을 가지고 임하는가?" },
    { id: "6", type: "rating20", category: "효율성 관리", question: "효율성 향상을 위해 노력하고 있는가?" },
    { id: "7", type: "rating20", category: "문제 해결", question: "문제 발생 시 해결을 위한 최적의 방법을 적용하는가?" },
    { id: "8", type: "rating20", category: "완성도", question: "주어진 업무의 결과물에 대한 완성도가 우수한가?" },
    { id: "9", type: "text", category: "추가의견", question: "본 평가 항목에서 충분히 다루지 못한 내용이나, 리더십과 업무 운영 과정에서 느낀 추가 의견이 있다면 자유롭게 작성해 주세요." },
]

export const questionsType4: Question[] = [
    { id: "1", type: "rating10", category: "업무 속도", question: "업무를 신속하게 수행하기 위한 최선의 노력을 행하고 있는가?" },
    { id: "2", type: "rating10", category: "꼼꼼함", question: "실수를 최소화하기 위해 노력하며 같은 실수를 반복하지 않는가?" },
    { id: "3", type: "rating10", category: "피드백", question: "주어진 업무에 대한 처리 과정 및 업무 결과에 대해 적절한 피드백을 주고받고 있는가?" },
    { id: "4", type: "rating10", category: "일정 준수", question: "주어진 업무를 일정에 맞게 완료하는가?" },
    { id: "5", type: "rating20", category: "책임감", question: "주어진 업무에 책임감을 가지고 임하는가?" },
    { id: "6", type: "rating20", category: "효율성 관리", question: "효율성 향상을 위해 노력하고 있는가?" },
    { id: "7", type: "rating20", category: "문제 해결", question: "문제 발생 시 해결을 위한 최적의 방법을 적용하는가?" },
    { id: "8", type: "rating20", category: "완성도", question: "주어진 업무의 결과물에 대한 완성도가 우수한가?" },
    { id: "9", type: "text", category: "추가의견", question: "본 평가 항목에서 충분히 다루지 못한 내용이나, 업무 요청 및 협업 과정에서 느낀 소통 방식과 협업 효율에 대한 추가 의견이 있다면 자유롭게 작성해 주세요." },
]