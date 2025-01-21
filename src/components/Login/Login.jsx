import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import users from "../../Users";
import { AuthContext } from "../../AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      setIsAuthenticated(true);
      navigate("/personal-info");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#020817] flex items-start justify-center  p-4 sm:p-6 md:p-8">
      <div className="bg-[#020817] rounded-md flex flex-col items-center  font-lexend justify-center mt-10 sm:m-0  p-4 w-full max-w-md">
        <h2 className="text-white text-2xl mb-4">Login</h2>
        <form onSubmit={handleLogin} className="w-full  flex items-center flex-col">
          <div className="mb-4 sm:w-full">
            <label className="block text-white mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="sm:w-full w-64 p-2 rounded bg-gray-800 text-white"
              required
            />
          </div>
          <div className="mb-4 sm:w-full">
            <label className="block text-white mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="sm:w-full w-64 p-2 rounded bg-gray-800 text-white"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="sm:w-full w-64 p-2 bg-gray-800 hover:bg-white text-white hover:text-black font-bold rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
