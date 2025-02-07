import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Login = ({ onLogin = () => {} }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
          const response = await fetch("http://localhost:3000/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, password }) // <-- Χρησιμοποιούμε username αντί για email
          });
  
          const data = await response.json();
  
          if (!response.ok) {
              throw new Error(data.error || "Login failed");
          }
  
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.userId); // Αποθήκευση User ID
  
          if (onLogin) onLogin(); // Αν υπάρχει callback function, την καλούμε
  
          navigate("/movies"); // Πάμε στις ταινίες μετά το login
      } catch (err) {
          setError(err.message);
      }
  };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

Login.propTypes = {
  onLogin: PropTypes.func
};
export default Login;
