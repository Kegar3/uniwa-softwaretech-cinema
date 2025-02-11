import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Seats = () => {
    const { showtimeId } = useParams();
    const [availableSeats, setAvailableSeats] = useState([]);
    const [reservedSeats, setReservedSeats] = useState(new Set());
    const [selectedSeat, setSelectedSeat] = useState(null); // Επιτρέπει μόνο μία θέση
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // ** Μετατροπή από αριθμητικό format (S1, S2...) σε A1-E10 **
    const convertSeatFormat = (seatNumber) => {
        const rows = ["A", "B", "C", "D", "E"];
        const rowIndex = Math.floor((seatNumber - 1) / 10);
        const seatIndex = ((seatNumber - 1) % 10) + 1;
        return `${rows[rowIndex]}${seatIndex}`;
    };

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                // Φέρνουμε τις διαθέσιμες θέσεις
                const seatsRes = await fetch(`http://localhost:3000/showtimes/${showtimeId}/seats`);
                const seatsData = await seatsRes.json();
                setAvailableSeats(seatsData.availableSeats.map(seat => convertSeatFormat(parseInt(seat.replace("S", "")))));

                // Φέρνουμε τις κρατημένες θέσεις
                const reservationsRes = await fetch(`http://localhost:3000/showtimes/${showtimeId}/reservations`);
                const reservationsData = await reservationsRes.json();
                setReservedSeats(new Set(reservationsData.map(res => res.seat))); // Αποθήκευση των κρατημένων θέσεων
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load seat data.");
            } finally {
                setLoading(false);
            }
        };

        fetchSeats();
    }, [showtimeId]);

    const handleSelectSeat = (seat) => {
        if (!reservedSeats.has(seat)) {
            setSelectedSeat(seat); // Επιτρέπει μόνο μία επιλογή
        }
    };

    const handleConfirmBooking = async () => {
        if (!selectedSeat) {
            alert("Please select one seat.");
            return;
        }

        const userId = localStorage.getItem("userId");

        if (!userId) {
            alert("User not authenticated. Please log in again.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/reservations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    showtime_id: parseInt(showtimeId),
                    user_id: parseInt(userId),
                    seat: selectedSeat // Στέλνουμε τη θέση σε μορφή A1-E10
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Booking failed");

            alert(`Reservation confirmed for seat ${selectedSeat}!`);
            navigate("/reservations");
        } catch (error) {
            console.error("Error booking seat:", error);
            alert("Failed to confirm reservation.");
        }
    };

    if (loading) return <p>Loading available seats...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>Select Your Seat</h2>
            <div style={styles.seatContainer}>
                {availableSeats.map((seat) => {
                    const isReserved = reservedSeats.has(seat);
                    return (
                        <button
                            key={seat}
                            onClick={() => handleSelectSeat(seat)}
                            disabled={isReserved}
                            style={{
                                ...styles.seat,
                                backgroundColor: isReserved ? "red" : (selectedSeat === seat ? "green" : "lightgray"),
                                cursor: isReserved ? "not-allowed" : "pointer"
                            }}
                        >
                            {seat}
                        </button>
                    );
                })}
            </div>
            <button onClick={handleConfirmBooking} style={styles.confirmButton}>Confirm Booking</button>
        </div>
    );
};

const styles = {
    seatContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(10, 40px)",
        gap: "10px",
        justifyContent: "center",
        marginTop: "20px"
    },
    seat: {
        width: "40px",
        height: "40px",
        textAlign: "center",
        border: "1px solid black",
        fontSize: "14px"
    },
    confirmButton: {
        marginTop: "20px",
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        cursor: "pointer"
    }
};

export default Seats;
