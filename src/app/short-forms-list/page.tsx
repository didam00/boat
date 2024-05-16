import ShortForm from "@/components/ShortForm";
import styles from "./page.module.scss";
import Filter from "@/components/Filter";

export default function ShortFormsList() {
  let shortForms: JSX.Element[] = [];
  for (let i = 1; i <= 16; i++) {
    shortForms.push(
      <ShortForm
        key={`short_form-${i}`}
        title={`타이틀 제목 ${i}`}
        desc="쇼트 폼(설문)에 대한 설명을 상세히 적습니다. 이미지를 포함해도 됩니다."
      />
    );
  }

  return (
    <main>
      <div className={`m__size ${styles["top-container"]}`} style={{display: "flex"}}>
        <section className={` ${styles["form-list-container"]}`}>
          <h2 className="page_title">쇼트 폼 목록</h2>
          <div className={styles["forms-list-container"]}>
            {shortForms}
          </div>
        </section>
        <Filter />
      </div>
    </main>
  )
}