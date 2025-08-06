import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import "./App.css";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AdminPage from "./pages/Adminpage";
import ManageTasks from "./pages/ManageTasks";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const decoded = token ? jwtDecode(token) : null;
  const role = decoded?.role;

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                role === "admin" ? (
                  <Navigate to="/admin" />
                ) : (
                  <Home setToken={setToken} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/admin"
            element={
              token && role == "admin" ? <AdminPage setToken={setToken}/> : <Navigate to="/" />
            }
          />
          <Route path="/admin/users/:userId/tasks" element={token && role == 'admin' ? <ManageTasks /> : <Navigate to="/" />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
