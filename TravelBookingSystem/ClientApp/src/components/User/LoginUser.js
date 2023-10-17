import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import "../../styles/User/AddUserCSS.css";
import { useNavigate, useRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { encrypt, decrypt } from '../Encrypt'; 

function LoginUser() {

    //Set states for form inputs
    const [formInput, setFormInput] = useState({
        email: "",
        password: "",
    });

    // Set state for password visibility
    const [passwordVisible, setPasswordVisible] = useState(false);

    //set status for validation errors
    const [validationErrors, setValidationErrors] = useState({});

    // Toggle the visibility of the password field
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    //Handle changes of user inputs
    const newData = (name, value) => {
        setFormInput({
            ...formInput,
            [name]: value,
        });


        // Add other validation rules here
        const errors = { ...validationErrors };
        if (name === "name") {
            // Validate name field (e.g., not empty)
            errors.name = value.trim() === "" ? "Name is required" : "";
        } else if (name === "email") {
            // Validate email field (e.g., a simple email format check)
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            errors.email = !emailPattern.test(value) ? "Invalid email address" : "";
        } else if (name === "password") {
            // Validate password 
            errors.password = formInput.password.trim() === "" ? "Password is required" : "";
        }
        setValidationErrors(errors);

    };

    const isFormValid = () => {
        // Check if all fields are valid
        const errors = { ...validationErrors };
        return (
            !Object.values(errors).some((error) => error)
        )
    };



    //login to the system by validating the user inputs
    const addNewUser = async (e) => {
        e.preventDefault();

        if (isFormValid()) {
            // Prepare your requestData object for submission
            const requestData = {
                email: formInput.email,
                password: formInput.password,
            };

            //make API request to login
            fetch("api/user/login", {
                method: "POST",
                body: JSON.stringify(requestData),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    toast.success("Successfully Logged In!!");//display success message

                    console.log(data); // Check the content of the response
                    const token = data.token;
                    const role = data.role;
                    const email = data.email;
                    const name = data.name;

                    // Encrypt and store data in local storage
                    localStorage.setItem("token", encrypt(token));
                    localStorage.setItem("role", encrypt(role));
                    localStorage.setItem("email", encrypt(email));
                    localStorage.setItem("name", encrypt(name));

                    // //store data in localstorage
                    // localStorage.setItem("token", token);
                    // localStorage.setItem("role", role);
                    // localStorage.setItem("email", email);
                    // localStorage.setItem("name", name);


                    // Redirect the user to the appropriate page based on their role
                    if (role === "officer") {
                        window.location = "/officer";
                    } else if (role === "agent") {
                        window.location = "/agent";
                    } else {
                        // Redirect the user to the home page if their role is not recognized
                        window.location = "/home";
                    }
                })
                .catch((error) => {
                    console.log(requestData);
                    console.error("Error logging user: ", error);
                    toast.error("Error logging user: " + error.message);//display an error message if login failed
                });
        } else {
            toast.error("Please fix the form errors before submitting.");
        }
    };

    //Login form
    return (
        <div className="add-background">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h2>Login here</h2>
            <div className="add-schedule-container" >
                <form onSubmit={addNewUser} className='add-schedule-form'>

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

                    <p className="label">Password</p>
                    <input
                        value={formInput.password}
                        onChange={(e) => newData("password", e.target.value)}
                        name="password"
                        type={passwordVisible ? "text" : "password"}
                        className="input"
                        placeholder="Password"
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

                    <input type="submit" className="btn" value="Login" />

                    <div className='login-text'>Do not have an account?</div>

                    <input type="submit" className="btn-cancel" onClick={() => window.location = "/register"} value="Register" />
                </form>
            </div>
        </div>
    )


}

export default LoginUser;