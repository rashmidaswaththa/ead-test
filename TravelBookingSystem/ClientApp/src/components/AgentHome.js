import React, { Component } from "react";
import "../styles/OfficerHome/OfficerCSS.css";
import { useNavigate } from 'react-router-dom';
import Nav from "./Navbar";

function Agent() {

    const navigate = useNavigate();

    const handleNavigate = () => {
        // Navigate to the edit page with the schedule's ID as a URL parameter
        navigate("/bookingList");
    };


    return (
        
        <div className="add-background">
            <Nav />
            <div className="button-background-agent">
                <div className="main-btn-div">
                    <div className="btn-div">
                        <button className="btn" onClick={() => handleNavigate()}>Reservation Management</button>
                    </div>
                </div>
            </div>
        </div>



    );


}

export default Agent;