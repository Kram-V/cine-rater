import { useEffect, useRef } from "react";

export default function Navbar({ movies, query, setQuery }) {
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current?.focus();
  }, []);

  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🎦</span>
        <h1>Cine Rater</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
      <p className="num-results">
        Found <strong>{movies?.length ? movies.length : "0"}</strong> results
      </p>
    </nav>
  );
}
