import React from "react";
import style from "./Cover.module.css";
import Image from "../../FetchImagesTrial";

const Cover = React.forwardRef((props, ref) => {
  return (
    <div className={`${style['page-cover']} ${style['page-cover-top']} ${style[props.data.type]}`} ref={ref} data-density="hard" onClick={()=>{document.getElementById("newRecipe").style.zIndex = "-1"}}>
      <div className={style['page-content']}>
        <div className={style.text}>{props.data.title}</div>
        <div className={style.writer}>{props.data.writer}</div>
      </div>
    </div>
  );
});

export default Cover;
