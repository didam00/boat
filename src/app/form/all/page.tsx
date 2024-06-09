import styles from "./page.module.scss";
import Filter from "@/components/Filter";
import FormRow from "@/components/FormRow";
import axios from "axios";

// for (let i = 1; i <= 50; i++) {
//   shortForms.push(
//     <FormRow
//       key={`form_row-${i}`}
//       title={`타이틀 제목 ${i}`}
//       category="프로그래밍"
//       participants={Math.floor(Math.random() * 200)}
//       isShort={Math.random() < 0.25}
//     />
//   );
// }

interface FormListData {
  _id: string;
  title: string;
  category: string[];
  views: number;
  votes: number;
  isShortForm: boolean;
  author: string;
}

export default async function AllFormsList() {
  let shortForms: React.ReactNode[] = [];

  try {
    const getList = async () => {
      const res = await axios.get("/api/form/getList");
    }

    getList();

    // shortForms = list.map((data: FormListData) => (
    //   <FormRow
    //     key={data._id}
    //     title={data.title}
    //     category={data.category[0]}
    //     participants={data.votes}
    //     isShort={data.isShortForm}
    //   />
    // ))
  } catch (error: any) {
    console.log(error);
  }

  return (
    <main>
      <div className={`m__size ${styles["top-container"]}`} style={{display: "flex"}}>
        <div className="left-container">
          <section className={`${styles['flex-container']}`}>
            <h2 className="page_title">모든 설문 목록</h2>
            <div className={styles["forms-table-container"]}>
              <table className={styles["forms-table"]}>
                <tbody>
                  <tr className={styles["table-header"]}>
                    <th>제목</th>
                    <th>카테고리</th>
                    <th>참여수</th>
                  </tr>
                  {shortForms}
                </tbody>
              </table>
            </div>
          </section>
        </div>
        <Filter isShortFormTab={true}/>
      </div>
    </main>
  )
}