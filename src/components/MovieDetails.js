import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { useKey } from "../customHooks/useKey";

const KEY = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;

export default function MovieDetails({
  handleCloseMovieDetails,
  handleAddWatchedMovie,
  selectedId,
  setSelectedId,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

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
  } = movie;

  console.log("MOVIE DETAILS COMPONENT: ", imdbRating);

  const getRating = (rating) => {
    setUserRating(rating);
  };

  const handleAdd = () => {
    const thereIsDuplicate = watched.some(
      (movie) => movie.imdbID === selectedId
    );

    if (thereIsDuplicate) {
      return alert("You have already rated this movie!");
    }

    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: imdbRating === "N/A" ? 0 : +imdbRating,
      runtime: +runtime.split(" ").at(0),
      userRating,
    };

    handleAddWatchedMovie(newWatchedMovie);
    setSelectedId(null);
  };

  useEffect(() => {
    document.title = `Movie | ${title}`;

    return function () {
      document.title = "Cine Rater";
    };
  }, [title]);

  // CUSTOM HOOK
  useKey(handleCloseMovieDetails, "Escape");

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(`${baseUrl}?apikey=${KEY}&i=${selectedId}`);

        const result = await res.json();

        setMovie(result);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }

    getMovieDetails();
  }, [selectedId]);

  return (
    <div className="details">
      {isLoading ? (
        <p className="loader">Loading...</p>
      ) : (
        <>
          <header>
            <button onClick={handleCloseMovieDetails} className="btn-back">
              Back
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
              <StarRating maxRating={10} size={22} getRating={getRating} />
              <button className="btn-add" onClick={handleAdd}>
                Add to list
              </button>
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Staring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
