import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Showtimes from "./pages/Showtimes";
import Reservations from "./pages/Reservations";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Seats from "./pages/Seats";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      setIsAuthenticated(!!token);
      setIsAdmin(role === "admin"); 
    };

    checkAuthStatus();
    window.addEventListener("storage", checkAuthStatus);

    return () => {
        window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);


  const handleLogin = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role); 

    setIsAuthenticated(true);
    setIsAdmin(localStorage.getItem("role") === "admin"); 
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setIsAdmin(false);
  }

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} isAdmin={isAdmin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={ <Movies />} />
        <Route path="/showtimes" element={<Showtimes />} />
        <Route path="/movies/:id/showtimes" element={<Showtimes /> } />
        <Route path="/showtimes/:showtimeId/seats" element={ <Seats />} />
        <Route path="/reservations" element={isAuthenticated ? <Reservations /> : <Login onLogin={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleLogin}/>} />
        <Route path="/profile" element={isAuthenticated ? <Profile onLogout={handleLogout}/> : <Login onLogin={handleLogin} />} />
        <Route path="/admin" element={isAuthenticated && isAdmin ? <AdminPanel /> : <Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
