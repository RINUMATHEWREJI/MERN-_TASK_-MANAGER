import { useState,useEffect } from 'react';
import axios from 'axios';
import './App.css'
import Home from './pages/Home';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  const [token,setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={token? <Home /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={<Login setToken={setToken}/>} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
