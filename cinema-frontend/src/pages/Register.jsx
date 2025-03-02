import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./Auth.css";
import { toast } from "react-toastify";

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
            toast.success("Registration successful!"); 
            navigate("/profile");

        } catch (err) {
            setError(err.message);
            toast.error("Registration failed!");
        }
    };

    return (
      <div className="auth-container">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleRegister} className="auth-form">
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
          <button type="submit" className="auth-button">
            Register
          </button>
        </form>
      </div>
    );
};

Register.propTypes = {
    onRegister: PropTypes.func.isRequired,
};

export default Register;