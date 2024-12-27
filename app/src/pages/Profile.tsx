/**
 * Profile Component
 *
 * This component displays and manages the user's profile. Users can view, edit, and save their
 * profile details. The component communicates with the backend to fetch and update profile data.
 * It also provides a logout functionality to clear the user session.
 *
 * Features:
 * - Fetch and display user profile data
 * - Edit and save profile details
 * - Logout functionality to clear session and redirect to login
 * - Error handling and user feedback
 *
 * Dependencies:
 * - React
 * - Material-UI for UI components
 * - React Router for navigation
 * - Axios for API requests (via `authService`)
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Button, TextField } from "@mui/material";
import { getProfile, updateProfile, logoutUser } from "../services/authService"; // Import API functions
import "../styles/Profile.css";

interface User {
  name: string;
  email: string;
  phone: string;
  cardNo: string;
  accNo: string;
}

interface ProfileProps {
  setUser: (user: User | null) => void; // Callback to update user state
}

const Profile: React.FC<ProfileProps> = ({ setUser }) => {
  // State variables
  const [profileData, setProfileData] = useState<any>(null); // Stores user profile data
  const [isEditing, setIsEditing] = useState(false); // Toggles edit mode
  const [errorMessage, setErrorMessage] = useState<string>(""); // Stores error messages
  const navigate = useNavigate();

  // API base URL
  const apiUrl = import.meta.env.VITE_API_URL || "https://backend-sand-xi.vercel.app";

  /**
   * Fetches user profile data on component mount
   * - Redirects to login if no token is found
   */
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const profile = await getProfile(token); // Fetch profile from backend
        setProfileData(profile); // Update state with fetched profile data
      } catch (error: any) {
        setErrorMessage(error.message); // Set error message if fetch fails
        console.error("Error fetching profile:", error.message);
      }
    };

    fetchProfile();
  }, [navigate]);

  /**
   * Handles saving profile updates
   * - Sends updated profile data to the backend
   * - Updates the global user state on success
   */
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized! Please log in again.");
      navigate("/login");
      return;
    }

    console.log("Token:", token); // Debug token
    console.log("Profile data to update:", profileData); // Debug profile data

    try {
      const updatedProfile = await updateProfile(token, profileData); // Send updated profile to backend
      setUser(updatedProfile); // Update global user state
      setIsEditing(false); // Exit edit mode
      alert("Profile updated successfully!");
    } catch (error: any) {
      setErrorMessage(error.message); // Set error message if update fails
      console.error("Error updating profile:", error.message);
    }
  };

  /**
   * Handles user logout
   * - Clears user session and redirects to login
   */
  const handleLogout = () => {
    logoutUser(); // Clear user session
    setUser(null); // Reset global user state
    navigate("/login"); // Redirect to login page
  };

  /**
   * Handles changes to input fields in the profile form
   * - Updates the corresponding field in the profileData state
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value, // Dynamically update the field being edited
    });
  };

  // Display a loading message while profile data is being fetched
  if (!profileData) {
    return <Typography>Loading profile...</Typography>;
  }

  return (
    <div className="profile-container">
      <Grid container spacing={3} className="profile-content">
        {/* Header */}
        <Grid item xs={12}>
          <Typography variant="h4" className="profile-header">
            {profileData.name}'s Profile
          </Typography>
          {errorMessage && (
            <Typography color="error" style={{ marginTop: "10px" }}>
              {errorMessage}
            </Typography>
          )}
        </Grid>

        {/* Profile Fields */}
        {["name", "email", "phone", "cardNo", "accNo"].map((field) => (
          <Grid item xs={12} key={field}>
            <TextField
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1).replace("No", " Number")}
              variant="outlined"
              fullWidth
              value={profileData[field] || ""}
              onChange={handleChange}
              InputProps={{ readOnly: !isEditing }}
              className="input-field"
            />
          </Grid>
        ))}

        {/* Action Buttons */}
        <Grid item xs={12} className="profile-actions">
          {isEditing ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                className="save-button"
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setIsEditing(false)}
                className="cancel-button"
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(true)}
              className="edit-button"
            >
              Edit Profile
            </Button>
          )}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;