import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/home";
import Profile from "./pages/Profile";
import SendReceive from "./pages/SendReceive";
import MoneyTransfer from "./pages/MoneyTransfer";
import Statements from "./pages/Statements";
import Balance from "./pages/Balance";
import AddCard from "./pages/AddCard";
import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage";
import Register from "./pages/Register";

interface User {
  name: string;
  email: string;
  phone: string;
  cardNo: string;
  accNo: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Clear session if the page is refreshed
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Router>
      {user && (
        <NavBar
          user={user}
          onLogout={handleLogout}
          title="Nextap"
        />
      )}
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/profile"
          element={user ? <Profile  setUser={setUser} /> : <Navigate to="/login" />}
        />
        <Route
          path="/send-receive"
          element={user ? <SendReceive /> : <Navigate to="/login" />}
        />
        <Route
          path="/statements"
          element={user ? <Statements /> : <Navigate to="/login" />}
        />
        <Route
          path="/balance"
          element={user ? <Balance /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-card"
          element={user ? <AddCard /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={user ? <AdminPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/register"
          element={<Register setUser={setUser} />}
        />
        <Route
          path="/money-transfer"
          element={user ? <MoneyTransfer user={user} setUser={setUser} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;