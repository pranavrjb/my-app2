import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../src/context/UserContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(UserContext);
    const location = useLocation();

    if (!user) 
        return <Navigate to='/login' replace state={{ from: location }} />;
    return children;
};

export default ProtectedRoute;
