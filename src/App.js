import Book from "./components/Book/Book";
import NewRecipe from "./components/NewRecipe/NewRecipe";
import React, { useCallback, useContext, useEffect } from "react";
import BookContext from "./context/Context";
import useFetch from "./hooks/useFetch"

const App = () => {
  const BookPages = useContext(BookContext);
  const getBookHandler = useCallback(async (data) => {
    const loadedRecipes = [];
    BookPages.ArrTypes.map((Type) => {
      for (const Recipe in data[Type]) {
        loadedRecipes.push({
          key: Recipe, ...data[Type][Recipe] 
      });
      }
    });
    BookPages.setArrPages(loadedRecipes);
  }, []);
  const [isLoading, error, fetchRecipes] = useFetch("GET", getBookHandler);

  useEffect(() => {
    fetchRecipes("https://recipes-book-1a026-default-rtdb.firebaseio.com/pages.json");
  }, [fetchRecipes]);

  let content = <Book BookPages={BookPages.ArrPages}></Book>;

  if (error) {
    content = <><p className="loading-content purple">אוי לא! משהו השתבש באחד השלבים...</p><button onClick={fetchRecipes}>נסו שוב</button></>;
  }

  if (isLoading) {
    content = <p className="loading-content purple">חכו רגע! משהו מתבשל כאן...</p>;
  }
  
  return (
    <>
      {content}
      <NewRecipe></NewRecipe>
      <div id="marker"></div>
      <div id="pen"></div>
    </>
  );
};

export default App;
