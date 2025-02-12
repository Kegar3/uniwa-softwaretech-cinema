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
import ProtectedRoute from "./components/ProtectedRoutes";

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkToken = () => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("role"));
        console.log("Checking token on re-render:", token);
        setIsAuthenticated(!!token);
        setUserRole(user ? user.role : null);
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
    setUserRole(user ? user.role : null);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserRole(null);
  }

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
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
        <Route path="/admin" element={
          <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole}>
            <AdminPanel />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
