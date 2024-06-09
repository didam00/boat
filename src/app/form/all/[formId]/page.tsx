import QuestionBox from "@/components/QuestionBox";
import styles from "./page.module.scss";
import FormPageSideBox from "@/components/FormPageSideBox";

const voteFormData: VoteFormType = {
  public: true,
  isShortForm: false,
  category: ["프로그래밍"],
  votes: 0,
  views: 1,
  title: "웹 개발 선호도 설문",
  author: "author01",
  questions: [
    {
      id: 1,
      type: "choice",
      title: "띄어쓰기를 몇 칸 하시나요?",
      content: [],
      choices: [
        {
          type: "txt",
          data: "2칸"
        },
        {
          type: "txt",
          data: "4칸"
        },
        {
          type: "txt",
          data: "8칸"
        },
      ],
      hasOtherChoice: true,
      otherChoiceType: "number",
      hasParentQuestion: false,
      required: false,
    },
    {
      id: 2,
      type: "essay",
      title: "해당 띄어쓰기 개수를 선택하신 이유가 있나요?",
      content: [
        {
          type: "txt",
          data: "생각보다 띄어쓰기는 언어별로 다양한 칸 수를 사용합니다. 예를 들어, 웹 개발자의 경우엔 보통 2칸을 씁니다."
        },
        {
          type: "txt",
          data: "이 말을 할 말이 없어서 넣는 말."
        },
        {
          type: "img",
          data: "https://velog.velcdn.com/images/yumjongeun/post/4f881634-b76d-443f-b724-b23eda68eb32/image.jpg"
        },
      ],
      hasOtherChoice: false,
      hasParentQuestion: false,
      required: false,
    },
    {
      id: 3,
      type: "multi-choice",
      title: "사용하는 언어를 모두 골라주세요.",
      content: [],
      choices: [
        {
          type: "txt",
          data: "C언어"
        },
        {
          type: "txt",
          data: "Java"
        },
        {
          type: "txt",
          data: "Python"
        },
      ],
      hasOtherChoice: false,
      hasParentQuestion: false,
      required: false,
    },
    {
      id: 4,
      type: "multi-short",
      title: "배우고 싶은 언어들을 적어주세요!",
      content: [
        {
          type: "txt",
          data: "이거 깜빡이는 거 없애고 추가할 때 **자바스크립트로 뿅!** 하는 효과 추가하면 좋을듯"
        }
      ],
      hasOtherChoice: false,
      hasParentQuestion: false,
      required: false,
    },
    {
      id: 5,
      type: "essay",
      title: "해당 언어를 배우고 싶은 이유가 무엇인가요?",
      content: [],
      hasOtherChoice: false,
      hasParentQuestion: false,
      required: false,
    },
  ]
}

export default function VotePage({
  params
}: {
  params: {
    voteId: number
  }
}) {
  const questions = voteFormData.questions.map((q, i) => (
    <QuestionBox question={q} questionIndex={i} />
  ))

  return (
    <main>
      <div className={`m__size ${styles["top-container"]}`}>
        <article className={styles["vote-main"]}>
          <h2>Q. {voteFormData.title}</h2>
          <span className={styles["category-list"]}>{voteFormData.category.join(" ")}</span>
          {questions}
        </article>
        <FormPageSideBox questions={voteFormData.questions} />
      </div>
    </main>
  )
}