import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const user = localStorage.getItem("username");
      setUser(user);
    }, [isAuthenticated]); // Παρακολουθεί το authentication state

    const handleLogout = () => {
      onLogout();
      navigate("/login");
    };

    return (
        <nav style={styles.navbar}>
        <h2 style={styles.logo}>Cinema Booking</h2>
        <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/movies" style={styles.link}>Movies</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link to="/reservations" style={styles.link}>Reservations</Link></li>
            <li><Link to="/profile" style={styles.link}>{user || "Profile"}</Link></li>
            <li><Link to="/login" style={styles.link} onClick={handleLogout}>Logout</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/login" style={styles.link}>Login</Link></li>
            <li><Link to="/register" style={styles.link}>Register</Link></li>
          </>
        )}
        </ul>
        </nav>
    );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
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
