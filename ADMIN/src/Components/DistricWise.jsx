import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";
import { StoreContext } from "../Context";
import { useContext } from "react";

function DistrictWise() {
  const [labels, setLabels] = useState([]); // State for labels
  const [data, setData] = useState([]); // State for data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  
  const {url }= useContext(StoreContext)
  useEffect(() => {
    const fetchComplaintsData = async () => {
      try {
        const response = await axios.get(
          `${url }/api/admin/dashComplaints`
        );

        // Extract the assigned department and count occurrences
        const departments = response.data.map(
          (complaint) => complaint.assignedDepartment
        );
        const counts = departments.reduce((acc, department) => {
          acc[department] = (acc[department] || 0) + 1;
          return acc;
        }, {});

        // Prepare labels and data
        setLabels(Object.keys(counts));
        setData(Object.values(counts));
      } catch (error) {
        console.error("Error fetching complaints data:", error);
      } finally {
        setIsLoading(false); // Set loading to false
      }
    };

    fetchComplaintsData();
  }, []);
  
  return (
    <div className="flex flex-col  items-center mt-8  rounded-lg ">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Category Wise Complaints
      </h2>
      {isLoading ? (
        <p>Loading...</p> // Show loading message until data is fetched
      ) : (
        <div style={{ height:"500px", width:"600px"}}>
            <Bar
          data={{
            labels: labels, 
            datasets: [
              {
                label: "Comp",
                data: data, 
                backgroundColor: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(75, 192, 192, 0.6)",
                  "rgba(153, 102, 255, 0.6)",
                  "rgba(255, 159, 64, 0.6)",
                  "rgba(255, 99, 132, 0.6)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(255, 99, 132, 1)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          
        />
        </div>
      )}
    </div>
  );
}

export default DistrictWise;
