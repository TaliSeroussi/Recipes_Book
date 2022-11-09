import React, {useContext} from "react";
import style from "./DiscriptionPage.module.css";
import "../Page.css";
import Discription from "./Discription/Discription";
import Ingredients from "./Ingredients/Ingredients";
import BookContext from "../../../context/Context";
import Delete from "./Delete/Delete";

const DiscriptionPage = React.forwardRef((props, ref) => {
  const BookPages = useContext(BookContext);
  return (
    <div id={`page-${props.number}`} className="page" ref={ref}>
      <div className="page-content">
        <div className={style.type}>{BookPages.ArrTypesHebrew[props.data.type-1]}</div>
        <Delete number={props.number} data={props.data} type={BookPages.ArrTypes[props.data.type]}></Delete>
        <Discription number={props.number} data={props.data}></Discription>
        <div className={style.buffer}></div>
        <Ingredients ingredients={props.data.ingredients}></Ingredients>
        <div className="page-footer"><div>{props.number}</div></div>
      </div>
    </div>
  );
});

export default DiscriptionPage;
