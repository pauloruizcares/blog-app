import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserSession } from "../hooks/useUserSession";

interface ProtectedRouteProps {
    element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {

    const { data } = useUserSession()

    return data?.authenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
