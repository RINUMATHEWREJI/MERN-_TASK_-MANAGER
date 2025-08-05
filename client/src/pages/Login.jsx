import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login({setToken}){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    const handleLogin = async()=>{

        try{
            const res = await axios.post(`${API_URL}/auth/login`,{
                email,
                password,
            });
            localStorage.setItem('token',res.data.token);
            setToken(res.data.token);
            navigate('/');
        }
        catch(error){
            alert("Login failed");
        }
    };

    return(
        <>
        <div className="signup-container">
            <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={handleLogin} >Login</button>
        </div>
        </>
    )
}

export default Login