// i know it seems dumb to build custom checkbox indtead of using input tag
// but the react-flipage will not accept inputs, only divs and buttons
import style from "./Ingredients.module.css";
import v from "./v.png";

const Ingredients = (props) => {
  const toggleCheck = (V) => {
    if (V.style.display === "none") {
      V.style.display = "block"
    } else {
      V.style.display = "none"
    }
  }

  return (
    <>
      <div className={`title ${style.title}`}>מרכיבים:</div>
      <div className={`page-text ${style["ingredients-container"]}`}>
        {props.ingredients.map((ingredient, index) => {
          return (
            <span onClick={(event)=> {toggleCheck(event.target.querySelector('img'))}} className={style["ingredient-container"]}>
              <div
                className={style.checkbox}
              >
                <img src={v} style={{display:'none'}} onClick={(event)=> {toggleCheck(event.target)}}></img>
              </div>
              <p key={index} onClick={(event)=> {toggleCheck(event.target.parentElement.querySelector('img'))}}>{ingredient}</p>
            </span>
          );
        })}
      </div>
    </>
  );
};

export default Ingredients;
