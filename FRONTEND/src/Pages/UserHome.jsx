import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserHome() {
    const navigate = useNavigate();

    // State to store user details
    const [userDetails, setUserDetails] = useState({
        aadhaar: "",
        name: "",
        phoneNo: "",
        email: "",
        password: "",
        district: "",
    });
    const token = localStorage.getItem("token")
    if (!token){
        navigate("/", {replace:true})
    }

    // Fetch user data from backend
    useEffect(() => {
        const token = localStorage.getItem("token");
        // Retrieve token from localStorage
        if (!token) {
            navigate("/");
        } else {
            axios
                .get("http://localhost:5000/api/users/user_info", {
                    headers: { Authorization: `${token}` },
                })
                .then((response) => {
                    console.log(response.data);
                    setUserDetails(response.data) // Set user details
                })
                .catch((error) => {
                    console.log("Error fetching user details:", error.response?.data|| error.message);
                });
        }
    }, [navigate]);

    // Register Complaint Handler
    const handleRegisterComplaint = () => {
        // navigate("/register-complaint"); // Navigate to complaint registration page
    };

    return (
        <div className="max-w-4xl mt-30 mb-20 mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-3xl font-bold text-green-600 mb-6">User Details</h1>

            {/* User Details Section */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="font-medium text-slate-600">Aadhaar:</p>
                    <p className="text-slate-800">{userDetails.aadhaar || "N/A"}</p>
                </div>
                <div>
                    <p className="font-medium text-slate-600">Name:</p>
                    <p className="text-slate-800">{userDetails.name || "N/A"}</p>
                </div>
                <div>
                    <p className="font-medium text-slate-600">Phone Number:</p>
                    <p className="text-slate-800">{userDetails.phoneNo || "N/A"}</p>
                </div>
                <div>
                    <p className="font-medium text-slate-600">Email:</p>
                    <p className="text-slate-800">{userDetails.email || "N/A"}</p>
                </div>
                <div>
                    <p className="font-medium text-slate-600">Password:</p>
                    <p className="text-slate-800">********</p>
                </div>
                <div>
                    <p className="font-medium text-slate-600">District:</p>
                    <p className="text-slate-800">{userDetails.district || "N/A"}</p>
                </div>
            </div>

            {/* Register Complaint Button */}
            <div className="mt-8 flex gap-4">
                <button
                    onClick={() => navigate('/submitComplaint')}
                    className="w-1/2 bg-green-600 cursor-pointer text-white py-3 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
                >
                    Register a new Complaint
                </button>
                <button
                    onClick={() => navigate('/complaints')} 
                    className="w-1/2 bg-blue-600 cursor-pointer text-white py-3 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                    Check Status
                </button>
            </div>
        </div>
    );
}

export default UserHome;
