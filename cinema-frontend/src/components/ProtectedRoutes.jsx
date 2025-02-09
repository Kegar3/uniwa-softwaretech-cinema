import { Routes, Route, Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Movies from "../pages/Movies";
import Showtimes from "../pages/Showtimes";
import Reservations from "../pages/Reservations";
import Seats from "../pages/Seats";

const ProtectedRoutes = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Routes>
      <Route path="/movies" element={<Movies />} />
      <Route path="/showtimes" element={<Showtimes />} />
      <Route path="/movies/:id/showtimes" element={<Showtimes />} />
      <Route path="/showtimes/:showtimeId/seats" element={<Seats />} />
      <Route path="/reservations" element={<Reservations />} />
    </Routes>
  );
};
ProtectedRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default ProtectedRoutes;
