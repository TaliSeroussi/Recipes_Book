import React from "react";
import "../Page.css";
import style from "./TextPage.module.css";

const TextPage = React.forwardRef((props, ref) => {
    return (
        <div id={`page-${props.number}`} className={`page ${style.firstPage}`} ref={ref}>
            <div className="page-content">
                <div className={`page-text ${style.text}`}>כהמשך לספר "זוכרת איזה טעים היה??", חיברה הכותבת מרב דניאל זיו את יצירתה החדשה- "מתכונים לטלי".<br></br>ספר זה מכיל את כל המתכונים למאכלים של מרב, בתוספת "דירוג הכוכבים של טלי".</div>
                <div className={style.note}>תהנו כמו טלי, ואל תשכחו לספר לחברים איזה טעים היה!</div>
            </div>
        </div>
    );
});

export default TextPage;