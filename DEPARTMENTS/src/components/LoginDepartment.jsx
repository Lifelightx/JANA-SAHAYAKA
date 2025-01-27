import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { StoreContext } from "../Context";
import {useNavigate} from 'react-router-dom'


function LoginDepartment() {

  const [formData, setFormData] = useState({
    departmentId: "",
    departmentPassword: ""
  });
  const {setToken, setDept,dept} = useContext(StoreContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    axios.post("http://localhost:5000/api/departments/login", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.data.message) {
          
          setDept(formData.departmentId)
          localStorage.setItem("dept_id",formData.departmentId)
          localStorage.setItem("dept_token", response.data.token);
          setToken(response.data.token)
          navigate("/department")
          console.log("My dept: ",dept)
        }
      })
      .catch((err) => {
        // Handle the error response
        console.error(err.response?.data?.message || "An error occurred.");
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
          Department Login
        </h2>
        <div className="mb-4">
          <label
            htmlFor="departmentId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Department ID
          </label>
          <input
            type="text"
            id="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
            placeholder="Enter your ID"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="departmentPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="departmentPassword"
            value={formData.departmentPassword}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-700 text-white font-bold py-2 px-4 rounded hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginDepartment;
