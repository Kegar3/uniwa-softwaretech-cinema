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
import AdminPage from "./pages/AdminPage";

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        setIsAdmin(false);
        return;
      }
      try{
        const response = await fetch("http://localhost:3000/users/me", {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if(!response.ok){
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setIsAuthenticated(true);
        setIsAdmin(data.role === "admin");
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
        setIsAdmin(false);
      }

    };

    checkAuthStatus();
    window.addEventListener("storage", checkAuthStatus);

    return () => {
        window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);


  const handleLogin = (token) => {
    localStorage.setItem("token", token); 
    setIsAuthenticated(true);
    fetchUserData();
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      setIsAdmin(false);
      return;
    }

    try { 
      const response = await fetch("http://localhost:3000/users/me", {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setIsAuthenticated(true);
      setIsAdmin(data.role === "admin");
    } catch (error) {
      console.error("Error fetching user data: ",error);
      setIsAuthenticated(false);
      setIsAdmin(false);
    }  
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
        <Route path="/admin" element={isAuthenticated && isAdmin ? <AdminPage /> : <Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
