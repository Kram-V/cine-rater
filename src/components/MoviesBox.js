import MoviesList from "./MoviesList";
import Box from "./Box";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const MoviesBox = ({
  movies,
  moviesLoading,
  moviesErrorMessage,
  getSelectedMovieId,
}) => {
  return (
    <Box>
      {moviesLoading && <Loader />}
      {!moviesLoading && !moviesErrorMessage && (
        <MoviesList movies={movies} getSelectedMovieId={getSelectedMovieId} />
      )}
      {!moviesLoading && moviesErrorMessage && (
        <ErrorMessage message={moviesErrorMessage} />
      )}
    </Box>
  );
};

export default MoviesBox;
