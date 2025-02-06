import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Seats = () => {
    const { showtimeId } = useParams();
    const [seats, setSeats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/showtimes/${showtimeId}/seats`)
            .then(response => response.json())
            .then(data => {
                setSeats(data.availableSeats);
                setLoading(false);
            })
            .catch(error => console.error("Error fetching seats:", error));
    }, [showtimeId]);

    if (loading) return <p>Loading available seats...</p>;

    return (
        <div>
            <h2>Available Seats</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {seats.map((seat, index) => (
                    <button key={index} style={{ margin: '5px', padding: '10px' }}>
                        {seat}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Seats;
