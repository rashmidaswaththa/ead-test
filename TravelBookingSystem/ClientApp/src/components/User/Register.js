import React, { useState } from 'react';
import { toast } from 'react-toastify';
import "../../styles/User/AddUserCSS.css";

function User() {

    //Set states for form inputs
    const [formInput, setFormInput] = useState({
        id: "",
        name: "",
        nic: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
    });

    // Set state for password visibility
    const [passwordVisible, setPasswordVisible] = useState(false);
    // Set state for password visibility
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    //Set states for password matching
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    //set status for validation errors
    const [validationErrors, setValidationErrors] = useState({});

    // Toggle the visibility of the password field
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Toggle the visibility of the password field
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    //Handle changes of user inputs
    const newData = (name, value) => {
        setFormInput({
            ...formInput,
            [name]: value,
        });

        // Check if password and confirmPassword match
        if (formInput.password !== formInput.confirmPassword) {
            setPasswordsMatch(false);
        } else {
            setPasswordsMatch(true);
        }


        // Add other validation rules here
        const errors = { ...validationErrors };
        if (name === "name") {
            // Validate name field (e.g., not empty)
            errors.name = value.trim() === "" ? "Name is required" : "";
        } else if (name === "nic") {
            // Validate nic 
            const nicPattern = /([0-9]{9}[VXvx])|([0-9]{12})/;
            errors.nic = !nicPattern.test(value) ? "Invalid NIC Number" : "";
        } else if (name === "email") {
            // Validate email field (e.g., a simple email format check)
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            errors.email = !emailPattern.test(value) ? "Invalid email address" : "";
        } else if (name === "password") {
            // Validate password and confirmPassword as required fields
            errors.password = formInput.password.trim() === "" ? "Password is required" : "";
        } else if (name === "confirmPassword") {
            // Validate confirmPassword as required fields
            errors.confirmPassword = formInput.confirmPassword.trim() === "" ? "Confirm Password is required" : "";
        }

        setValidationErrors(errors);

    };

    const isFormValid = () => {
        // Check if all fields are valid
        const errors = { ...validationErrors };
        return (
            !Object.values(errors).some((error) => error) && passwordsMatch
        );
    };

    //add new user to the system by validating the user inputs
    const addNewUser = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            // Prepare your requestData object for submission
            const requestData = {
                id: formInput.id,
                name: formInput.name,
                nic: formInput.nic,
                email: formInput.email,
                password: formInput.password,
                role: formInput.role,
            };
            const authorizationToken = localStorage.getItem("token");
            //make API request to add new user
            fetch("api/user", {
                method: "POST",
                body: JSON.stringify(requestData),
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
                    toast.success("Successfully Signed In!!");//display success message
                    setTimeout(() => {
                        window.location = "/login";//navigate to the user list page after successfull registration
                    }, 1000);
                })
                .catch((error) => {
                    console.error("Error adding a new user: ", error);//set errore messages
                    toast.error("Error adding a new user: " + error.message);
                });
        } else {
            toast.error("Please fix the form errors before submitting.");
        }
    };

    //Register form
    return (
        <div className="add-background">
            <h2>Register here</h2>
            <div className="add-schedule-container">
                <form onSubmit={addNewUser} className='add-schedule-form'>

                    <p className="label">Username</p>
                    <input
                        value={formInput.name}
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

                    <p className="label">NIC</p>
                    <input
                        value={formInput.nic}
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


                    <p className="label">Email</p>
                    <input
                        value={formInput.email}
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

                    <p className="label">Password</p>
                    <input
                        value={formInput.password}
                        onChange={(e) => newData("password", e.target.value)}
                        name="password"
                        type={passwordVisible ? "text" : "password"}
                        className="input"
                        placeholder="Password"
                        required
                    />
                    <div className='check-password'>
                        <p className="password-text">Show Password</p>
                        <input
                            type="checkbox"
                            name="showPassword"
                            checked={passwordVisible}
                            onChange={togglePasswordVisibility}
                        />
                    </div>

                    {validationErrors.password && (
                        <p className="error-message">{validationErrors.password}</p>
                    )}

                    <p className="label">Confirm Password</p>
                    <input
                        value={formInput.confirmPassword}
                        onChange={(e) => newData("confirmPassword", e.target.value)}
                        name="confirmPassword"
                        type={confirmPasswordVisible ? "text" : "password"}
                        className="input"
                        placeholder="Confirm Password"
                        required
                    />
                    <div className='check-password'>
                        <p className="password-text">Show Confirm Password</p>
                        <input
                            type="checkbox"
                            name="showPassword"
                            checked={confirmPasswordVisible}
                            onChange={toggleConfirmPasswordVisibility}
                        />
                    </div>

                    {validationErrors.confirmPassword && (
                        <p className="error-message">{validationErrors.confirmPassword}</p>
                    )}

                    {!passwordsMatch && (
                        <p className="error-message">Passwords do not match</p>
                    )}

                    <p className="label">Role</p>
                    <select name="role" value={formInput.role} onChange={(e) => newData("role", e.target.value)} required>
                        <option value="">Select Role</option>
                        <option value="officer">Officer</option>
                        <option value="agent">Agent</option>
                    </select>
                    {/* <p className="error-message">{formError.role}</p> */}

                    <input type="submit" className="btn" value="Register" />

                    <div className='login-text'>Already have an account ?</div>

                    <input type="submit" className="btn-cancel" onClick={() => window.location = "/login"} value="Login" />
                </form>
            </div>
        </div>
    )


}

export default User;