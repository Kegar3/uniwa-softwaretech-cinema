import { useEffect, useState } from "react";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/movies") // Endpoint από το backend
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <div style={styles.container}>
      <h2>Available Movies</h2>
      <div style={styles.moviesGrid}>
        {movies.map((movie) => (
          <div key={movie.id} style={styles.movieCard}>
            <h3>{movie.title}</h3>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Duration:</strong> {movie.duration} min</p>
            <p><strong>Release Date:</strong> {new Date(movie.release_date).toDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  moviesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "15px",
  },
  movieCard: {
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  },
};

export default Movies;
