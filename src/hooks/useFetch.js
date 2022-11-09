import { useState, useCallback } from "react";
import Cover from "../components/Pages/Cover/Cover";

const useFetch = (method, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPages = useCallback(
    async (url, newPage, index) => {
      setIsLoading(true);
      setError(null);
      let data;
      try {
        const response = await fetch(url, {
          method: method,
          body: newPage ? JSON.stringify(newPage) : null,
          headers: newPage
            ? {
                "Content-Type": "application/json",
              }
            : {},
        });

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        data = await response.json();
        applyData(data, newPage, index);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [method, applyData]
  );

  return [isLoading, error, fetchPages];
};

export default useFetch;
