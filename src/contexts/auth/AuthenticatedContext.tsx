import React from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from "./authContext";

interface AuthenticatedRouteProps {
  children: React.ReactElement;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-8 h-8 border-4 border-brand-purple border-t-transparent rounded-full animate-spin" />
    </div>;
  }
  return !isAuthenticated ? (
    children
  ) : (
    <Navigate to={location.state?.from?.pathname || '/home'} replace />
  );
};

export default AuthenticatedRoute;