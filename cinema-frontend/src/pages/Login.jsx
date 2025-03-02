import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./Auth.css"; //styling
import { toast } from "react-toastify"; // import toastify

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
          localStorage.setItem("username", data.user.username);

          // Fetch user data to determine role
          const userResponse = await fetch("http://localhost:3000/users/me", {
              headers: { "Authorization": `Bearer ${data.token}` }
          });

          const userData = await userResponse.json();

          if (!userResponse.ok) {
            throw new Error(userData.error || "Failed to fetch user data");
          }

          if (onLogin) onLogin(data.token); // Περνάμε και το user object
          
          if(data.user.role === "admin") {
            toast.success("Welcome back!");
            navigate("/admin"); // Πάμε στο admin panel
          }else{
            toast.success("Welcome back!");    
            navigate("/profile"); // Πάμε στο profile
          }
      } catch (err) {
        toast.error("Login failed!");
        setError(err.message);
      }
  };

    return (
        <div className="auth-container">
            <h2>Log in</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin} className="auth-form">
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
                <button type="submit" className="auth-button">Login</button>
            </form>
        </div>
    );
};

Login.propTypes = {
  onLogin: PropTypes.func
};
export default Login;
