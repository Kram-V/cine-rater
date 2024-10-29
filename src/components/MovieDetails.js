import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import { useKey } from "../hooks/useKey";

const MovieDetails = ({
  selectedMovieId,
  removeSelectedMovieId,
  addWatchedMovie,
  movies,
}) => {
  const [movieDetails, setMovieDetails] = useState({});
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { KEY } = useKey();

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieDetails;

  const handleAddWatchedList = () => {
    const newWatchedMovie = {
      imdbID: selectedMovieId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating) || 0,
      runtime: Number(runtime.split(" ").at(0)) || 0,
      userRating: Number(userRating) || 0,
    };

    addWatchedMovie(newWatchedMovie);
    removeSelectedMovieId();
  };

  const getMovieDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovieId}`
      );

      setMovieDetails(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedMovieId, KEY]);

  useEffect(() => {
    getMovieDetails();
  }, [getMovieDetails]);

  useEffect(() => {
    if (movies.length === 0) removeSelectedMovieId();
  }, [movies, removeSelectedMovieId]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={removeSelectedMovieId}>
              &larr;
            </button>

            <img src={poster} alt={title} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={22}
                onSetRating={(rating) => setUserRating(rating)}
              />

              <button onClick={handleAddWatchedList} className="btn-add">
                + Add to watched list
              </button>
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed By: {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
