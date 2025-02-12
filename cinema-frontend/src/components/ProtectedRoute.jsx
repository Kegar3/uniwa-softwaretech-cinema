import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import PropTypes from 'prop-types';

const ProtectedRoute = ({ isAuthenticated, userRole, children }) => {
  useEffect(() => {
    if (!isAuthenticated || userRole !== 'admin') {
      alert("Access Denied!");
    }
  }, [isAuthenticated, userRole]);

  if (!isAuthenticated || userRole !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userRole: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;