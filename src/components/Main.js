import React from "react";
import MoviesBox from "./MoviesBox";
import MoviesWatchedBox from "./MoviesWatchedBox";

const Main = ({
  movies,
  watched,
  avgImdbRating,
  avgUserRating,
  avgRuntime,
  moviesLoading,
  moviesErrorMessage,
  selectedMovieId,
  getSelectedMovieId,
  removeSelectedMovieId,
  addWatchedMovie,
  removeWatchedMovie,
}) => {
  return (
    <div style={{ position: "relative" }}>
      <img
        src="logo512.png"
        alt="React Logo"
        style={{
          position: "absolute",
          animation: "spin 5s linear infinite",
          top: 5,
          left: 5,
          width: "140px",
        }}
      />

      <img
        src="logo512.png"
        alt="React Logo"
        style={{
          position: "absolute",
          animation: "spin 5s linear infinite",
          bottom: 5,
          left: 5,
          width: "140px",
        }}
      />

      <div className="main">
        <MoviesBox
          moviesLoading={moviesLoading}
          movies={movies}
          moviesErrorMessage={moviesErrorMessage}
          getSelectedMovieId={getSelectedMovieId}
        />

        <MoviesWatchedBox
          movies={movies}
          watched={watched}
          avgImdbRating={avgImdbRating}
          avgUserRating={avgUserRating}
          avgRuntime={avgRuntime}
          selectedMovieId={selectedMovieId}
          removeSelectedMovieId={removeSelectedMovieId}
          addWatchedMovie={addWatchedMovie}
          removeWatchedMovie={removeWatchedMovie}
        />
      </div>

      <img
        src="logo512.png"
        alt="React Logo"
        style={{
          position: "absolute",
          animation: "spin 5s linear infinite",
          width: "140px",
          right: 5,
          top: 5,
        }}
      />

      <img
        src="logo512.png"
        alt="React Logo"
        style={{
          position: "absolute",
          animation: "spin 5s linear infinite",
          width: "140px",
          right: 5,
          bottom: 5,
        }}
      />
    </div>
  );
};

export default Main;
