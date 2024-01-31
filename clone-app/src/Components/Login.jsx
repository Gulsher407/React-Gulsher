import React, { useState, useContext } from 'react';
import UserContext from '../context/Usercontext';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext); // Corrected useContext usage

    const handleSubmit = (e) => {
        e.preventDefault(); // Corrected preventDefault method
        setUser({ username, password });
    };

    return (
        <div className=' flex mx-auto flex-col'>
            <h2  className='text-3xl font-bold item center '> Login </h2>
            <input
                type="text"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
                placeholder="username"
            />
        
            <input
                type="password" // Corrected input type
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                placeholder="password"
            />
            <button onClick={handleSubmit} type="submit">
                submit
            </button>
        </div>
    );
}

export default Login;
