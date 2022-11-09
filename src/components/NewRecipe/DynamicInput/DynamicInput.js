import { useState, useEffect } from "react";
import useInput from "../../../hooks/UseInput";
import style from "../Input.module.css";

const DynamicInput = ({ id, type, label, pushInputs, validation, onRemove, ...remainingProps }) => {
  const [inputProps, inputStates] = useInput(validation, "dynamic");
  if (inputStates.hasError) {
    onRemove();
  }

  return (
    <>
      {!inputStates.hasError && (
        <input
          className={style.input}
          {...inputProps}
          id={id}
          type={type}
          {...remainingProps}
        ></input>
      )}
    </>
  );
};

export default DynamicInput;
