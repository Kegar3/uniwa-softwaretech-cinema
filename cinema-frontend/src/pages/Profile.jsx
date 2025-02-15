import { useEffect, useState } from "react";
import PropTypes from "prop-types"
import "./Profile.css"

const Profile = ({onLogout}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("User not logged in.");
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/me`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user data.");
                }

                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="profile-container">
            <h2>My Profile</h2>
            {error && <p className="error-message">{error}</p>}
            {user ? (
                <div className="profile-details">
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role || "User"}</p>
                    <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
                    <button className="logout-button" onClick={() => {
                        onLogout();
                        window.location.href = "/login"; 
                    }}>
                        Logout
                    </button>
                </div>
            ) : (
                !error && <p>Loading profile...</p>
            )}
        </div>
    );
};

Profile.propTypes = {
    onLogout: PropTypes.func.isRequired,
};

export default Profile;
