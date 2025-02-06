import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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
        <div>
            <h1>{movieTitle}:</h1>
            {showtimes.map(showtime => (
                <div key={showtime.id}>
                    <h3>Hall: {showtime.hall}</h3>
                    <p><b>Start Time:</b> {new Date(showtime.start_time).toLocaleString()}</p>
                    <p><b>Available Seats:</b> {showtime.available_seats}</p>
                    <Link to={`/showtimes/${showtime.id}/seats`}>View Seats</Link>
                </div>
            ))}
        </div>
    );
};

export default Showtimes;
