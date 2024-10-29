import React from "react";
import MoviesListItem from "./MoviesListItem";

const MoviesList = ({ movies, getSelectedMovieId }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MoviesListItem
          key={movie.imdbID}
          movie={movie}
          getSelectedMovieId={getSelectedMovieId}
        />
      ))}
    </ul>
  );
};

export default MoviesList;
