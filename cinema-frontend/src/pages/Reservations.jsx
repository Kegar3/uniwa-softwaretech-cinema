import { useEffect, useState } from "react";

const Reservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
          setError("User not authenticated.");
          setLoading(false);
          return;
        }
        
        const fetchReservations = async () => {
            try {
                const response = await fetch(`http://localhost:3000/reservations/user/${userId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch reservations");
                }

                const data = await response.json();
                setReservations(data);
            } catch (err) {
                console.error("Error fetching reservations:", err);
                setError("Failed to load reservations.");
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    if (loading) return <p>Loading reservations...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>My Reservations</h2>
            <ul style={styles.list}>
                {reservations.length === 0 ? (
                    <p>No reservations found.</p>
                ) : (
                    reservations.map((res) => (
                        <li key={res.id} style={styles.reservationItem}>
                            <strong>Movie:</strong> {res.movie || "Unknown"} <br />
                            <strong>Showtime:</strong> {res.showtime ? new Date(res.showtime).toLocaleString() : "Unknown"} <br />
                            <strong>Seat:</strong> {res.seat}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

const styles = {
    list: {
        listStyle: "none",
        padding: 0,
    },
    reservationItem: {
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: "#f9f9f9",
        borderRadius: "5px",
    }
};

export default Reservations;
