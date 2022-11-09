import storage from "../firebaseConfig";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import React, { useState, useCallback, useEffect } from "react";

const Image = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [error, setError] = useState(null);
const [url, setUrl] = useState(null);
  const fetchRecipesHandler = useCallback(async () => {
    // setError(null);
    const storage = getStorage();
    getDownloadURL(ref(storage, "soop.jpg"))
      .then((url) => {
        setUrl(url);
      })
      .catch((error) => {
        // setError("something went wrong!");
      });
  }, []);

  fetchRecipesHandler();
   
  return (<img src={url}></img>)
};

export default Image;
