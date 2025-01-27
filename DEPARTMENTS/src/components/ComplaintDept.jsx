import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { StoreContext } from "../Context";
import { useNavigate } from "react-router-dom";
function ComplaintDept() {
  const { token, dept, setToken } = useContext(StoreContext);
  const url = "https://jana-sahayaka.onrender.com"
  // Get token and department from context
  const [complaints, setComplaints] = useState([]); // Store complaints
  const [error, setError] = useState(""); // Error message
  const navigate = useNavigate()
  // Function to fetch complaints
  const getComplaints = async () => {
    try {
      const response = await axios.post(
        `${url}/api/departments/complaint`,
        { departmentId: dept },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setComplaints(response.data); // Set complaints
      setError(""); // Clear errors
    } catch (error) {
      console.error("Error fetching complaints:", error);
      setError("Failed to fetch complaints. Please try again later.");
    }
  };

  // Fetch complaints on component mount or when dept/token changes
  useEffect(() => {
    if (token && dept) {
      getComplaints();
    }
  }, [token, dept]);

  // Function to handle status update
  const handleStatusChange = async (complaintId, newStatus) => {
    try {
      await axios.post(
        `${url}/api/departments/complaint/update`,
        { id: complaintId, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      getComplaints(); // Refresh complaints after updating status
    } catch (error) {
      console.error("Error updating status:", error);
      setError("Failed to update complaint status. Please try again.");
    }
  };

  return (
    <div className="p-6">
     <div className="flex justify-between items-center bg-slate-200 mb-4 py-8 px-10">
     <h1 className="text-2xl font-bold text-green-700 ">Department Complaints</h1>
     <button onClick={() => {
      setToken('')
      localStorage.removeItem("dept_token")
      navigate("/", {replace:true})
     }} className="bg-red-600 hover:bg-red-700 text-white font-medium cursor-pointer px-3 py-2  rounded-full">Log Out</button>
     </div>

      {/* Display error message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Display complaints */}
      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <div className="grid px-20 gap-4">
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="bg-white p-4 rounded-lg shadow border border-gray-200"
            >
              <h2 className="text-lg font-semibold text-green-700 mb-2">
                {complaint.title}
              </h2>
              <p className="text-sm text-gray-500">
                <strong>Category:</strong> {complaint.category}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Location:</strong> {complaint.location}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Description:</strong> {complaint.description}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Status:</strong>{" "}
                <select
                  value={complaint.status} // Pre-fill current status
                  onChange={(e) =>
                    handleStatusChange(complaint._id, e.target.value)
                  }
                  className="border border-gray-300 rounded p-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </p>
              <p className="text-sm text-gray-500">
                <strong>Created At:</strong>{" "}
                {new Date(complaint.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ComplaintDept;
