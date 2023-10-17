import React, { useState, useEffect } from "react";
import "../styles/NavbarOfficer.css";
import { encrypt, decrypt } from './Encrypt'; 


export default function Navbar() {
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);

    //get username and email  from localstorage
    const name = localStorage.getItem("name");
    const decryptedName = decrypt(name);
    const email = localStorage.getItem("email");
    const decryptedEmail = decrypt(email);

    const handleLogout = () => {


        // Remove the token, role, email, and name from local storage.
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        localStorage.removeItem("name");

        // Close the logout popup.
        setIsLogoutPopupOpen(false);

        // Redirect the user to the login page.
        window.location.href = "/login";
    };

    return (
        <nav className="navigation">
            <a href="/" className="brand-name">
                Ticket Tunes
            </a>
            <button
                className="hamburger"
                onClick={() => {
                    setIsNavExpanded(!isNavExpanded);
                }}
            >
                {/* hamburger svg code... */}
            </button>
            <div
                className={
                    isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
                }
            >
                <ul>
                    <li className="link">
                        <a href="/officer">HOME</a>
                    </li>
                    <li className="link">
                        <a className="logout" onClick={() => setIsLogoutPopupOpen(true)}>
                            LOGOUT
                        </a>
                    </li>
                    <li>
                        <div className="profile">
                            <div className="icon"></div>
                            <div className="details">
                                <p className="details-name">Hello, {decryptedName}</p> <br/>
                                <p className="details-email">Email : {decryptedEmail}</p>
                            </div>

                        </div>
                    </li>
                </ul>
            </div>

            {isLogoutPopupOpen && (
                <div className="logout-popup">
                    <div className="logout-popup-content">
                        <p className="logout-text">Are you sure you want to logout?</p>
                        <div className="logout-popup-buttons">
                            <button onClick={handleLogout} className="log-btn"> Yes</button>
                            <button onClick={() => setIsLogoutPopupOpen(false)} className="log-btn">No</button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}