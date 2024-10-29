import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useKey } from "./useKey";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [moviesErrorMessage, setMoviesErrorMessage] = useState("");

  const { KEY } = useKey();

  const getMovies = useCallback(async () => {
    try {
      setMoviesLoading(true);
      setMoviesErrorMessage("");
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=${KEY}&s=${debouncedQuery}`
      );

      if (response.data.Error) throw new Error(response.data.Error);

      setMovies(response.data.Search);
    } catch (error) {
      if (error.message === "Incorrect IMDb ID.") {
        setMoviesErrorMessage("Search to see the list of movies");
        setMovies([]);
      } else {
        setMoviesErrorMessage(error.message);
        setMovies([]);
      }
    } finally {
      setMoviesLoading(false);
    }
  }, [debouncedQuery, KEY]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery || !debouncedQuery) {
      getMovies();
    }
  }, [debouncedQuery, getMovies]);

  return {
    movies,
    moviesLoading,
    moviesErrorMessage,
  };
}
