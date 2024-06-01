import styles from "./styles.module.scss";

export default function MultiChoiceAnswerBox({
  choices,
  index
}: {
  choices: ContentType[],
  index: number
}) {
  const choicesMapping: JSX.Element[] = choices.map((choice, i) => 
    <div className="checkbox-container" key={`choice-${index}-${i}`}>
      <input type="checkbox" name={"choices-"+(index)} id={`choice-${index}-${i}`} />
      <label htmlFor={`choice-${index}-${i}`}><span>{choice.data}</span></label>
    </div>
  );

  return (<div className={`answer-box ${styles["multi-choice-answer"]}`}>
    {choicesMapping}
  </div>)
}