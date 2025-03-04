import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieCarousel from "../components/MovieCarousel";
import "./Home.css"; // Import the CSS file for styling

const Home = () => {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const res = await fetch("http://localhost:3000/movies");
    const data = await res.json();
    setMovies(data);
  };

  return (
    <div className="home-container">
      <h1>Welcome to UNIWA Cinema Booking!</h1>
      <p>Experience the best movies in the most comfortable seats.</p>
      <MovieCarousel movies={movies} />
      <div className="home-buttons">
        <Link to="/movies" className="home-button">View Movies</Link>
        <Link to="/reservations" className="home-button">My Reservations</Link>
      </div>
    </div>
  );
};

export default Home;