import { useState,useEffect,createContext } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({children}){

    const [token,setToken] = useState(localStorage.getItem("token"));
    const [user,setUser] = useState( token ? jwtDecode(token) : null);
    
    useEffect(()=>{
        if (token){
            localStorage.setItem("token",token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setUser(jwtDecode(token));
        }
        else{
            localStorage.removeItem("token",token);
            delete axios.defaults.headers.common["Authorization"];
            setUser(null);
        }
    },[token]);

    return(
        <AuthContext.Provider value={{token,setToken,user}} >
            {children}
        </AuthContext.Provider>
    );
}