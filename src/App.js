import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { useEffect, useState } from "react";
import { useMovies } from "./hooks/useMovies";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [query, setQuery] = useState("");

  const { movies, moviesLoading, moviesErrorMessage } = useMovies(query);

  // const [watched, setWatched] = useState([]);

  // BAD PRACTICE
  // const [watched, setWatched] = useState(
  //   JSON.parse(localStorage.getItem("watched")) || []
  // );

  // BEST PRACTICE
  const [watched, setWatched] = useState(
    () => JSON.parse(localStorage.getItem("watched")) || []
  );

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  const getSelectedMovieId = (id) => {
    setSelectedMovieId((selectedId) => (selectedId === id ? null : id));
  };

  const removeSelectedMovieId = () => {
    setSelectedMovieId(null);
  };

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  const addWatchedMovie = (movie) => {
    const thereIsSameMovie = watched.some((m) => m.imdbID === movie.imdbID);

    if (thereIsSameMovie) {
      alert("This movie is already in your watched list");
      return;
    }

    setWatched([...watched, movie]);
  };

  const removeWatchedMovie = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );

    if (confirmDelete) {
      setWatched((movies) => movies.filter((m) => m.imdbID !== id));
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", function (e) {
      if (e.code === "Escape") {
        removeSelectedMovieId();
      }
    });
  }, []);

  return (
    <>
      <Navbar movies={movies} setQuery={setQuery} query={query} />

      <Main
        movies={movies}
        moviesErrorMessage={moviesErrorMessage}
        moviesLoading={moviesLoading}
        watched={watched}
        avgImdbRating={avgImdbRating}
        avgUserRating={avgUserRating}
        avgRuntime={avgRuntime}
        selectedMovieId={selectedMovieId}
        getSelectedMovieId={getSelectedMovieId}
        removeSelectedMovieId={removeSelectedMovieId}
        addWatchedMovie={addWatchedMovie}
        removeWatchedMovie={removeWatchedMovie}
      />
    </>
  );
}
