import styles from "./page.module.scss";

import LineNotice from "../components/LineNotice";
import Card from "@/components/Card";

const interrestedForms: {
  title: string,
  category: string,
  respondents: number
}[] = [
  {
    title: "프로그래밍 주제 설문 1",
    category: "프로그래밍",
    respondents: 144,
  },
  {
    title: "프로그래밍 주제 설문 2",
    category: "프로그래밍",
    respondents: 121,
  },
  {
    title: "프로그래밍 주제 설문 3",
    category: "프로그래밍",
    respondents: 100,
  },
  {
    title: "프로그래밍 주제 설문 4",
    category: "프로그래밍",
    respondents: 81,
  },
  {
    title: "프로그래밍 주제 설문 5",
    category: "프로그래밍",
    respondents: 64,
  },
]

export default async function Main() {
  let interestedSubject = "프로그래밍";

  return (
    <main>
      <section className="m__size card-group-container">
      <LineNotice text="쇼트 폼은 아직 지원하지 않습니다. 추후 업데이트를 기다려주세요!" />
        <div className="card-group-row">
          <Card
            title="회원님이 관심있을 설문" highlight={interestedSubject}
            contents={interrestedForms}
            />
          <Card
            title="최근 올라온 설문"
            contents={interrestedForms}
          />
        </div>
      </section>
    </main>
  );
}