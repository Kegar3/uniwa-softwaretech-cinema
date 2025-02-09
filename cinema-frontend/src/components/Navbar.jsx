import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // Αν υπάρχει token, είναι logged in
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setIsLoggedIn(false);
        navigate("/login"); 
    };

    return (
        <nav style={styles.navbar}>
        <h2 style={styles.logo}>Cinema Booking</h2>
        <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/movies" style={styles.link}>Movies</Link></li>
        <li><Link to="/showtimes" style={styles.link}>Showtimes</Link></li>
        <li><Link to="/reservations" style={styles.link}>Reservations</Link></li>
            {isLoggedIn ? (
                <li><Link to="/" style={styles.link} onClick={handleLogout}>Logout</Link></li>
            ) : (
              <li><Link to="/login" style={styles.link}>Login</Link></li>
            )}
        </ul>
        </nav>
    );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#222",
    color: "#fff"
  },
  logo: { fontSize: "1.5rem" },
  navLinks: {
    display: "flex",
    listStyle: "none",
    gap: "15px",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "1.2rem"
  }
};

export default Navbar;
