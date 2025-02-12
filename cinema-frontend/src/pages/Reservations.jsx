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

    const handleCancelReservation = async (reservationId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("User not authenticated.");
            return;
        }

        if (!window.confirm("Are you sure you want to cancel this reservation?")) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/reservations/${reservationId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error("Failed to cancel reservation");

            setReservations(reservations.filter(res => res.id !== reservationId)); // Αφαιρεί τη κράτηση από το UI
        } catch (err) {
            console.error("Error canceling reservation:", err);
            alert("Failed to cancel reservation.");
        }
    };

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
                            <div style={styles.reservationDetails}>
                                <strong>Movie:</strong> {res.movie || "Unknown"} <br />
                                <strong>Showtime:</strong> {res.showtime ? new Date(res.showtime).toLocaleString() : "Unknown"} <br />
                                <strong>Seat:</strong> {res.seat}
                            </div>
                            <button onClick={() => handleCancelReservation(res.id)} style={styles.cancelButton}>Cancel Reservation</button>
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
        display: "flex",
        border: "1px solid ",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: "#f9f9f9",
        borderRadius: "5px",
    },
    reservationDetails: {
        marginRight: "10px",
    },
    cancelButton: {
        backgroundColor: "black",
        color: "white",
        border: "none",
        padding: "8px 12px",
        cursor: "pointer",
        borderRadius: "5px",
    }
};

export default Reservations;
