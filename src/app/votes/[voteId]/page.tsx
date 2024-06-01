import styles from "./page.module.scss";
import EssayAnswerBox from "@/components/AnswerBox/EssayAnswerBox";
import ChoiceAnswerBox from "@/components/AnswerBox/ChoiceAnswerBox";
import MultiChoiceAnswerBox from "@/components/AnswerBox/MultiChoiceAnswerBox";
import ShortAnswerBox from "@/components/AnswerBox/ShortAnswerBox";
import MultiShortAnswerBox from "@/components/AnswerBox/MultiShortAnswerBox";

const voteFormData: VoteFormType = {
  id: 1,
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
      hasParentQuestion: false
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
      hasParentQuestion: false
    },
    {
      id: 4,
      type: "multi-short",
      title: "배우고 싶은 언어들을 적어주세요!",
      content: [],
      hasOtherChoice: false,
      hasParentQuestion: false
    },
    {
      id: 5,
      type: "essay",
      title: "해당 언어를 배우고 싶은 이유가 무엇인가요?",
      content: [],
      hasOtherChoice: false,
      hasParentQuestion: false
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
    <QuestionBox question={q} index={i} />
  ))

  return (
    <main>
      <div className={`m__size top-container`}>
        <article>
          <h2>Q. {voteFormData.title}</h2>
          {questions}
        </article>
      </div>
    </main>
  )
}

function QuestionBox({
  question,
  index
}: {
  question: QuestionType
  index: number
}) {
  let answerBox: React.ReactNode;
  let descBox: JSX.Element[] = question.content.map((c, i) => {
    const Component = c.type === "img" ? "figure" : "span";
    return (
      <Component key={i} className={styles["question-desc"]}>
        {c.type === "img" ? <img src={c.data} /> : c.data}
      </Component>
    );
  });

  if (question.type === "choice" && question.choices) {
    answerBox = <ChoiceAnswerBox choices={question.choices} index={index} />
  } else if (question.type === "multi-choice" && question.choices) {
    answerBox = <MultiChoiceAnswerBox choices={question.choices} index={index} />
  } else if (question.type === "short") {
    answerBox = <ShortAnswerBox index={index} />
  } else if (question.type === "multi-short") {
    answerBox = <MultiShortAnswerBox index={index} />
  } else if (question.type === "essay") {
    answerBox = <EssayAnswerBox index={index} />
  }

  return (
    <section className={`${styles["question-box"]} box-container`} key={index}>
      <h3>{index+1}. {question.title}</h3>
      {descBox}
      <form>
        {answerBox ? answerBox : null}
      </form>
    </section>
  );
}