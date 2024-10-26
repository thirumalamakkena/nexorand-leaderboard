import POPUP from '../POPUP';
import './index.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Login = (props) => {
    const [showNotification, setShowNotification] = useState(false);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        if (showNotification) {
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        }
    }, [showNotification]);

   

    const loginApiCall = async (user) => {
        const {history} = props;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }

        const response = await fetch('http://localhost:7000/api/auth/v1/login', options);
        const data = await response.json();
        const userData = JSON.stringify(data.data);
        
        if (data.success) {
            localStorage.setItem('userData', userData,{path:'/'});
            setMessage(data.message);
            setShowNotification(true);
            setTimeout(() => {
                history.push('/');
            }
            , 3000);

        } else {
            alert(data.message);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        loginApiCall({username, password});
    }
    
    if(localStorage.getItem('userData')) {
        props.history.push('/');
    }
    

    return (
        <div className="login-main-container">
            <div className="login-container">
                <h2 className='login-title'>Login</h2>
                <form className='login-form-container' onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id='username' placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className='login-input-box' required />
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className='login-input-box' required />
                    <button type="submit" className='login-button'>Login</button>
                </form>
                <p className='reg-thr-login'>Don't have an account? <Link to="/register">Register</Link></p>
                {showNotification && <POPUP message={message} />}
            </div>
        </div>
    );
}

export default Login;