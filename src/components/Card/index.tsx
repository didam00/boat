import styles from "./styles.module.scss";

export default function Card({
  title,
  highlight,
  contents,
}: {
  title: string
  highlight?: string
  contents: {
    title: string,
    category: string,
    respondents: number
  }[]
}) {
  const rows = contents.map((c, i) => (
    <Row
      title={c.title}
      category={c.category}
      respondents={c.respondents}
      key={i}
    />));

  return (
    <article className={`${[styles.container]} box-container`}>
      <h3 className={styles.title}>
        {title} <span className="subcolor-text">{highlight}</span>
      </h3>
      <div className={styles["forms-list"]}>
        {rows}
      </div>
    </article>
  )
}

function Row({
  title,
  category,
  respondents
}: {
  title: string,
  category: string,
  respondents: number
}) {
  return (
    <div className={styles["row"]} style={{
      display: "flex",
    }}>
      <span className={styles["row-title"]}>{title}</span>
      <span className={styles["row-category"]}>{category}</span>
      <span className={styles["row-respondents"]}>{respondents}명이 참여</span>
    </div>
  )
}