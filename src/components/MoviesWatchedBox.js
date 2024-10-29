import MoviesWatchedList from "./MoviesWatchedList";
import MoviesWatchedSummary from "./MoviesWatchedSummary";
import Box from "./Box";
import MovieDetails from "./MovieDetails";

const MoviesWatched = ({
  movies,
  watched,
  avgImdbRating,
  avgUserRating,
  avgRuntime,
  selectedMovieId,
  removeSelectedMovieId,
  addWatchedMovie,
  removeWatchedMovie,
}) => {
  return (
    <Box>
      {selectedMovieId ? (
        <MovieDetails
          selectedMovieId={selectedMovieId}
          removeSelectedMovieId={removeSelectedMovieId}
          addWatchedMovie={addWatchedMovie}
          movies={movies}
        />
      ) : (
        <>
          <MoviesWatchedSummary
            watched={watched}
            avgImdbRating={avgImdbRating}
            avgUserRating={avgUserRating}
            avgRuntime={avgRuntime}
          />
          <MoviesWatchedList
            watched={watched}
            removeWatchedMovie={removeWatchedMovie}
          />
        </>
      )}
    </Box>
  );
};

export default MoviesWatched;
