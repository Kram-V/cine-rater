import Box from "./Box";
import ErrorMessage from "./ErrorMessage";

export default function ListOfMovies({
  movies,
  areMoviesLoading,
  errorMessage,
  handleSelectMovie,
}) {
  const handleGetID = (id) => {
    handleSelectMovie(id);
  };
  return (
    <Box>
      {areMoviesLoading ? (
        <p className="loader">Loading...</p>
      ) : !areMoviesLoading && errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <ul className="list list-movies">
          {movies?.map((movie) => (
            <li
              role="button"
              key={movie.imdbID}
              onClick={() => handleGetID(movie.imdbID)}
            >
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
              <h3>{movie.Title}</h3>
              <div>
                <p>
                  <span>🗓</span>
                  <span>{movie.Year}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
}
