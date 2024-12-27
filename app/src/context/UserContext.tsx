/*import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext<any>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
        try {
            const response = await fetch("http://localhost:3200/api/auth/me");
            const data = await response.json();
            console.log("Fetched User Data:", data); // Log fetched user data
            setUser(data); // Ensure data contains a valid user object
          } catch (error) {
            console.error("Error fetching user:", error);
          }
        };

    fetchUser();
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};*/
