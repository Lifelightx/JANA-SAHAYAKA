import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { StoreContext } from "../Context";

function ComplaintDept() {
  const { token, dept } = useContext(StoreContext); // Get token and department from context
  const [complaints, setComplaints] = useState([]); // Store complaints
  const [error, setError] = useState(""); // Error message

  // Function to fetch complaints
  const getComplaints = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/departments/complaint",
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
        "http://localhost:5000/api/departments/complaint/update",
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
      <h1 className="text-2xl font-bold text-green-700 mb-6">Department Complaints</h1>

      {/* Display error message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Display complaints */}
      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <div className="grid gap-4">
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
