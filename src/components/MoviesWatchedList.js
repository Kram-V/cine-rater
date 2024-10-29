import React from "react";
import MoviesWatchedListItem from "./MoviesWatchedListItem";

const MoviesWatchedList = ({ watched, removeWatchedMovie }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <MoviesWatchedListItem
          key={movie.imdbID}
          movie={movie}
          removeWatchedMovie={removeWatchedMovie}
        />
      ))}
    </ul>
  );
};

export default MoviesWatchedList;
