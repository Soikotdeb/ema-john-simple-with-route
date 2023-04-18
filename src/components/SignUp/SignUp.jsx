import React, { useContext, useState } from 'react';
import './SignUp.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const SignUp = () => {
    const [error, setError]= useState('')
    const {createUser} = useContext(AuthContext);


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
                    <input type="password" name="password" id="" required />
                </div>
                <div className="from-control">
                    <label htmlFor="confirm"> Confirm Password</label>
                    <input type="password" name="confirm" id="" required />
                </div>
               <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p><small>Already have an account? <Link to='/login'>Login</Link> </small></p>
            <p className='text-error'><small>{error}</small></p>
        </div>
    );
};

export default SignUp;