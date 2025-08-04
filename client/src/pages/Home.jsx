import { useState,useEffect } from "react";
import axios from 'axios';
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
function Home(){

    const [tasks,setTasks] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;
    const fetchTask = async()=>{
        try{
            const res = await axios.get(`${API_URL}/tasks`);
            setTasks(res.data); 
        }
        catch(error){
            console.log("error fetching data: ",error);
        }
    };

    useEffect(()=>{
        fetchTask();
    },[]);

    return (
        <>
        <div className="main-container">
            <h1>Task Manager</h1>
            <TaskForm onTaskCreated={fetchTask} />
            <TaskList tasks={tasks} onTaskUpdate={fetchTask} />
        </div>
        </>
    )
}

export default Home