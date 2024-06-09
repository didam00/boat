import styles from "./styles.module.scss";

export default function ChoiceAnswerBox({
  choices,
  index,
  editable = false,
  question,
  updateQuestion
}: {
  choices: ContentType[];
  index: number;
  editable?: boolean;
  question?: Question;
  updateQuestion?: (index: number, updatedQuestion?: Question) => void;
}) {
  const choicesMapping: JSX.Element[] = choices.map((choice, i) => 
    <div className={`radio-container ${editable ? styles["editable"] : ""}`} key={`choice-${index}-${i}`}>
      <input type="radio" name={"choices-"+(index)} id={`choice-${index}-${i}`} />
      <label htmlFor={`choice-${index}-${i}`}>
        {
          editable?
            <input
              type="text"
              className={`clean ${styles["choices"]}`}
              placeholder="선택지 항목을 입력하세요"
              onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                if (updateQuestion && question && choices) {
                  let newChoices = [...choices];
                  newChoices.splice(i, 1, {
                    type: "txt",
                    data: event.target.value
                  });
                  console.log(newChoices);
                  updateQuestion(index, {...question, choices: newChoices})
                }
              }}
              defaultValue={choice.data}
            />
          :
            <span>{choice.data}</span>
        }
      </label>
    </div>
  );

  return (
    <div className={`answer-box ${styles["choice-answer"]}`}>
      {choicesMapping}
      {
        editable?
          <button
            onClick={(event) => {
              event.preventDefault();

              if (updateQuestion && question && question.choices) {
                updateQuestion(index, {
                  ...question, choices: [...choices, {type: "txt", data: ""}]
                });
              }
            }}
          >선택지 추가</button>
        :
          null
      }
    </div>
  )
}