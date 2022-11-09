import { useState } from "react";
import DynamicInput from "./DynamicInput";
import style from "./DynamicInputGenerator.module.css"

const DynamicInputGenerator = ({ id, label, pushInputs, ...remainingProps }) => {
  const [InputsNum, setInputsNum] = useState(0);

  let inputs = [];
  for (let num = 1; num <= InputsNum; num++) {
        inputs.push(<DynamicInput autoFocus id={id+num} name={id+num} {...remainingProps} onRemove={()=>{setInputsNum(InputsNum - 1)}}></DynamicInput>);
  }

  const addInputHandler = () => {
    setInputsNum(InputsNum + 1);
  };

  if (InputsNum > 0) {
    pushInputs({ id, type:"dynamic", IsValid: true });
  } else {
    pushInputs({ id, IsValid: false });
  }

  return (
    <div id={id}>
      <label>{label}</label>
      <div className={style.container}>
      {inputs}
      </div>
      <div className={`${style['plus-button']} purple`} onClick={addInputHandler}>+</div>
    </div>
  );
};

export default DynamicInputGenerator;