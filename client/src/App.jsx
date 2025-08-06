import { useState, useEffect,useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import "./App.css";
import Home from "./pages/Home";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AdminPage from "./pages/AdminPage";
import ManageTasks from "./pages/ManageTasks";

function App() {
  const {token,user} = useContext(AuthContext);
  const role = user?.role;

  return (
    <>
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                role === "admin" ? ( <Navigate to="/admin" /> ) : ( <Home /> )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/admin"
            element={
              token && role == "admin" ? <AdminPage /> : <Navigate to="/" />
            }
          />
          <Route path="/admin/users/:userId/tasks" element={token && role == 'admin' ? <ManageTasks /> : <Navigate to="/" />}/>
        </Routes>
    </>
  );
}

export default App;
