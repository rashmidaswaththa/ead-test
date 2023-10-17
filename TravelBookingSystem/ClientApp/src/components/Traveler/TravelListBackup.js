import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../../styles/User/UserListCss.css";

function TravelersList() {
    //set state for travelers details
    const [travelers, setTravelers] = useState([]);
    //set state for filtered travelers details
    const [filteredTravelers, setFilteredTravelers] = useState([]);
    //set state for travelers active status
    const [statusUpdates, setStatusUpdates] = useState({});
    const [showStatusDropdowns, setShowStatusDropdowns] = useState({});
    //set state for search travelers details
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    //retrieve all the travelers details 
    useEffect(() => {
        async function fetchSchedules() {
            try {
                const response = await fetch("/api/traveler");
                if (response.ok) {
                    const data = await response.json();
                    setTravelers(data);
                    setFilteredTravelers(data);
                } else {
                    console.error("Failed to fetch travelers.");//display errors
                }
            } catch (error) {
                console.error("Error:", error);//display errors
            }
        }

        fetchSchedules();
    }, []);


    const handleStatusChange = async (id, newStatus) => {
        try {
            // Create an updated traveler object with the new status
            const updatedTraveler = {
                ...travelers.find((traveler) => traveler.id === id),
                activeStatus: newStatus,
            };

            // Send a PUT request to update the traveler status in the API
            const response = await fetch(`/api/traveler/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTraveler),
            });

            if (response.ok) {
                // Active status updated successfully
                console.log("Active status updated successfully");

                // Update the 'travelers' state with the updated status
                setTravelers((prevTravelers) =>
                    prevTravelers.map((traveler) =>
                        traveler.id === id ? { ...traveler, activeStatus: newStatus } : traveler
                    )
                );
                window.location.reload();
            } else {
                // Handle the case where the update request failed
                console.error("Failed to update active status");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDeleteClick = async (id) => {
        // Display a window.confirm dialog for the delete confirmation
        const confirmed = window.confirm("Are you sure you want to delete this traveler?");
        const authorizationToken = localStorage.getItem("token");
        if (confirmed) {

            // Send a DELETE request to remove the schedule from the API
            try {
                const response = await fetch(`/api/traveler/${id}`, {
                    method: "DELETE",
                    Authorization: `Bearer ${authorizationToken}`,
                });

                if (response.ok) {
                    // Traveler deleted successfully
                    console.log("Traveler deleted successfully");

                    // Update the 'travelers' state by removing the deleted traveler
                    setTravelers((prevTravelers) =>
                        prevTravelers.filter((traveler) => traveler.id !== id)
                    );
                    window.location.reload();//reload the existing page
                } else {
                    // Handle the case where the delete request failed
                    console.error("Failed to delete traveler");
                }
            } catch (error) {
                console.error("Error:", error);//set error
            }
        }
    };

    // Function to handle editing a traveler
    const handleEditClick = (id) => {
        // Navigate to the edit page with the schedule's ID as a URL parameter
        navigate("/editTraveler?id=" + id);
    };

    // Function to handle adding a traveler
    const handleAddClick = (id) => {
        // Navigate to the edit page with the schedule's ID as a URL parameter
        navigate("/addTraveler");
    };


    const handleSearch = (event) => {
        const searchValue = event.target.value;
        setSearchTerm(searchValue);

        // Define the NIC pattern as a regular expression
        const nicPattern = /([0-9]{9}[VXvx])|([0-9]{12})/;

        // Filter the travelers based on the NIC pattern and search term
        const filtered = travelers.filter((traveler) =>
            nicPattern.test(traveler.nic) && traveler.nic.toLowerCase().includes(searchValue.toLowerCase())
        );

        setFilteredTravelers(filtered);
    };

    return (
        <div className="add-background">
            <br></br>
            <br></br>
            <br></br>
            <h2>Traveler List</h2>

            <div className="schedule-list-container">
                <div className="schedule-search">
                    <label htmlFor="search">Search Traveler By NIC:</label>
                    <input
                        type="text"
                        id="search"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>


                <div>
                    <button
                        className="add-new-schedule-btn"
                        onClick={() => handleAddClick()}
                    >
                        Add New Traveler
                    </button>
                </div>

                <table className="schedule-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th>NIC</th>
                            <th>Active Status</th>
                            <th>Update Status</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTravelers.map((traveler) => (
                            <tr key={traveler.id}>
                                <td>{traveler.name}</td>
                                <td>{traveler.address}</td>
                                <td>{traveler.email}</td>
                                <td>{traveler.contactNo}</td>
                                <td>{traveler.nic}</td>
                                <td>
                                    {traveler.activeStatus}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleStatusChange(traveler.id, "Active")}
                                        className="update-status-btn"
                                    >
                                        Active
                                    </button>
                                    <div className="status-btn">
                                        <button
                                            onClick={() => handleStatusChange(traveler.id, "Inactive")}
                                            className="update-status-btn"
                                        >
                                            Inactive
                                        </button>
                                    </div>

                                </td>
                                <td>
                                    <button onClick={() => handleEditClick(traveler.id)} className="edit-btn">Edit</button>

                                </td>
                                <td>
                                    <button onClick={() => handleDeleteClick(traveler.id)} className="delete-btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TravelersList;
