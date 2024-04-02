import { useEffect, useState } from "react";

const KEY = "5ea5dec";

export function useMovies(query, setSelectedId) {
  const [movies, setMovies] = useState([]);
  const [areMoviesLoading, setAreMoviesLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setAreMoviesLoading(true);
        setErrorMessage("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        const result = await res.json();

        if (result.Error === "Incorrect IMDb ID.") throw new Error("No Movies");

        if (result.Response === "False") throw new Error(result.Error);

        setMovies(result.Search);
        setAreMoviesLoading(false);
      } catch (error) {
        if (error.message === "The user aborted a request.") {
          return;
        } else {
          setMovies([]);
          setErrorMessage(error.message);
          setAreMoviesLoading(false);
        }
      }
    }

    if (!query) {
      setSelectedId(null);
    }

    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query, setSelectedId]);

  return { movies, areMoviesLoading, errorMessage };
}
