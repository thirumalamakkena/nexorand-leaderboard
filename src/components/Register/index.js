import POPUP from '../POPUP';
import './index.css';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

const Register = (props) => {
    const [showNotification, setShowNotification] = useState(false);
    const [message, setMessage] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    useEffect(() => {
        if (showNotification) {
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        }
    }, [showNotification]);

    const registrationApiCall = async (user) => {
        const {history} = props;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }

        const response = await fetch('http://localhost:7000/api/auth/v1/register', options);
        const data = await response.json();
        if (data.success) {
            setMessage(data.message);
            setShowNotification(true);
            setFirstName('');
            setLastName('');
            setEmail('');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setTimeout(() => {
                history.push('/');
            }, 3000);

        } else {
            alert(data.message);
        }
    }
        
    const onSubmitRegistration = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        const user = {
            firstName,
            lastName,
            email,
            username,
            password
        }
        registrationApiCall(user);
    }

    if(localStorage.getItem('userData')) {
        props.history.push('/');
    }


    return (
        <div className='register-main-container'>
        {showNotification && <POPUP message={message} />}
        <div className='register-container'>
            <h1 className='register-title'>Register</h1>
            <form className='form-container' onSubmit={onSubmitRegistration}>
                <label htmlFor='firstName' className='label'>FirstName</label>
                <input value={firstName} onChange={(e)=> setFirstName(e.target.value)} type='text' id='firstName' placeholder='FirstName' className='input-box-container' required />
                <label htmlFor='lastName'>LastName</label>
                <input value={lastName} onChange={(e)=> setLastName(e.target.value)} type='text' id='lastName' placeholder='LastName' className='input-box-container' required />
                <label htmlFor='email'>Email</label>
                <input value={email} onChange={(e)=> setEmail(e.target.value)} type='email' id='email' placeholder='Email' className='input-box-container' required />
                <label htmlFor='username'>Username</label>
                <input value={username} onChange={(e)=> setUsername(e.target.value)} type='text' id="username" placeholder='Username' className='input-box-container' required />
                <label htmlFor='password'>Password</label>
                <input value={password} onChange={(e)=> setPassword(e.target.value)} type='password' id='password' placeholder='Password' className='input-box-container' required />
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} type='password' id='confirmPassword' placeholder='Confirm Password' className='input-box-container' required />
                <button type="submit" className="register-button">Register</button>
            </form>
            <p className='login-thr-reg'>Already have an account? {<Link to='/login'> Sign in </Link>} </p>
        </div>
    </div>
    )
}

export default Register;