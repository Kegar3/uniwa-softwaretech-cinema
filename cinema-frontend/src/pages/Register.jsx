import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Register = ({onRegister}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, email })
            });

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Invalid server response");
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Registration failed");
            }


            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.user.username); // Αποθήκευση username
            
            // Save the token and redirect to Movies
            if (onRegister) onRegister(data.token); 
            navigate("/profile");

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleRegister}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

Register.propTypes = {
    onRegister: PropTypes.func.isRequired,
};

export default Register;