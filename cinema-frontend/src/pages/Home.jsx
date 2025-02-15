import { Link } from "react-router-dom";
import "./Home.css"; // Import the CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to UNIWA Cinema Booking!</h1>
      <p>Experience the best movies in the most comfortable seats.</p>
      <div className="home-buttons">
        <Link to="/movies" className="home-button">View Movies</Link>
        <Link to="/reservations" className="home-button">My Reservations</Link>
      </div>
    </div>
  );
};

export default Home;