import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

import { useContext } from "react";
import { StoreContext } from "../Context";

// Register required Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

function BarChartP() {
    const [noOfComplaints, setNoOfComplaints] = useState(0);
    const [noOfInprogress, setNoOfInprogress] = useState(0);
    const [noOfResolved, setNoOfResolved] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const {url} = useContext(StoreContext)
    useEffect(() => {
        const fetchComplaintsData = async () => {
            try {
                // Fetch total complaints
                const complaintsResponse = await axios.get(
                    `${url}/api/admin/noOfComplaints`
                );
                setNoOfComplaints(complaintsResponse.data.totalComplaints);

                // Fetch total resolved complaints
                const resolvedResponse = await axios.get(
                    `${url}/api/admin/total-resolved`
                );
                setNoOfResolved(resolvedResponse.data.totalResolved);

                // Fetch total in-progress complaints
                const inProgressResponse = await axios.get(
                    `${url}/api/admin/total-in-progress`
                );
                setNoOfInprogress(inProgressResponse.data.totalInProgress);

                setIsLoading(false); // Data fetched successfully
            } catch (err) {
                console.error("Error fetching data:", err);
                setIsLoading(false); // Avoid infinite loading in case of an error
            }
        };

        fetchComplaintsData();
    }, []);

    return (
        <div className="flex flex-col items-center " style={{ width: "450px" }}>
            <h1 className="text-xl font-semibold text-gray-700 mb-4">Complaints Status</h1>

            {isLoading ? (
                <p>Loading...</p> // Show loading indicator while data is being fetched
            ) : (
                <Pie
                    data={{
                        labels: ["Complaints", "In Progress", "Resolved"],
                        datasets: [
                            {
                                label: "Complaints Status",
                                data: [noOfComplaints, noOfInprogress, noOfResolved],
                                backgroundColor: [
                                    "rgba(255, 99, 132, 0.6)",
                                    "rgba(54, 162, 235, 0.6)",
                                    "rgba(75, 192, 192, 0.6)",
                                ],
                                borderColor: [
                                    "rgba(255, 99, 132, 1)",
                                    "rgba(54, 162, 235, 1)",
                                    "rgba(75, 192, 192, 1)",
                                ],
                                borderWidth: 1,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: "top",
                                labels: {
                                    font: {
                                        size: 14,
                                    },
                                    color: "#333",
                                },
                            },
                        },
                    }}
                />
            )}
        </div>
    );
}

export default BarChartP;
