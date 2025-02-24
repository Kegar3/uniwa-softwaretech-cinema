import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Movies.css"; //Styling

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  return (
    <div>
      <h2>Available Movies</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            {movie.poster_url && (
              <img src={movie.poster_url} alt={`${movie.title} poster`} className="movie-poster" />
            )}
            <h3>{movie.title}</h3>
            <p>
              <strong>Genre:</strong> {movie.genre}
            </p>
            <p>
              <strong>Duration:</strong> {movie.duration} min
            </p>
            <p>
              <strong>Release Date:</strong>{" "}
              {new Date(movie.release_date).toDateString()}
            </p>
            <Link
              to={`/movies/${movie.id}/showtimes`}
              className="showtimes-link"
            >
              View Showtimes
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;