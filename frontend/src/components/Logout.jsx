import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Logout.css'; // Import the CSS file for styling

const Logout = ({ onLogout }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    const confirmLogout = async () => {
        try {
            const response = await fetch("http://localhost:5000/auth/logout", { method: "POST" });

            if (response.ok) {
                localStorage.removeItem("userId");
                onLogout();
                navigate("/");
            } else {
                console.error("Logout failed.");
            }
        } catch (error) {
            console.error("Error logging out:", error);
        } finally {
            setShowConfirmation(false);
        }
    };

    return (
        <div className="logout-container">
            <button className="btn btn-warning btn-sm" onClick={() => setShowConfirmation(true)}>Log Out</button>

            {showConfirmation && (
                <div className="confirmation-popup">
                    <p>Are you sure you want to log out?</p>
                    <button className="confirm-btn" onClick={confirmLogout}>Confirm</button>
                    <button className="cancel-btn" onClick={() => setShowConfirmation(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Logout;
