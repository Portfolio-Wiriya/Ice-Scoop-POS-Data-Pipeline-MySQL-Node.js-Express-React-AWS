import React, { useState } from 'react';
import './AdminLogin.css';
import logo from '../../assets/svg/logo.png'
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // refresh web pages

        if (username === 'admin' && password === '12345678') {
            setError('');
            console.log('เข้าสู่ระบบสำเร็จ');
            navigate('/POSView');
        } else {
            setError('Username หรือ Password ไม่ถูกต้อง');
        }


    }

    return (
        <div className="container">
            <header className="con-header">
                <div className='box-login'>
                    <img src={logo} className="logo" alt="logo" />
                    <p className='tx-login'>Admin LOGIN </p>
                    


                    <div className='input-group'>
                        <label className='login-label'>Username</label>
                        <input type='text' className='login-input' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>


                    <div className='input-group'>
                        <label className='login-label'>Password</label>
                        <input type='password' className='login-input' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    {error && <p className='login-error'>{error}</p>}

                    <button type='submit' className='login-btn' onClick={handleSubmit}> Log In </button>
                </div>
            </header>
        </div>
    );
}

export default AdminLogin;
