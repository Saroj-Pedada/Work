// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, user, requiredRole }) => {
    if (!user) {
        // If user is not authenticated, redirect to login page
        return <Navigate to="/login" />;
    }

    if (user.role !== requiredRole) {
        // If user does not have the required role, redirect to unauthorized page
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;
