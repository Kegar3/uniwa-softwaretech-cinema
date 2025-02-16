import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Showtimes.css"; //styling

const Showtimes = () => {
  const { id } = useParams();
  const [showtimes, setShowtimes] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Φέρνουμε τα showtimes
    fetch(`http://localhost:3000/movies/${id}/showtimes`)
      .then((res) => {
        if (res.status === 404) {
          return [];
        }
        return res.json();
      })
      .then((data) => {
        setShowtimes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching showtimes:", error);
        setError("Failed to load showtimes.");
        setLoading(false);
      });

    // Φέρνουμε τον τίτλο της ταινίας
    fetch(`http://localhost:3000/movies/${id}`)
      .then((res) => res.json())
      .then((data) => setMovieTitle(data.title))
      .catch((error) => console.error("Error fetching movie title:", error));
  }, [id]);

  if (loading) return <p>Loading reservations...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="showtimes-container">
      <h2>{movieTitle}:</h2>
      <div className="showtime-list">
        {showtimes.length === 0 ? (
          <p>No showtimes available for {movieTitle}.</p>
        ) : (
          showtimes.map((showtime) => (
            <div key={showtime.id} className="showtime-card">
              <h3>Hall: {showtime.hall}</h3>
              <p>
                <b>Start Time:</b>{" "}
                {new Date(showtime.start_time).toLocaleString()}
              </p>
              <p>
                <b>Available Seats:</b> {showtime.available_seats}
              </p>
              <Link
                to={`/showtimes/${showtime.id}/seats`}
                className="seats-link"
              >
                View Seats
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Showtimes;
