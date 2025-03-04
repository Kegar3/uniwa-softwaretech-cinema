import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Reservations.css"; //styling

const Reservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("User not authenticated.");
          setLoading(false);
          return;
        }
        
        const fetchUserDetails = async () => {
            try {
                const userResponse = await fetch("http://localhost:3000/users/me", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!userResponse.ok) {
                    throw new Error("Failed to fetch user details");
                }

                const userData = await userResponse.json();
                const userId = userData.id;

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
            } catch (err) {
                console.error("Error fetching user details:", err);
                setError("Failed to load user details.");
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    const handleCancelReservation = async (reservationId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("User not authenticated.");
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
            toast.success("Reservation cancelled successfully!");
        } catch (err) {
            console.error("Error canceling reservation:", err);
            toast.error("Failed to cancel reservation.");
        }
    };

    if (loading) return <p>Loading reservations...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
      <div className="reservations-container">
        <h2>My Reservations</h2>
        <ul className="reservations-list">
          {reservations.length === 0 ? (
            <p>No reservations found.</p>
          ) : (
            reservations.map((res) => (
              <li key={res.id} className="reservation-item">
                <div className="reservation-details">
                  <strong>Movie:</strong> {res.movie || "Unknown"} <br />
                  <strong>Showtime:</strong>{" "}
                  {res.showtime
                    ? new Date(res.showtime).toLocaleString()
                    : "Unknown"}{" "}
                  <br />
                  <strong>Seat:</strong> {res.seat}
                </div>
                <button
                  onClick={() => handleCancelReservation(res.id)}
                  className="cancel-button"
                >
                  Cancel Reservation
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    );
};

export default Reservations;