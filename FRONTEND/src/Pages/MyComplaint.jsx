import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { StoreContext } from "../Context";

const MyComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const {token, url} = useContext(StoreContext)
  const [loading, setLoading] = useState(true);

  // Fetch complaints when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${url}/api/users/complaints`, {
      headers: {
        Authorization: `${token}`, // Pass the token for authentication
      },
    })
    .then(res => {
      console.log(res.data);
      setComplaints(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching complaints:", err);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    const data = {id:id}
    try {
      await axios.post(`${url}/api/users/complaint/delete`,data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
         // Sending id in request body
      });
      setComplaints(complaints.filter(complaint => complaint._id !== id));
      toast.success("Complaint deleted successfully");
    } catch (err) {
      console.log("Error deleting complaint:", err);
      
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-5xl  mt-30 mb-20 mx-auto p-6 bg-white rounded-md shadow-md">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-green-700 mb-6">My Complaints</h1>

      {complaints.length === 0 ? (
        <p className="text-gray-500">No complaints found.</p>
      ) : (
        <div className="space-y-4">
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="p-4 border-2 border-green-700 rounded-md"
            >
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold text-green-700">
                  {complaint.title}
                </h2>
                <button
                  onClick={() => handleDelete(complaint._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
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
                <span
                  className={`${
                    complaint.status === "Pending"
                      ? "text-yellow-500"
                      : complaint.status === "Resolved"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {complaint.status}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                <strong>Assigned Department:</strong>{" "}
                {complaint.assignedDepartment}
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
};

export default MyComplaint;
