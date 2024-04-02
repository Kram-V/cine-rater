import { useState } from "react";

import SearchBar from "./components/SearchBar";
import ListOfMovies from "./components/ListOfMovies";
import ListOfWatchedMovies from "./components/ListOfWatchedMovies";

import { useMovies } from "./customHooks/useMovies";
import { useLocalStorage } from "./customHooks/useLocalStorage";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");

  const [selectedId, setSelectedId] = useState(null);

  // CUSTOM HOOKS
  const { movies, areMoviesLoading, errorMessage } = useMovies(
    query,
    setSelectedId
  );

  const [watched, setWatched] = useLocalStorage("watchedMovies");

  const [toggleForEditMovieDetails, setToggleForEditMovieDetails] =
    useState(null);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  const handleCloseMovieDetails = () => {
    setSelectedId(null);
  };

  const handleSelectMovie = (id) => {
    setSelectedId((c) => (c === id ? null : id));

    setToggleForEditMovieDetails(id);
  };

  const handleAddWatchedMovie = (movie) => {
    setWatched((c) => [movie, ...c]);
  };

  const handleEditMovie = (id, userRating) => {
    setWatched((c) =>
      c.map((movie) => (movie.imdbID === id ? { ...movie, userRating } : movie))
    );

    setToggleForEditMovieDetails(null);
  };

  const handleRemoveWatchedMovie = (id) => {
    setWatched((c) => c.filter((movie) => movie.imdbID !== id));
  };

  return (
    <>
      <SearchBar setQuery={setQuery} query={query} movies={movies} />

      <main className="main">
        <ListOfMovies
          handleSelectMovie={handleSelectMovie}
          errorMessage={errorMessage}
          areMoviesLoading={areMoviesLoading}
          movies={movies}
        />

        <ListOfWatchedMovies
          toggleForEditMovieDetails={toggleForEditMovieDetails}
          handleEditMovie={handleEditMovie}
          handleRemoveWatchedMovie={handleRemoveWatchedMovie}
          setSelectedId={setSelectedId}
          handleAddWatchedMovie={handleAddWatchedMovie}
          handleCloseMovieDetails={handleCloseMovieDetails}
          selectedId={selectedId}
          watched={watched}
          avgImdbRating={avgImdbRating}
          avgUserRating={avgUserRating}
          avgRuntime={avgRuntime}
        />
      </main>
    </>
  );
}
