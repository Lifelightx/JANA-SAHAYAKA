import React, { useContext, useState } from "react";
import districtsData from "../assets/districts.json"; // Import your JSON file
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "../Context";
const Signup = () => {
    const {url }= useContext(StoreContext)
    const [formData, setFormData] = useState({
        aadhaar: "",
        name: "",
        phoneNo: "",
        email: "",
        password: "",
        district: "",
        tahsil: "",
        village: "",
        img: null,
    });

    const [tahsils, setTahsils] = useState([]);
    const [villages, setVillages] = useState([]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "district") {
            setTahsils(Object.keys(districtsData[value].tahsil));
            setVillages([]);
            setFormData({ ...formData, district: value, tahsil: "", village: "" });
        } else if (name === "tahsil") {
            setVillages(districtsData[formData.district].tahsil[value]);
            setFormData({ ...formData, tahsil: value, village: "" });
        } else if (name === "img") {
            setFormData({ ...formData, img: e.target.files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Handle form submission
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        axios.post(`${url}/api/users/register`, formData)
            .then(res => {
                toast.success(res.data.message)
                setTimeout(() => {
                    navigate('/login')
                }, 2000);
                setFormData({
                    aadhaar: "",
                    name: "",
                    phoneNo: "",
                    email: "",
                    password: "",
                    district: "",
                    tahsil: "",
                    village: "",
                    img: null,
                })
            })
            .catch(err => console.log(err))
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-4xl mx-auto bg-white p-8 shadow-md rounded-md mt-10 mb-10">
                <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Sign up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Aadhaar */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700">Aadhaar</label>
                            <input
                                type="text"
                                name="aadhaar"
                                value={formData.aadhaar}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-2 border-green-700 shadow-sm focus:ring-green-700 focus:border-green-700 py-3 px-2  text-slate-700"
                                required
                            />
                        </div>

                        {/* Name */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-2 border-green-700 shadow-sm focus:ring-green-700 focus:border-green-700 py-3 px-2 text-slate-700"
                                required
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700">Phone Number</label>
                            <input
                                type="tel"
                                name="phoneNo"
                                value={formData.phoneNo}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-2 border-green-700 shadow-sm focus:ring-green-700 focus:border-green-700 py-3 px-2 text-slate-700"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-2 border-green-700 shadow-sm focus:ring-green-700 focus:border-green-700 py-3 px-2 text-slate-700"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-2 border-green-700 shadow-sm focus:ring-green-700 focus:border-green-700 py-3 px-2 text-slate-700"
                                required
                            />
                        </div>

                        {/* Upload Image */}

                    </div>

                    {/* Location Fields in Single Line */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        {/* District */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700">District</label>
                            <select
                                name="district"
                                value={formData.district}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-2 border-green-700 shadow-sm focus:ring-green-700 focus:border-green-700 py-3 px-2 text-slate-700"
                                required
                            >
                                <option value="">Select District</option>
                                {Object.keys(districtsData).map((district) => (
                                    <option key={district} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Tahsil */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Tahsil</label>
                            <select
                                name="tahsil"
                                value={formData.tahsil}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-2 border-green-700 shadow-sm focus:ring-green-700 focus:border-green-700 py-3 px-2 text-slate-700"
                                required
                                disabled={!tahsils.length}
                            >
                                <option value="">Select Tahsil</option>
                                {tahsils.map((tahsil) => (
                                    <option key={tahsil} value={tahsil}>
                                        {tahsil}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Village */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Village</label>
                            <select
                                name="village"
                                value={formData.village}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-2 border-green-700 shadow-sm focus:ring-green-700 focus:border-green-700 py-3 px-2 text-slate-700"
                                required
                                disabled={!villages.length}
                            >
                                <option value="">Select Village</option>
                                {villages.map((village) => (
                                    <option key={village} value={village}>
                                        {village}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 focus:ring-2 focus:ring-green-700 focus:outline-none"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
