import Logo from "./Logo";
import NumResults from "./NumResults";
import Search from "./Search";

const Navbar = ({ movies, setQuery, query }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search setQuery={setQuery} query={query} />
      <NumResults movies={movies} />
    </nav>
  );
};

export default Navbar;
