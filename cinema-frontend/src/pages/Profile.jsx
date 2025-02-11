import { useEffect, useState } from "react";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
            setError("User not logged in.");
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/${userId}`, {
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
        <div>
            <h2>My Profile</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {user ? (
                <div>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role || "User"}</p>
                    <button onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
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

export default Profile;
