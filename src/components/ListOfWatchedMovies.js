import { useEffect, useState } from "react";
import Box from "./Box";
import MovieDetails from "./MovieDetails";
import EditMovieDetails from "./EditMovieDetails";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function ListOfWatchedMovies({
  watched,
  avgImdbRating,
  avgUserRating,
  avgRuntime,
  selectedId,
  handleCloseMovieDetails,
  handleAddWatchedMovie,
  setSelectedId,
  handleRemoveWatchedMovie,
  handleEditMovie,
  toggleForEditMovieDetails,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [editMovieSelectedId, setEditMovieSelectedId] = useState(null);
  const [editUserRating, setEditUserRating] = useState(0);

  const handleEditWatchedMovie = (selectedId, userRating) => {
    setEditMovieSelectedId(selectedId);
    setIsEdit(true);
    setEditUserRating(userRating);
  };

  const handleCloseEditMovieDetails = () => {
    setEditMovieSelectedId(null);
    setIsEdit(false);
  };

  useEffect(() => {
    handleCloseEditMovieDetails();
  }, [toggleForEditMovieDetails]);

  return (
    <Box>
      <>
        {selectedId && !isEdit ? (
          <MovieDetails
            watched={watched}
            handleAddWatchedMovie={handleAddWatchedMovie}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            handleCloseMovieDetails={handleCloseMovieDetails}
          />
        ) : editMovieSelectedId && isEdit ? (
          <EditMovieDetails
            handleEditMovie={handleEditMovie}
            handleCloseEditMovieDetails={handleCloseEditMovieDetails}
            selectedId={editMovieSelectedId}
            setSelectedId={setEditMovieSelectedId}
            setIsEdit={setIsEdit}
            editUserRating={editUserRating}
          />
        ) : (
          <>
            <div className="summary">
              <h2>Movies you watched</h2>
              <div>
                <p>
                  <span>#️⃣</span>
                  <span>{watched.length} movies</span>
                </p>
                <p>
                  <span>⭐️</span>
                  <span>{avgImdbRating.toFixed(2)}</span>
                </p>
                <p>
                  <span>🌟</span>
                  <span>{avgUserRating.toFixed(2)}</span>
                </p>
                <p>
                  <span>⏳</span>
                  <span>{Math.floor(avgRuntime)} min</span>
                </p>
              </div>
            </div>

            <ul className="list">
              {watched.map((movie) => (
                <li key={movie.imdbID}>
                  <img src={movie.poster} alt={`${movie.title} poster`} />
                  <h3>{movie.title}</h3>
                  <div>
                    <p>
                      <span>⭐️</span>
                      <span>{movie.imdbRating}</span>
                    </p>
                    <p>
                      <span>🌟</span>
                      <span>{movie.userRating}</span>
                    </p>
                    <p>
                      <span>⏳</span>
                      <span>{movie.runtime} min</span>
                    </p>

                    <button
                      data-tooltip-id="my-tooltip-1"
                      onClick={() =>
                        handleEditWatchedMovie(movie.imdbID, movie.userRating)
                      }
                      className="btn-edit"
                      style={{ marginRight: "24px" }}
                    >
                      E
                    </button>

                    <button
                      data-tooltip-id="my-tooltip-2"
                      onClick={() => handleRemoveWatchedMovie(movie.imdbID)}
                      className="btn-delete"
                    >
                      X
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <ReactTooltip id="my-tooltip-1" place="top" content="Edit Rating" />

            <ReactTooltip id="my-tooltip-2" place="top" content="Remove" />
          </>
        )}
      </>
    </Box>
  );
}
