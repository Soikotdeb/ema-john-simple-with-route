import React, { useContext, useState } from 'react';
import './SignUp.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, } from '@fortawesome/free-solid-svg-icons'

const SignUp = () => {
    const [error, setError]= useState('')
    const {createUser} = useContext(AuthContext);
    const [show, setShow]=  useState(false);
    const [confirms, setConfirms]= useState(false);


    const handleTogglePassword = () => {
        setShow(!show);
      };

      const handleConfirmPassword = () =>{
        setConfirms(!confirms);
      }


const handleSignUp = event =>{
    event.preventDefault();

    const form = event. target;
    const email = form.email.value;  
    const password = form.password.value;
    const confirm = form.confirm.value;
    console.log(email, password, confirm);

 setError('')
    if(password !== confirm){
setError('your password did not match ')
return
    }
    else if(password.length< 6 ){
        setError('password must be 6 characters longer')
        return
    }

    createUser(email, password)
    .then(result=>{
        const loggedUser = result.user;
        console.log(loggedUser);
    })
.catch(error=>{
    console.log(error);
    setError(error.message)
})
}

    return (
        <div className='from-container'>
            <h2 className='from-title '>Sign Up </h2>
            <form onSubmit={handleSignUp}>
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
                     


                <div className="from-control">
                    <label htmlFor="confirm"> Confirm Password</label>
                    <div style={{ position: "relative" }}>
             <input  type={confirms ? "text" : "password"}  name="password" id="" required />
        <span
          style={{
            position: "absolute",
            right: "90px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",           
            
          }}
          onClick={handleConfirmPassword}
        >
          <FontAwesomeIcon className='show-password' icon={confirms ? faEyeSlash : faEye} />
        </span>
      </div>
                </div>
               <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p><small>Already have an account? <Link to='/login'>Login</Link> </small></p>
            <p className='text-error'><small>{error}</small></p>
        </div>
    );
};

export default SignUp;