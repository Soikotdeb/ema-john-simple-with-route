import React from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const Header = () => {

const {user, logOut} =  useContext(AuthContext)

const handleLogout = () =>{
    logOut()
    .then(result =>{})
    .catch(error>console.error(error))
}


    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">SignUp</Link>

                {
                user && <p className='text-white'> welcome {user.email} <button onClick={handleLogout}>Sign Out</button> </p>
                }
            </div>
        </nav>
    );
};

export default Header;