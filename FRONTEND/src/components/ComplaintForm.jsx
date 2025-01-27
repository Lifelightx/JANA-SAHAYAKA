import axios from "axios";
import React, { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { StoreContext } from "../Context";


const ComplaintForm = () => {
  const {url }= useContext(StoreContext)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    img: null,
    departmentId: "" // Added departmentId to initial state
  });

  // List of categories (can be extended)
  const categories = [
    "Road Issues",
    "Water Supply",
    "Electricity",
    "Sanitation",
    "Agriculture",
    "Health Services",
    "Education",
    "Waste Management",
    "Public Transport",
    "Flood/Drainage",
    "Street Lighting",
    "Land Disputes",
    "Illegal Activities",
    "Employment",
    "Housing",
    "Other",
  ];

  // List of departmentIds
  const departmentIds = [
    "water_supply",
    "sanitary",
    "road",
    "electricity",
    "health",
    "education"
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "img") {
      setFormData({ ...formData, img: e.target.files[0] }); // Handle file input
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const token = localStorage.getItem("token")
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(token)
    axios.post(`${url}/api/users/complaint`, formData,
      {
        headers: { Authorization: `Bearer ${token}` },

      }
    ).then(res => toast.success(res.data.message))
      .catch(err => console.log(err))

    setFormData(
      {
        title: "",
        category: "",
        description: "",
        img: null,
        departmentId: ""
      }
    )
  };

  return (
    <div className="max-w-3xl mt-27 mb-20 mx-auto bg-white p-8 shadow-md rounded-md">
      <ToastContainer/>
      <h2 className="text-2xl font-bold text-green-700 mb-6">
        Submit Your Complaint
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Complaint Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Complaint Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-2 border-green-700 px-3 py-2 shadow-sm focus:ring-green-700 focus:border-green-700"
            placeholder="Enter the complaint title"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-2 border-green-700 px-3 py-2 shadow-sm focus:ring-green-700 focus:border-green-700"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* DepartmentId */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            DepartmentId
          </label>
          <select
            name="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-2 border-green-700 px-3 py-2 shadow-sm focus:ring-green-700 focus:border-green-700"
            required
          >
            <option value="">Select a departmentId</option>
            {departmentIds.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-2 border-green-700 px-3 py-2 shadow-sm focus:ring-green-700 focus:border-green-700"
            placeholder="Describe your complaint in detail"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Upload Image */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload Image (Optional)
          </label>
          <input
            type="file"
            name="img"
            onChange={handleChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:text-sm file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
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
  );
};

export default ComplaintForm;
