import { useEffect } from "react";
import useInput from "../../hooks/UseInput";
import style from "./Input.module.css";

const Input = ({id, label, pushInputs, validation, err, type, onRemove, ...remainingProps}) => {
  const [inputProps, inputStates] = useInput(validation, type);
  useEffect(() => {
    pushInputs({ id, ...inputStates });
  }, [inputStates]);

  return (
    <div className={style.container}>
      <label htmlFor={id}>{label}</label>
      <input
        className={
          inputStates.hasError
            ? `${style.input} ${style.invalid}`
            : `${style.input}`
        }
        {...inputProps}
        name={id}
        id={id}
        type={type}
        {...remainingProps}
      ></input>
      {inputStates.hasError && <p>{err}</p>}
    </div>
  );
};

export default Input;
