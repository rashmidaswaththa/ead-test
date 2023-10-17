import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../../styles/User/UserListCss.css";
import { toast } from 'react-toastify';

function TravelersList() {
    //set state for users details
    const [users, setUsers] = useState([]);
    //set state for filtered users details
    const [filteredUsers, setFilteredUsers] = useState([]);
    //set state for search travelers details
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    //retrieve all the travelers details 
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch("/api/user");
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                    setFilteredUsers(data);
                } else {
                    console.error("Failed to fetch users.");//display errors
                }
            } catch (error) {
                console.error("Error:", error);//display errors
            }
        }

        fetchUsers();
    }, []);


    const handleDeleteClick = async (id) => {
        // Display a window.confirm dialog for the delete confirmation
        const confirmed = window.confirm("Are you sure you want to delete this user?");
        const authorizationToken = localStorage.getItem("token");
        if (confirmed) {
            // Send a DELETE request to remove the schedule from the API
            try {
                const response = await fetch(`/api/user/${id}`, {
                    method: "DELETE",
                    Authorization: `Bearer ${authorizationToken}`,
                });

                if (response.ok) {
                    // User deleted successfully
                    toast.success("User deleted successfully");

                    // Update the 'users' state by removing the deleted traveler
                    setUsers((prevUsers) =>
                        prevUsers.filter((user) => user.id !== id)
                    );
                    window.location.reload();//reload the existing page
                } else {
                    // Handle the case where the delete request failed
                    toast.error("Failed to delete traveler");
                }
            } catch (error) {
                console.error("Error:", error);//set error
            }
        }
    };

    // Function to handle editing a traveler
    const handleEditClick = (id) => {
        // Navigate to the edit page with the schedule's ID as a URL parameter
        navigate("/userEdit?id=" + id);
    };

     // Function to handle adding a traveler
     const handleAddClick = (id) => {
        // Navigate to the edit page with the schedule's ID as a URL parameter
        navigate("/addUser");
    };

    const handleSearch = (event) => {
        const searchValue = event.target.value;
        setSearchTerm(searchValue);

        // Define the NIC pattern as a regular expression
        const nicPattern = /([0-9]{9}[VXvx])|([0-9]{12})/;

        // Filter the travelers based on the NIC pattern and search term
        const filtered = users.filter((user) =>
            nicPattern.test(user.nic) && user.nic.toLowerCase().includes(searchValue.toLowerCase())
        );

        setFilteredUsers(filtered);
    };

    return (
        <div className="add-background">
            <br></br>
            <br></br>
            <br></br>
            <h2>User List</h2>

            <div className="schedule-list-container">
                <div className="schedule-search">
                    <label htmlFor="search">Search User By NIC:</label>
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
                        Add New User
                    </button>
                </div>

                <table className="schedule-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>NIC</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.nic}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button onClick={() => handleEditClick(user.id)} className="edit-btn">Edit</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteClick(user.id)} className="delete-btn">Delete</button>
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
