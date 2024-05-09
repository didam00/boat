import styles from "./styles.module.scss";

const category_list: {
  id: string,
  label: string,
}[] = [
  {
    id: "programming",
    label: "프로그래밍"
  },
  {
    id: "design",
    label: "디자인"
  },
  {
    id: "daily",
    label: "일상"
  },
  {
    id: "study",
    label: "공부"
  }
];

export default function Filter() {
  let category_elements = category_list.map((o, i) => 
    <div className={styles["checkbox-container"]} key={i}>
      <input type="checkbox" name="select-category" id={o.id}/>
      <label htmlFor={o.id}><span>{o.label}</span></label>
    </div>
  );

  return (
    <section className={styles["filter-container"]}>
    <h3 className="container-title">필터</h3>
    <SearchArea />
    <div className={`${styles["category-filter-container"]} box-container`}>
      <h3 className="container-title" style={{
        marginTop: "0px"
      }}>카테고리</h3>
      {category_elements}
    </div>
  </section>
  )
}

function SearchArea() {
  return (
    <input
      className={`box-container ${styles["search-area"]}`}
      placeholder="검색어"
      type="text"
      required
    />
  )
}