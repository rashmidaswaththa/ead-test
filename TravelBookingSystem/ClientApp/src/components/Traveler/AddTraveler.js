import React, { useState } from 'react';
import { toast } from 'react-toastify';
import "../../styles/User/AddUserCSS.css";
import { useNavigate } from 'react-router-dom';

function Traveler() {

    //Set states for form inputs
    const [formInput, setFormInput] = useState({
        id: "",
        name: "",
        address: "",
        email: "",
        contactNo: "",
        nic: "",
        activeStatus: "",
    });

    //set status for validation errors
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    //Handle changes of user inputs
    const newData = (name, value) => {

        //set form inputs into setFormInput method
        setFormInput({
            ...formInput,
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
    const addNewTraveler = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            // Prepare your requestData object for submission
            const requestData = {
                id: formInput.id,
                name: formInput.name,
                address: formInput.address,
                email: formInput.email,
                contactNo: formInput.contactNo,
                nic: formInput.nic,
            };
            const authorizationToken = localStorage.getItem("token");
            //Send POST request to your API endpoint with the "Content-Type" header
            fetch("api/traveler", {
                method: "POST",
                body: JSON.stringify(requestData),// Serialize the scheduleData object to JSON
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authorizationToken}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");//set errors
                    }
                    return response.json();
                })
                .then((data) => {
                    toast.success("Successfully Added New Traveler!!");//display success message
                    setTimeout(() => {
                        window.location = "/list";//navigate to the user list page after successfull registration
                    }, 1000);
                })
                .catch((error) => {
                    //set errore messages
                    console.error("Error adding a new traveler: ", error);//set errore messages
                    toast.error("Error adding a new traveler: " + error.message);
                });
        } else {
            toast.error("Please fix the form errors before submitting.");
        }
    };

    //Register form
    return (
        <div className="add-background">
            <br></br>
            <h2>Add Traveler</h2>
            <div className="add-schedule-container">
                <form onSubmit={addNewTraveler} className='add-schedule-form'>
                    <p className="label">Full Name</p>
                    <input
                        value={formInput.name}
                        onChange={(e) => newData("name", e.target.value)}
                        name="name"
                        type="text"
                        className="input"
                        placeholder="Enter Username"
                    />
                    {validationErrors.name && (
                        <p className="error-message">{validationErrors.name}</p>
                    )}

                    <p className="label">Address</p>
                    <input
                        value={formInput.address}
                        onChange={(e) => newData("address", e.target.value)}
                        name="address"
                        type="text"
                        className="input"
                        placeholder="Enter Address"
                    />
                    {validationErrors.address && (
                        <p className="error-message">{validationErrors.address}</p>
                    )}

                    <p className="label">Email</p>
                    <input
                        value={formInput.email}
                        onChange={(e) => newData("email", e.target.value)}
                        name="email"
                        type="email"
                        className="input"
                        placeholder="Enter Email"
                    />
                    {validationErrors.email && (
                        <p className="error-message">{validationErrors.email}</p>
                    )}

                    <p className="label">Contact Number</p>
                    <input
                        value={formInput.contactNo}
                        onChange={(e) => newData("contactNo", e.target.value)}
                        name="contactNo"
                        type="tel"
                        className="input"
                        placeholder="Enter Contact Number (0xx-xxxxxxx)"
                    />
                    {validationErrors.contactNo && (
                        <p className="error-message">{validationErrors.contactNo}</p>
                    )}

                    <p className="label">NIC</p>
                    <input
                        value={formInput.nic}
                        onChange={(e) => newData("nic", e.target.value)}
                        name="nic"
                        type="text"
                        className="input"
                        placeholder="Enter NIC"
                    />
                    {validationErrors.nic && (
                        <p className="error-message">{validationErrors.nic}</p>
                    )}

                    <input type="submit" className="btn" value="Add Traveler" />

                    <input type="submit" className="btn-cancel" onClick={() => navigate("/list")} value="Cancel" />
                </form>
            </div>
        </div>
    )


}

export default Traveler;