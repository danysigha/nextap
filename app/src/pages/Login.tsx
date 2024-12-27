/**
 * Login Component
 *
 * This component renders a login form for users to authenticate. It supports
 * regular login with email and password, registration redirection, and NFC-based login.
 * The component uses React state to manage form inputs, error handling, and NFC login logic.
 *
 * Features:
 * - Email and password input with validation
 * - Password visibility toggle
 * - Login, Register, and NFC Login functionality
 *
 * Dependencies:
 * - React
 * - Material-UI for styling and layout
 * - React Router for navigation
 * - `loginUser` function from authService for backend authentication
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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../styles/Login.css";
import { loginUser } from "../services/authService";

interface LoginProps {
  setUser: (user: any) => void; // Function to set the authenticated user state in the parent
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  // State variables for form inputs and error handling
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [tapCount, setTapCount] = useState(0); // Tracks the number of NFC taps
  const [isNfcLogin, setIsNfcLogin] = useState(false); // Indicates if NFC login is in progress
  const navigate = useNavigate();

  /**
   * Toggles password visibility in the input field
   */
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  /**
   * Prevents default mouse-down behavior on password visibility toggle
   */
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  /**
   * Validates the email input
   * @param email - Email string to validate
   * @returns boolean - Whether the email is valid
   */
  const validateEmail = (email: string): boolean => {
    if (!email) {
      setEmailError(true);
      setEmailHelperText("Email is required");
      return false;
    }
    const isValid = /\S+@\S+\.\S+/.test(email);
    if (!isValid) {
      setEmailError(true);
      setEmailHelperText("Invalid email format");
    } else {
      setEmailError(false);
      setEmailHelperText("");
    }
    return isValid;
  };

  /**
   * Handles the login process using email and password
   */
  const handleLogin = async () => {
    // Reset error states
    setEmailError(false);
    setPasswordError(false);
    setEmailHelperText("");
    setPasswordHelperText("");

    let isValid = true;

    // Validate email and password
    if (!validateEmail(email)) {
      isValid = false;
    }
    if (password.trim() === "") {
      setPasswordError(true);
      setPasswordHelperText("Password is required");
      isValid = false;
    }

    if (!isValid) return;

    try {
      // Authenticate user
      const user = await loginUser(email, password);
      setUser(user); // Update user state
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.token); // Store token for API requests
      alert("Login successful!");
      navigate("/"); // Redirect to home/dashboard
    } catch (error: any) {
      if (!isNfcLogin) {
        alert(error.message || "An error occurred during login. Please try again.");
      }
      setIsNfcLogin(false); // Reset NFC login state
    }
  };

  /**
   * Redirects to the Register page
   */
  const handleRegister = () => {
    navigate("/register");
  };

  /**
   * Simulates NFC-based login
   */
  const handleTapLogin = async () => {
    setTapCount((prev) => prev + 1);

    if (tapCount === 0) {
      alert("No Card Detected");
    } else if (tapCount === 1) {
      // Pre-fill credentials for NFC-based login
      setEmail("p@admin.com");
      setPassword("123");
      setIsNfcLogin(true);
      try {
        const user = await loginUser("p@admin.com", "123");
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", user.token);
        alert("Logged in successfully via NFC!");
        navigate("/");
      } finally {
        setIsNfcLogin(false); // Reset NFC login state
      }
    }
  };

  return (
    <div className="login-container">
      <Grid container spacing={3} className="login-content">
        <Grid item xs={12}>
          <Typography variant="h4" className="login-header">
            Login
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            InputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
            label="Email"
            variant="outlined"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            error={emailError}
            helperText={emailHelperText}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            InputProps={{
              style: { color: "white" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    sx={{ color: "white" }}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
            label="Password"
            required
            variant="outlined"
            fullWidth
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            error={passwordError}
            helperText={passwordHelperText}
          />
        </Grid>
        <Grid item xs={12} className="login-actions">
          <Button
            sx={{ width: "100%", marginBottom: "10px" }}
            variant="contained"
            color="primary"
            onClick={handleLogin}
            className="login-button"
          >
            Login
          </Button>
          <Button
            sx={{ width: "100%", marginBottom: "10px" }}
            variant="outlined"
            color="secondary"
            onClick={handleRegister}
            className="register-button"
          >
            Register
          </Button>
          <Button
            sx={{ width: "100%" }}
            variant="contained"
            color="success"
            onClick={handleTapLogin}
            className="tap-login-button"
          >
            Tap to Login with NFC Card
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;