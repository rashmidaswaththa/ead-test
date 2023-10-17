import React, { Component } from "react";
import "../styles/OfficerHome/OfficerCSS.css";
import Nav from "./Navbar";
import { useNavigate } from 'react-router-dom';

function Officer() {

    const navigate = useNavigate();

    const handleUser = () => {
        // Navigate to the edit page with the schedule's ID as a URL parameter
        navigate("/listUser");
    };

    const handleTraveler = () => {
        // Navigate to the edit page with the schedule's ID as a URL parameter
        navigate("/list");
    };

    const handleTrain = () => {
        // Navigate to the edit page with the schedule's ID as a URL parameter
        navigate("/trainList");
    };

    const handleSchedule = () => {
        // Navigate to the edit page with the schedule's ID as a URL parameter
        navigate("/scheduleList");
    };


    return (
        
        <div className="add-background">
            <Nav />
            <div className="button-background">
                <div className="main-btn-div">
                    <div className="btn-div">
                        <button className="btn" onClick={() => handleUser()}>User Management</button>
                    </div>

                    <div className="btn-div-two">
                        <button className="btn" onClick={() => handleTraveler()}>Traveler Management</button>
                    </div>

                    <div className="btn-div-two">
                        <button className="btn" onClick={() => handleTrain()}>Train Management</button>
                    </div>

                    <div className="btn-div-two">
                        <button className="btn" onClick={() => handleSchedule()}>Schedule Management</button>
                    </div>
                </div>
            </div>
        </div>



    );


}

export default Officer;