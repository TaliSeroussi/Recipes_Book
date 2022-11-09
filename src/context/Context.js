import React, { useState, useCallback } from "react";
import useFetch from "../hooks/useFetch";

const BookContext = React.createContext({
  ArrPages: [],
  ArrTypes: [],
  ArrTypesHebrew: [],
  setArrPages: (fetchedPages) => {},
  postPageHandler: (page) => {},
});

export const BookContextProvider = (props) => {
  const [ArrPages, setArrPages] = useState([]);
  const ArrTypes = ["opening", "starters", "meals", "desserts", "ending"];
  const ArrTypesHebrew = ["ראשונות", "עיקריות", "קינוחים"];
  let newBook = ArrPages.concat([]);
  
  const addPageHandler = (data, newPage, index) => {
    newBook.splice(index, 0, {...newPage, key: data.name});
    if (newPage.component === "InstructionsPage") {
      setArrPages(newBook);
    }
  };
  
  const [isLoading, error, fetchRecipes] = useFetch("POST", addPageHandler);

  const postPageHandler = (newRecipe) => {
    // newRecipe[0] = new discription page
    // newRecipe[1] = new instructions page
    let index = ArrPages.findIndex(page => {
      return page.type === newRecipe[0].type;
    });
    const filteredByType = ArrPages.filter(page => {
      return page.type === newRecipe[0].type;
    });

    index = index + filteredByType.length * 2;

    async function Post() {
      await fetchRecipes(`https://recipes-book-1a026-default-rtdb.firebaseio.com/pages/${ArrTypes[newRecipe[0].type]}.json`, newRecipe[0], index);
      fetchRecipes(`https://recipes-book-1a026-default-rtdb.firebaseio.com/pages/${ArrTypes[newRecipe[0].type]}.json`, newRecipe[1], index + 1);
    }

    Post();
  };


  return (
    <BookContext.Provider
      value={{
        ArrPages,
        ArrTypes,
        ArrTypesHebrew,
        setArrPages,
        postPageHandler
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookContext;
