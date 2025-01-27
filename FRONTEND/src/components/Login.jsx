import React, { useContext, useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { StoreContext } from '../Context';
import { useNavigate } from 'react-router-dom';

function Login() {
    const {setToken, url} = useContext(StoreContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit =(e) => {
        e.preventDefault();
        axios.post(`${url}/api/users/login`, formData)
            .then(res => {
                localStorage.setItem("token",res.data.token)
                console.log(localStorage.getItem("token"))
                setToken(res.data.token)
                if (res.data.token){
                    toast.success("Login Successfully")
                        navigate("/userPage")
                }
                
            })
            .catch(err => toast.warn("Failed to Login"))

    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded-md mt-10">
        <ToastContainer />
            <h2 className="text-2xl font-bold text-green-600 mb-6">Login</h2>
            <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-2 border-slate-600 shadow-sm focus:ring-green-500 focus:border-green-500 py-3 px-2 text-slate-700"
                        required
                    />
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-2 border-slate-600 shadow-sm focus:ring-green-500 focus:border-green-500 py-3 px-2 text-slate-700"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login