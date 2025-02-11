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

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = () => {
        const token = localStorage.getItem("token");
        console.log("Checking token on re-render:", token);
        setIsAuthenticated(!!token);
    };

    // Ελέγχουμε το token αρχικά
    checkToken();

    // Προσθέτουμε event listener για να ενημερώνεται το state όταν αλλάζει το localStorage
    window.addEventListener("storage", checkToken);

    return () => {
        window.removeEventListener("storage", checkToken);
    };
  }, []);


  const handleLogin = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
  }

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={ <Movies />} />
        <Route path="/showtimes" element={<Showtimes />} />
        <Route path="/movies/:id/showtimes" element={<Showtimes /> } />
        <Route path="/showtimes/:showtimeId/seats" element={isAuthenticated ? <Seats /> : <Login onLogin={handleLogin} />} />
        <Route path="/reservations" element={isAuthenticated ? <Reservations /> : <Login onLogin={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleLogin}/>} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
