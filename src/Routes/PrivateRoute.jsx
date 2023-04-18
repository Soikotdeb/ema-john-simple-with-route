import React, { useContext } from 'react';
import './PrivateRoute.css'
import { AuthContext } from './../components/Providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const {user,loading}= useContext(AuthContext) 
    const location = useLocation();


if(loading){
    return <div className="loading-container">
    <div className="loading-circle"></div>
    <p>Loading....</p>
  </div>





}


if(user){
    return children;
}

    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;