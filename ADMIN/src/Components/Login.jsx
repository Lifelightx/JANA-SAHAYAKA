import React, { useContext, useState } from 'react';
import axios from 'axios';
import bgImg from '../assets/villageImg.jpg';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../Context';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { SetAdminToken, url } = useContext(StoreContext)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { adminId: username, adminPassword: password }
    console.log(formData)
    axios.post(`${url}/api/admin/login`, formData)
      .then(response => {
        localStorage.setItem("admin_token", response.data.token)
        SetAdminToken(response.data.message)
        toast.success(response.data.message)
        navigate('/home')
      })
      .catch(error => {
        console.error('Login failed:', error.response.data.message); // Changed to access the error message from the response
        toast.error(error.response.data.message); // Display the error message to the user
      });
  };

  return (
    <div className="relative w-full h-screen">

      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(5px)',
        }}
      ></div>
      <ToastContainer />
      {/* Login Form */}
      <div className="relative flex justify-center items-center h-full">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 z-10"
        >
          <label htmlFor="username" className="block text-sm font-bold mb-2">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          <label htmlFor="password" className="block text-sm font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
