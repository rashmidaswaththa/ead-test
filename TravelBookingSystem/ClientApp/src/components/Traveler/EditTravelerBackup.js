import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "../../styles/User/AddUserCSS.css";

function EditTraveler() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        address: "",
        email: "",
        contactNo: "",
        nic: "",
        activeStatus: "", // Set an initial value
    });

    //set state for id parameter
    const [uid, setUid] = useState("");

    //set status for validation errors
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        // Fetch the train details by ID when the component mounts
        let id_ = window.location.search;
        if (id_) {
            id_ = id_.split("=")[1];
        }

        //retrieve user details related to the given id
        if (id_) {
            setUid(id_);
            const fetchUserById = async () => {
                try {
                    const response = await fetch("api/traveler/" + id_);
                    if (response.ok) {
                        const data = await response.json();
                        setFormData(data);
                    } else {
                        console.error('Failed to fetch user');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            };

            fetchUserById();

        }

    }, []);


    if (!formData) {
        return <div>Traveler not found</div>;
    }

    // Function to show confirmation dialog
    const showConfirmDialog = () => {
        return window.confirm('Are you sure you want to save changes?');
    };

    const newData = (name, value) => {

        //set form inputs into setformData method
        setFormData({
            ...formData,
            [name]: value,
        });



        // Add other validation rules 
        const errors = { ...validationErrors };
        if (name === "name") {
            // Validate name field (e.g., not empty)
            errors.name = value.trim() === "" ? "Name is required" : "";
        } else if (name === "address") {
            // Validate name field (e.g., not empty)
            errors.address = value.trim() === "" ? "Address is required" : "";
        } else if (name === "email") {
            // Validate email field (e.g., a simple email format check)
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            errors.email = !emailPattern.test(value) ? "Invalid email address" : "";
        } else if (name === "contactNo") {
            // Validate email field (e.g., a simple email format check)
            const phonePattern = /^[0-9]{3}-[0-9]{7}$/;
            errors.contactNo = !phonePattern.test(value) ? "Invalid Contact Number" : "";
        } else if (name === "nic") {
            // Validate nic 
            const nicPattern = /([0-9]{9}[VXvx])|([0-9]{12})/;
            errors.nic = !nicPattern.test(value) ? "Invalid NIC Number" : "";
        }

        setValidationErrors(errors);

    };

    const isFormValid = () => {
        // Check if all fields are valid
        const errors = { ...validationErrors };
        return (
            !Object.values(errors).some((error) => error)
        );
    };

    //add new user to the system by validating the user inputs
    const updateTraveler = async (e) => {
        e.preventDefault();

        if (!showConfirmDialog()) {
            // If the user cancels the confirmation, do not proceed with the submission
            return;
        }

        if (isFormValid()) {
            // Prepare your requestData object for submission
            const requestData = {
                id: formData.id,
                name: formData.name,
                address: formData.address,
                email: formData.email,
                contactNo: formData.contactNo,
                nic: formData.nic,
                activeStatus:  formData.activeStatus
            };
            const authorizationToken = localStorage.getItem("token");
            //Send POST request to your API endpoint with the "Content-Type" header
            const response = await fetch("api/traveler/" + uid, {
                method: "PUT",
                body: JSON.stringify(requestData),
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${authorizationToken}`,
                }
            });
            if (response.ok) {
                toast.success("Successfully  Updated !!");
                console.log('Traveler updated successfully');
                // Redirect to the train list or perform other actions
                setTimeout(() => {
                    window.location = "/list";
                }, 1000);
            } else {
                console.log(response);
                console.error(`Failed to update traveler with ID ${uid}`);
            }
        } else {
            toast.error("Please fix the form errors before submitting.");
        }
    };

    return (
        <div className="add-background">
            <br></br>
            <h2>Update Traveler</h2>
            <div className="add-schedule-container">
                <form onSubmit={updateTraveler} className='add-schedule-form'>
                    <p className="label">Full Name</p>
                    <input
                        value={formData.name}
                        onChange={(e) => newData("name", e.target.value)}
                        name="name"
                        type="text"
                        className="input"
                        placeholder="Enter Username"
                        required
                    />
                    {validationErrors.name && (
                        <p className="error-message">{validationErrors.name}</p>
                    )}

                    <p className="label">Address</p>
                    <input
                        value={formData.address}
                        onChange={(e) => newData("address", e.target.value)}
                        name="address"
                        type="text"
                        className="input"
                        placeholder="Enter Address"
                        required
                    />
                    {validationErrors.address && (
                        <p className="error-message">{validationErrors.address}</p>
                    )}

                    <p className="label">Email</p>
                    <input
                        value={formData.email}
                        onChange={(e) => newData("email", e.target.value)}
                        name="email"
                        type="email"
                        className="input"
                        placeholder="Enter Email"
                        required
                    />
                    {validationErrors.email && (
                        <p className="error-message">{validationErrors.email}</p>
                    )}

                    <p className="label">Contact Number</p>
                    <input
                        value={formData.contactNo}
                        onChange={(e) => newData("contactNo", e.target.value)}
                        name="contactNo"
                        type="tel"
                        className="input"
                        placeholder="Enter Contact Number (0xx-xxxxxxx)"
                        required
                    />
                    {validationErrors.contactNo && (
                        <p className="error-message">{validationErrors.contactNo}</p>
                    )}

                    <p className="label">NIC</p>
                    <input
                        value={formData.nic}
                        onChange={(e) => newData("nic", e.target.value)}
                        name="nic"
                        type="text"
                        className="input"
                        placeholder="Enter NIC"
                        required
                    />
                    {validationErrors.nic && (
                        <p className="error-message">{validationErrors.nic}</p>
                    )}

                    <p className="label">Active Status</p>
                    <select
                        id="activeStatus"
                        name="activeStatus"
                        value={formData.activeStatus}
                        onChange={(e) => newData("activeStatus", e.target.value)}
                        required
                    >
                        
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>

                    <input type="submit" className="btn" value="Update Traveler" />

                    <input type="submit" className="btn-cancel" onClick={() => window.location = "/list"} value="Cancel" />
                </form>
            </div>
        </div>
    );
}

export default EditTraveler;
