import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ onLogout }) => {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        setShowPopup(true); // Show popup

        try {
            const response = await fetch("http://localhost:5000/auth/logout", { method: "POST" });

            if (response.ok) {
                localStorage.removeItem("userId"); // Clear session storage
                onLogout(); // Update UI state

                setTimeout(() => {
                    setShowPopup(false); // Hide popup after 2 seconds
                    navigate("/"); // Redirect to main UI
                }, 2000);
            } else {
                console.error("Logout failed.");
            }
        } catch (error) {
            console.error("Error logging out:", error);
            setShowPopup(false); // Hide popup on error
        }
    };

    return (
        <div className="logout-container">
            <button className="btn btn-warning btn-sm" onClick={() => navigate("/login")}>Log Out</button>
            
            {showPopup && (
                <div className="popup">
                    <p>Logging out...</p>
                </div>
            )}
        </div>
    );
};

export default Logout;
