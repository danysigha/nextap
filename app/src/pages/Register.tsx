/**
 * Register Component
 *
 * This component provides a user registration form with validation and error handling.
 * Users can input their email, password, name, phone number, card number, and account number.
 * It communicates with the backend API to register new users and displays success or error messages.
 *
 * Features:
 * - Input validation with descriptive error messages
 * - Password visibility toggle
 * - Dynamic feedback for success and error states
 * - Loading spinner during API calls
 * - Redirect to the login page for existing users
 *
 * Dependencies:
 * - React
 * - Material-UI for styling
 * - React Router for navigation
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../styles/Register.css";

interface RegisterProps {
  setUser: (user: any) => void; // Function to update the authenticated user state
}

const Register: React.FC<RegisterProps> = ({ setUser }) => {
  const navigate = useNavigate();

  // State to manage form input values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    cardNo: "",
    accNo: "",
  });

  // State to manage form validation errors
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    cardNo: "",
    accNo: "",
  });

  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // State for API call progress and feedback
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  /**
   * Handles input changes and updates form state.
   * Clears the error message for the changed field.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" }); // Clear previous error
  };

  /**
   * Validates the form inputs and updates error state.
   * @returns {boolean} - Whether the form is valid
   */
  const validateForm = () => {
    let errors = { email: "", password: "", name: "", phone: "", cardNo: "", accNo: "" };
    let isValid = true;

    // Email validation
    if (!formData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    // Name validation
    if (!formData.name) {
      errors.name = "Full name is required";
      isValid = false;
    }

    // Phone validation
    if (!formData.phone) {
      errors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must be 10 digits";
      isValid = false;
    }

    // Card number validation
    if (!formData.cardNo) {
      errors.cardNo = "Card number is required";
      isValid = false;
    } else if (!/^\d{12}$/.test(formData.cardNo)) {
      errors.cardNo = "Card number must be 12 digits";
      isValid = false;
    }

    // Account number validation
    if (!formData.accNo) {
      errors.accNo = "Account number is required";
      isValid = false;
    } else if (!/^[a-zA-Z0-9]{10}$/.test(formData.accNo)) {
      errors.accNo = "Account number must be 10 alphanumeric characters";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  /**
   * Handles the registration process by validating inputs and sending data to the backend.
   */
  const handleRegister = async () => {
    if (!validateForm()) return; // Validate inputs before proceeding

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3200"; // API base URL
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Send form data to the server
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user); // Update authenticated user state
        setSuccessMessage("Registration successful!");
        localStorage.setItem("token", data.token); // Store token in local storage
        navigate("/"); // Redirect to the homepage
      } else {
        setErrorMessage(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Toggles password visibility.
   */
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="register-container">
      <Grid container spacing={3} className="register-content">
        {/* Header */}
        <Grid item xs={12}>
          <Typography variant="h4" className="register-header">
            Register
          </Typography>
        </Grid>

        {/* Error Message */}
        {errorMessage && (
          <Grid item xs={12}>
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>
        )}

        {/* Success Message */}
        {successMessage && (
          <Grid item xs={12}>
            <Alert severity="success">{successMessage}</Alert>
          </Grid>
        )}

        {/* Form Fields */}
        {["email", "password", "name", "phone", "cardNo", "accNo"].map((field) => (
          <Grid item xs={12} key={field}>
            <TextField
              name={field}
              label={
                field === "cardNo"
                  ? "Card Number"
                  : field === "accNo"
                  ? "Account Number"
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }
              variant="outlined"
              fullWidth
              type={field === "password" && !showPassword ? "password" : "text"}
              value={formData[field as keyof typeof formData]} // Dynamic value binding
              onChange={handleChange}
              error={!!formErrors[field as keyof typeof formErrors]} // Dynamic error handling
              helperText={formErrors[field as keyof typeof formErrors]} // Dynamic error messages
              InputProps={{
                style: { color: "white" },
                endAdornment:
                  field === "password" ? (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} sx={{ color: "white" }}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ) : null,
              }}
              InputLabelProps={{ style: { color: "white" } }}
              className="input-field"
            />
          </Grid>
        ))}

        {/* Register Button */}
        <Grid item xs={12} className="register-actions">
          <Button
            variant="contained"
            color="primary"
            onClick={handleRegister}
            disabled={loading}
            className="register-button"
          >
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>
          <Button variant="text" color="secondary" onClick={() => navigate("/login")}>
            Already have an account? Login
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;