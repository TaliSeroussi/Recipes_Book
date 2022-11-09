import style from "./Rate.module.css";
import "./Star.css";

const Rate = ({ number, stars }) => {
  let ArrStars = [];
  for (let star = 1; star <= 5; star++) {
    ArrStars.push(
      <div className={`star star-${star}`}>
        <div className="fill"></div>
      </div>
    );
    // star animation
    if (star <= Math.floor(stars)) {
      document.querySelector(`#stars-animation`).appendChild(
        document.createTextNode(`#page-${number} .star-${star} .fill::after {
                animation: fill 1s ease-in-out forwards; 
                animation-delay: ${star / 2}s;}`)
      );
    } else if (!Number.isInteger(stars)) {
      if (star === Math.ceil(stars)) {
        document.querySelector(`#stars-animation`).appendChild(
          document.createTextNode(`#page-${number} .star-${star} .fill::after {
                animation: halfFill${star} 1s ease-in-out forwards; 
                animation-delay: ${star / 2}s;}
                @keyframes halfFill${star} {
                  0% {
                    transform: translateX(-100%);
                    background-color: rgba(195, 180, 230);
                  }
                  100% {
                    transform: translateX(${-(100 - (stars % 1) * 100)}%);
                    background-color: rgb(117, 101, 165);
                  }
                }`)
        );
      }
    }
  }

  return (
    <div className={style["stars-container"]}>
      {ArrStars.map((star, index) => {
        return star;
      })}
    </div>
  );
};

export default Rate;
