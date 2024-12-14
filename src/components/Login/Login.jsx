import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../../Users.js'; // Import the users array

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      navigate('/personal-info');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className='h-[500px] w-[350px] bg-[#020817] rounded-md flex flex-col items-center justify-center p-4 font-lexend'>
      <h2 className='text-white text-bold text-2xl mb-4'>Login</h2>
      <form onSubmit={handleLogin} className='w-full'>
        <div className='mb-4'>
          <label className='block text-white mb-2' htmlFor='username'>Username</label>
          <input 
            type='text' 
            id='username' 
            name='username' 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className='w-full p-2 rounded bg-gray-800 text-white' 
            placeholder='Enter Username'
            required 
          />
        </div>
        <div className='mb-4'>
          <label className='block text-white mb-2' htmlFor='password'>Password</label>
          <input 
            type='password' 
            id='password' 
            name='password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className='w-full p-2 rounded bg-gray-800 text-white' 
            placeholder='Enter Password'
            required 
          />
        </div>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <button 
          type='submit' 
          className='w-full p-2 bg-gray-700 hover:bg-white hover:text-black text-white rounded'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
