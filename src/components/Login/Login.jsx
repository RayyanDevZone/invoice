import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../../Users'; // Import the users array
import { AuthContext } from '../../AuthContext'; // Import AuthContext

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext); // Use setIsAuthenticated from AuthContext

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      setIsAuthenticated(true); // Set authentication state to true
      navigate('/personal-info');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className='h-[500px] w-[350px] bg-[#020817] rounded-md flex flex-col items-center justify-center p-4'>
      <h2 className='text-white text-2xl mb-4'>Login</h2>
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
            required 
          />
        </div>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <button 
          type='submit' 
          className='w-full p-2 bg-gray-800 hover:bg-white text-white hover:text-black text-bold rounded'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
