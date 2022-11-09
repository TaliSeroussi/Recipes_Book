import React, { useRef } from "react";
import Cover from "../../components/Pages/Cover/Cover";
import TextPage from "../../components/Pages/TextPage/TextPage";
import IndexPage from "../../components/Pages/Index/IndexPage";
import DiscriptionPage from "../../components/Pages/DiscriptionPage/DiscriptionPage";
import InstructionsPage from "../../components/Pages/InstructionsPage/InstructionsPage";

import "./Book.css";
import HTMLFlipBook from "react-pageflip";

const Book = (props) => {
  const BookRef = useRef();
  const ArrComponents = {
    Cover: Cover,
    TextPage: TextPage,
    IndexPage: IndexPage,
    DiscriptionPage: DiscriptionPage,
    InstructionsPage: InstructionsPage,
  }

  // change book direction (hebrew)
  const openingPage = () => {
    BookRef.current.pageFlip().turnToPage(BookRef.current.pageFlip().getPageCount() - 1);
    setTimeout(() => {
      BookRef.current.pageFlip().flipPrev();
      NewRecipeDisplay("-1");
    }, 700);
  };

  const closingPage = (event) => {
    if (BookRef.current.pageFlip().getPageCount() - 1 === event.data) {
      NewRecipeDisplay("1");
    }
  };

  const turnToPage = (page) => {
    BookRef.current.pageFlip().flip(BookRef.current.pageFlip().getPageCount() - page, 'top');
  }

  // the note on which users write new recipes needs to be under the notebook when it is open, 
  // but on top when it is closed so users will be able to click it.
  const NewRecipeDisplay = (zIndex) => {
    document.getElementById("newRecipe").style.zIndex = zIndex;
  }

  console.log("re-evaluated!");
  return (
    <HTMLFlipBook
      ref={BookRef}
      className="flip-book"
      width={315}
      height={400}
      showCover={true}
      size={"stretch"}
      maxWidth={500}
      maxHeight={400}
      maxShadowOpacity={0.5}
      onInit={openingPage}
      onFlip={closingPage}
      disableFlipByClick={true}
    >
      {props.BookPages.slice(0).reverse().map((Page, index) => {
          const BookPage = ArrComponents[Page.component];
          return <div><BookPage number={props.BookPages.length-index-3} data={Page} turnToPage={turnToPage}></BookPage></div>
        })}
    </HTMLFlipBook>
  );
};

export default Book;
