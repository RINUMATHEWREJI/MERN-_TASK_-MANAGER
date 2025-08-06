import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function ManageTasks() {
  const [tasks, setTasks] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const {userId} = useParams();
    useEffect(()=>{
        fetchUserTask();
    },[]);
  const fetchUserTask = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/users/${userId}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data.tasks);
    } catch (error) {
      console.log("error:", error.message);
    }
  };
  return (
    <>
      <div className="managetask-container"></div>
      <h2>Tasks of User: {userId}</h2>
      <button onClick={() => navigate(-1)}>← Back to Admin Page</button>
      {tasks.length == 0 ? (
        <p>No tasks found</p>
      ) : (
        <ul>
            {tasks.map((task)=>(
                <li key={task._id}>
                    <strong>{task.title}</strong> - {task.description}
                </li>
            ))}
        </ul>
      )}
    </>
  );
}

export default ManageTasks;
