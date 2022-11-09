import React from "react";
import "../Page.css";
import style from "./Instructions.module.css";

const InstructionsPage = React.forwardRef((props, ref) => {
  return (
    <div id={`page-${props.number}`} className="page" ref={ref}>
      <div className="page-content">
        <div className={`title ${style.title}`}>הוראות הכנה:</div>
        <div className={`page-text ${style.instructions}`}>
          {props.data.instructions.map((instruction, index) => {
            return (
                <div><span className="purple">{index + 1}</span>. {instruction}</div>
            );
          })}
        </div>
        <div className="page-footer">
          <div>{props.number}</div>
        </div>
      </div>
    </div>
  );
});

export default InstructionsPage;
