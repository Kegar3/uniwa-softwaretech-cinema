import { useEffect, useState } from "react";

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch("http://localhost:3000/admin/stats", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <p>Loading stats...</p>;
    if (!stats) return <p>Error loading statistics</p>;

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <div style={styles.dashboard}>
                <div style={styles.card}>
                    <h3>Total Reservations</h3>
                    <p>{stats.totalReservations}</p>
                </div>
                <div style={styles.card}>
                    <h3>Reservations by Movie</h3>
                    <ul>
                        {stats.reservationsByMovie.map((movie, index) => (
                            <li key={index}>{movie.Showtime.Movie.title} - {movie.total_reservations} reservations</li>
                        ))}
                    </ul>
                </div>
                <div style={styles.card}>
                    <h3>Available Seats by Showtime</h3>
                    <ul>
                        {stats.availableSeatsByShowtime.map((showtime, index) => (
                            <li key={index}>Showtime ID: {showtime.showtime_id} - {showtime.available_seats} seats available</li>
                        ))}
                    </ul>
                </div>
            </div>
            <h3>Top 5 Popular Movies</h3>
            <ul>
                {stats.mostPopularMovies.map((movie, index) => (
                    <li key={index}>{movie.Movie.title} - {movie.total_showtimes} Showtime(s)</li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    dashboard: {
        display: "flex",
        gap: "20px",
        marginBottom: "20px"
    },
    card: {
        padding: "20px",
        border: "1px solid black",
        borderRadius: "10px",
        textAlign: "center"
    }
};

export default AdminDashboard;