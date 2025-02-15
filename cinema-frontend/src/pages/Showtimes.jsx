import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Showtimes.css"; //styling

const Showtimes = () => {
    const { id } = useParams();
    const [showtimes, setShowtimes] = useState([]);
    const [movieTitle, setMovieTitle] = useState("");

    useEffect(() => {
        // Φέρνουμε τα showtimes
        fetch(`http://localhost:3000/movies/${id}/showtimes`)
            .then(res => res.json())
            .then(data => setShowtimes(data))
            .catch(error => console.error("Error fetching showtimes:", error));

        // Φέρνουμε τον τίτλο της ταινίας
        fetch(`http://localhost:3000/movies/${id}`)
            .then(res => res.json())
            .then(data => setMovieTitle(data.title))
            .catch(error => console.error("Error fetching movie title:", error));
    }, [id]);

    return (
        <div className="showtimes-container">
            <h2>{movieTitle}:</h2>
            <div className="showtime-list">
            {showtimes.map(showtime => (
                <div key={showtime.id} className="showtime-card">
                    <h3>Hall: {showtime.hall}</h3>
                    <p><b>Start Time:</b> {new Date(showtime.start_time).toLocaleString()}</p>
                    <p><b>Available Seats:</b> {showtime.available_seats}</p>
                    <Link to={`/showtimes/${showtime.id}/seats`} className="seats-link">View Seats</Link>
                </div>
            ))}
            </div>
        </div>
    );
};

export default Showtimes;
