import styles from "./styles.module.scss";

export default function ChoiceAnswerBox({
  choices,
  index
}: {
  choices: ContentType[],
  index: number
}) {
  const choicesMapping: JSX.Element[] = choices.map((choice, i) => 
    <div className="radio-container" key={`choice-${index}-${i}`}>
      <input type="radio" name={"choices-"+(index)} id={`choice-${index}-${i}`} />
      <label htmlFor={`choice-${index}-${i}`}><span>{choice.data}</span></label>
    </div>
  );

  return (
    <div className={`answer-box ${styles["choice-answer"]}`}>
      {choicesMapping}
    </div>
  )
}