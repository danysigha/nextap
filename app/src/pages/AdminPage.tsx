/**
 * AdminPage Component
 *
 * This component represents the admin dashboard of the application. It provides an overview
 * of the system, including total users, transactions, and system health status. It also
 * includes tables for managing users and transactions, along with a search bar for filtering data.
 *
 * Features:
 * - Overview Cards: Display statistics (total users, transactions, system health).
 * - Search Bar: Allows filtering of users and transactions.
 * - Users Table: Lists all registered users with their roles.
 * - Transactions Table: Displays recent transactions.
 * - Responsive Layout: Adapts to different screen sizes.
 *
 * Dependencies:
 * - React
 * - Material-UI for styling and layout
 * - CSS file for additional styling (`AdminPage.css`)
 */

import React, { useState } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TextField,
} from "@mui/material";
import "../styles/AdminPage.css";

const AdminPage: React.FC = () => {
  const [search, setSearch] = useState("");

  // Placeholder data for users and transactions
  const users = [
    { id: 1, name: "Arslan Parkar", email: "parkar.a@northeastern.edu", role: "Admin" },
    { id: 2, name: "Dany Boi", email: "dboi@northeastern.edu", role: "User" },
    { id: 3, name: "Param Kamal Shah", email: "shah.p@northeastern.edu", role: "User" },
  ];

  const transactions = [
    { id: 101, user: "Param Kamal Shah", amount: "$20", date: "01/12/2024" },
    { id: 102, user: "Arslan Parker", amount: "$20", date: "30/11/2024" },
    { id: 103, user: "Arslan Parkar", amount: "$50", date: "29/11/2024" },
  ];

  return (
    <div className="admin-page-container">
      <Typography variant="h4" className="admin-header">
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Overview Cards */}
        <Grid item xs={12} md={4}>
          <Card className="overview-card">
            <CardContent>
              <Typography variant="h5" className="card-title">
                Total Users
              </Typography>
              <Typography variant="h4" className="card-value">
                {users.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="overview-card">
            <CardContent>
              <Typography variant="h5" className="card-title">
                Total Transactions
              </Typography>
              <Typography variant="h4" className="card-value">
                {transactions.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="overview-card">
            <CardContent>
              <Typography variant="h5" className="card-title">
                System Health
              </Typography>
              <Typography variant="h4" className="card-value" style={{ color: "#28a745" }}>
                Good
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Search Bar */}
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Search users or transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-bar"
          />
        </Grid>

        {/* Users Table */}
        <Grid item xs={12} md={6}>
          <Card className="data-card">
            <CardContent>
              <Typography variant="h5" className="card-title">
                Users
              </Typography>
              <Table className="admin-table">
                <TableHead>
                  <TableRow>
                    <TableCell className="table-header adminTableHeader">Name</TableCell>
                    <TableCell className="table-header adminTableHeader">Email</TableCell>
                    <TableCell className="table-header adminTableHeader">Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="table-cell">{user.name}</TableCell>
                      <TableCell className="table-cell">{user.email}</TableCell>
                      <TableCell className="table-cell">{user.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>

        {/* Transactions Table */}
        <Grid item xs={12} md={6}>
          <Card className="data-card">
            <CardContent>
              <Typography variant="h5" className="card-title">
                Transactions
              </Typography>
              <Table className="admin-table">
                <TableHead>
                  <TableRow>
                    <TableCell className="table-header adminTableHeader">User</TableCell>
                    <TableCell className="table-header adminTableHeader">Amount</TableCell>
                    <TableCell className="table-header adminTableHeader">Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="table-cell">{transaction.user}</TableCell>
                      <TableCell className="table-cell">{transaction.amount}</TableCell>
                      <TableCell className="table-cell">{transaction.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminPage;
