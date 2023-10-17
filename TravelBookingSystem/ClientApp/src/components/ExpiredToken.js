import React, { Component } from "react";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";

export default function Token() {

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            var decoded = jwt_decode(token);
            const expirationDate = decoded.exp; // Convert to milliseconds
            const currentTime = Date.now();

            if (expirationDate <= currentTime) {
                // The token has expired, show an alert
                alert("Your token is expired. Please log in again.");

                // Navigate to the login page
                window.location.href = "/login";
            }
        }
    }, [token]);

    return null;


}