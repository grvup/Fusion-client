import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children, roles }) => {
  const userRole = useSelector((state) => state.user.role);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userRole !== undefined && userRole !== null && userRole!=="Guest-User") {
      setIsLoading(false);
    }
  }, [userRole]);

  if (isLoading) {
    return null;
  }

  if (!roles.includes(userRole) ) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;