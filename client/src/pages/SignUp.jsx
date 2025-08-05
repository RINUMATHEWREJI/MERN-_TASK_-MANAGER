import { useState } from "react";
import axios from 'axios';
import { Link,useNavigate } from "react-router-dom";

function SignUP(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    const handleSignup = async()=>{

        try{
            const res = await axios.post(`${API_URL}/auth/signup`,{
                email,
                password,
            });
            alert("signup succesfull. Please Login")
            navigate('/login');
        }
        catch(error){
            alert("signup failed");
        }
    };

    return(
        <>
        <div className="signup-container">
            <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={handleSignup} >SignUp</button>
            <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
        </div>
        </>
    )
}

export default SignUP