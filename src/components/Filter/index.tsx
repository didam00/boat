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
    id: "technology",
    label: "기술"
  },
  {
    id: "business",
    label: "비즈니스"
  },
  {
    id: "education",
    label: "교육"
  },
  {
    id: "health",
    label: "건강"
  },
  {
    id: "food",
    label: "음식"
  },
  {
    id: "science",
    label: "과학"
  },
  {
    id: "music",
    label: "음악"
  },
  {
    id: "history",
    label: "역사"
  },
  {
    id: "language",
    label: "언어"
  },
  {
    id: "literature",
    label: "문학"
  },
  {
    id: "film",
    label: "영화"
  },
  {
    id: "other",
    label: "기타"
  }
];

let category_elements = category_list.map((o, i) => 
  <div className="checkbox-container" key={i}>
    <input type="checkbox" name="select-category" id={o.id}/>
    <label htmlFor={o.id}><span>{o.label}</span></label>
  </div>
);

export default function Filter({
  isShortFormTab = false
}: {
  isShortFormTab?: boolean
}) {
  return (
    <section className={styles["filter-container"]}>
      <h3 className="container-title" style={{
        marginTop: "4rem"
      }}>필터</h3>
      <div className={styles["filter-list"]}>
        <SearchArea />
        {isShortFormTab && <ShortFormOptionArea />}
        <CategoryArea />
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

function ShortFormOptionArea() {
  return (
    <div className={`box-container`}>
      <h3 className="container-title" style={{
        marginTop: 0
      }}>세부 설정</h3>
      <div className="checkbox-container" style={{
        margin: 0
      }}>
        <input type="checkbox" name="select-include-shorts" id="select-include-shorts" />
        <label htmlFor="select-include-shorts"><span>쇼트 폼은 검색 결과에 미포함</span></label>
      </div>
    </div>
  )
}

function CategoryArea() {
  return (
    <div className={`${styles["category-filter-container"]} box-container`}>
      <h3 className="container-title" style={{
        marginTop: "0px"
      }}>카테고리</h3>
      {category_elements}
    </div>
  )
}