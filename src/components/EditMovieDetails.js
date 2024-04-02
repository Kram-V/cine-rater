import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { useKey } from "../customHooks/useKey";

const KEY = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;

export default function MovieDetails({
  selectedId,
  setSelectedId,
  setIsEdit,
  editUserRating,
  handleCloseEditMovieDetails,
  handleEditMovie,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(
    editUserRating ? editUserRating : 0
  );

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const handleEditCurrentMovie = () => {
    handleEditMovie(selectedId, userRating);

    setSelectedId(null);
    setIsEdit(false);
  };

  const getRating = (rating) => {
    setUserRating(rating);
  };

  // CUSTOM HOOK
  useKey(handleCloseEditMovieDetails, "Escape");

  useEffect(() => {
    document.title = `Movie | ${title}`;

    return function () {
      document.title = "usePopcorn";
    };
  }, [title]);

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
            <button onClick={handleCloseEditMovieDetails} className="btn-back">
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
              <StarRating
                maxRating={10}
                size={22}
                getRating={getRating}
                userRating={userRating}
              />
              <button className="btn-add" onClick={handleEditCurrentMovie}>
                Update to list
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
