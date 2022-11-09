import style from "./Discription.module.css";
import Rate from "./Rate/Rate";

const DiscriptionPage = (props) => {
  return (
    <>
      <span className={style["image-frame"]}>
        <img
          className={style.image}
          src={props.data.url}
          alt={props.data.name}
        ></img>
      </span>
      <span className={style["details-container"]}>
        <div className={style.title}>{props.data.name}</div>
        <div>
          <p className={style[`details-title`]}>זמן הכנה:</p>
          <p className={style.details}>{props.data.time}</p>
        </div>
        <div>
          <p className={style[`details-title`]}>הכוכבים של טלי:</p>
          <Rate number={props.number} stars={props.data.stars}></Rate>
        </div>
      </span>
    </>
  );
};

export default DiscriptionPage;
