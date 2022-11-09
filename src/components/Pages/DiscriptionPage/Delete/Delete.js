import { useState, useContext } from "react";
import useFetch from "../../../../hooks/useFetch";
import BookContext from "../../../../context/Context";
import trashCan from "./delete.png";
import style from "./Delete.module.css";

const Delete = (props) => {
  const BookPages = useContext(BookContext);
  let newBook = BookPages.ArrPages.concat([]);
  const [deleteTab, setDeleteTab] = useState(false);
  const [showText, setshowText] = useState(false);
  const toggleTab = () => {
    setDeleteTab(!deleteTab);
    setTimeout(() => {
      setshowText(!deleteTab);
    }, 600);
  };
  const [isLoading, error, deleteRecipe] = useFetch("DELETE", toggleTab);

  const eraseRecipe = async () => {
    newBook.splice(props.number + 2, 2);
    await deleteRecipe(
      `https://recipes-book-1a026-default-rtdb.firebaseio.com/pages/${props.type}/${props.data.key}.json`
    );
    await deleteRecipe(
      `https://recipes-book-1a026-default-rtdb.firebaseio.com/pages/${
        props.type
      }/${BookPages.ArrPages[props.number + 3].key}.json`
    );
    BookPages.setArrPages(newBook);
  };

  return (
    <>
      {deleteTab ? (
        <>
          {showText ? <div className={style.stick}></div> : null}
          <div className={style["delete-tab"]}>
            {showText ? (
              <>
                <p>למחוק את המתכון?</p>
                <button className={style.yes} onClick={eraseRecipe}>כן</button>
                <button className={style.no} onClick={toggleTab}>לא</button>
              </>
            ) : null}
          </div>
        </>
      ) : (
        <img
          className={style["trash-can"]}
          onClick={toggleTab}
          src={trashCan}
        ></img>
      )}
    </>
  );
};

export default Delete;
