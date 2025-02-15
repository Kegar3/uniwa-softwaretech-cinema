import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import "./Navbar.css"; //styling

const Navbar = ({ isAuthenticated, isAdmin, onLogout }) => {
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
        <nav className="navbar">
        <h2 className="logo">UNIWA Cinema Booking</h2>
        <ul className="nav-links">
        <li><Link to="/" className="link">Home</Link></li>
        <li><Link to="/movies" className="link">Movies</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link to="/reservations" className="link">Reservations</Link></li>
            {isAdmin ? (
              <>
                <li><Link to="/admin" className="link">Admin Panel</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/profile" className="link">{user || "Profile"}</Link></li>
              </>
            )}
            
            <li><Link to="/login" className="link" onClick={handleLogout}>Logout</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="link">Login</Link></li>
            <li><Link to="/register" className="link">Register</Link></li>
          </>
        )}
        </ul>
        </nav>
    );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired
};
export default Navbar;
