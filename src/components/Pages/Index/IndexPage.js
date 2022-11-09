import React, { useContext } from "react";
import "../Page.css";
import style from"./IndexPage.module.css";
import BookContext from "../../../context/Context";

const IndexPage = React.forwardRef((props, ref) => {
  const BookPages = useContext(BookContext);
  const Index = BookPages.ArrPages.slice(3, -1).filter(
    (page, index) => index % 2 === 0
  );
  return (
    <div id={`page-${props.number}`} className="page" ref={ref}>
      <div className="page-content">
        <div className={"title"}>תוכן עניינים</div>
        <div className="page-text">
        {Index.map((page, index) => {
          if (index === 0 || Index[index - 1].type !== page.type) {
            return (
              <>
                <div className={`purple ${style["sub-title"]}`}>{BookPages.ArrTypesHebrew[page.type - 1]}</div>
                <div key={index} onClick={props.turnToPage.bind(null, index*2 + 4)} className={style.recipe}>{page.name}</div>
              </>
            );
          } else {
            return <div key={index} onClick={props.turnToPage.bind(null, index*2 + 4)} className={style.recipe}>{page.name}</div>
          }
        })}
      </div>
      </div>
    </div>
  );
});

export default IndexPage;
