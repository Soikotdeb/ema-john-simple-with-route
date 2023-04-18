import React, { useContext, useState } from 'react';
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './../Providers/AuthProvider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, } from '@fortawesome/free-solid-svg-icons'


const Login = () => {
    const [show, setShow]=  useState(false);


    const { signIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const from = location.state?.from?.pathname || '/'



    const handleTogglePassword = () => {
        setShow(!show);
      };


    const handleLogin = event =>{
        event.preventDefault();

        const form = event.target;
        const email=  form.email.value;
        const password = form.password. value
        console.log(email, password);

        signIn(email, password)
        .then(result =>{
            const loggedUser =result.user;
            console.log(loggedUser);
            form.reset();
            navigate(from, {replace:true})


        })
        .catch(error=>{
         console.log(error);   
        })

    }

    return (
        <div className='from-container'>
            <h2 className='from-title '>Login </h2>
            <form onSubmit={handleLogin}>
                <div className="from-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" required />
                </div>
                <div className="from-control">
                    <label htmlFor="password">Password</label>
                        <div style={{ position: "relative" }}>
             <input  type={show ? "text" : "password"}  name="password" id="" required />
        <span
          style={{
            position: "absolute",
            right: "90px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",           
            
          }}
          onClick={handleTogglePassword}
        >
          <FontAwesomeIcon className='show-password' icon={show ? faEyeSlash : faEye} />
        </span>
      </div>
                         
                </div>
               <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p><small>New to Ema-John? <Link to='/signup'>Create  New Account</Link> </small></p>
        </div>
    );
};

export default Login;