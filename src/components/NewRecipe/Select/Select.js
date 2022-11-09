import useInput from "../../../hooks/UseInput";
import style from "./Select.module.css";

const Select = ({ id, values, label, validation }) => {
  const [inputProps, inputStates] = useInput(validation, "option");

  return (
    <div className={style.container}>
      <label>{label}</label>
      <select id={id} className={style.select} name={id} {...inputProps}>
        {values.map((value, index) => {
          return (
            <option className={style.option} value={value} key={index}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
