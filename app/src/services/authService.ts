const API_URL = "http://localhost:3200"; // Backend API base URL

// Login user
export const loginUser = async (email: string, password: string): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed.");
    }

    return await response.json(); // Returns user data and token
  } catch (error: any) {
    console.error("Login error:", error.message);
    throw new Error("An error occurred during login. Please try again.");
  }
};

// Get user profile
export const getProfile = async (token: string): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch profile.");
    }

    return await response.json(); // Returns user profile data
  } catch (error: any) {
    console.error("Get profile error:", error.message);
    throw new Error("Unable to fetch profile. Please ensure you are logged in.");
  }
};

// Update user profile
export const updateProfile = async (token: string, profileData: any): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update profile.");
    }

    return await response.json(); // Returns updated profile data
  } catch (error: any) {
    console.error("Update profile error:", error.message);
    throw new Error("Unable to update profile. Please try again.");
  }
};

// Logout user
export const logoutUser = (): void => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("User logged out successfully.");
  } catch (error: any) {
    console.error("Logout error:", error.message);
    throw new Error("Unable to log out. Please try again.");
  }
};

// Get balance
export const getBalance = async (token: string): Promise<{ balance: number }> => {
  try {
    const response = await fetch(`${API_URL}/api/wallet/balance`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch balance.");
    }

    const data = await response.json();
    if (typeof data.balance !== "number") {
      throw new Error("Invalid balance data format.");
    }

    return data; // { balance: number }
  } catch (error: any) {
    console.error("Get balance error:", error.message);
    throw new Error("Unable to fetch balance. Please try again later.");
  }
};