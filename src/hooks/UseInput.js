import { useState } from "react";

const useInput = (validation, type) => {
  const [value, setvalue] = useState("");
  const [valueTouched, setTouched] = useState(false);

  let IsValid = true;
  if (validation !== undefined) {
    IsValid = validation(value);
  }
  const hasError = !IsValid && valueTouched;

  const onChange = (event) => {
    setvalue(event.target.value);
  };

  const onBlur = () => {
    if (type !== "file") {
      setTouched(true);
    }
  };

  const reset = () => {
    setvalue('');
    setTouched(false);
  };

  return [
    { value, onChange, onBlur },
    { IsValid, hasError, reset },
  ];
};

export default useInput;
