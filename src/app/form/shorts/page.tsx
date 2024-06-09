import ShortForm from "@/components/ShortForm";
import styles from "./page.module.scss";
import Filter from "@/components/Filter";
import LineNotice from "@/components/LineNotice";

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
      <div className={`m__size ${styles["top-container"]}`}>
        <LineNotice text="쇼트 폼은 아직 지원하지 않습니다. 추후 업데이트를 기다려주세요!" />
        <div className={styles["top-flex-container"]}>
          <section className='left-container'>
            <div className={`${styles["flex-container"]}`}>
              <h2 className="page_title">쇼트 폼 목록</h2>
              <div className={styles["forms-list-container"]}>
                {shortForms}
              </div>
            </div>
          </section>
          <Filter />
        </div>
      </div>
    </main>
  )
}