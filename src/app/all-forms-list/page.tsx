import styles from "./page.module.scss";
import Filter from "@/components/Filter";
import FormRow from "@/components/FormRow";

let shortForms: JSX.Element[] = [];
for (let i = 1; i <= 50; i++) {
  shortForms.push(
    <FormRow
      key={`form_row-${i}`}
      title={`타이틀 제목 ${i}`}
      category="프로그래밍"
      participants={Math.floor(Math.random() * 200)}
    />
  );
}

export default function AllFormsList() {
  return (
    <main>
      <div className={`m__size ${styles["top-container"]}`} style={{display: "flex"}}>
        <section className={` ${styles["form-list-container"]}`}>
          <h2 className="page_title">모든 설문 목록</h2>
          <div className={styles["forms-list-container"]}>
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
        <Filter isShortFormTab={true}/>
      </div>
    </main>
  )
}