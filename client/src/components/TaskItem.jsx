import axios from "axios";
import { useState } from "react";
function TaskItem({ task, onTaskUpdate }) {
    
    const [isEditing,setIsEditing] = useState(false);
    const [editTitle,setEditTitle] = useState("");
    const [editDescription,setEditDescription] = useState("");
    const API_URL = import.meta.env.VITE_API_URL;

    const startEdit = () =>{
        setEditTitle(task.title);
        setEditDescription(task.description);
        setIsEditing(true);
    };

    const handleEdit = async()=>{
        try{
            await axios.patch(`${API_URL}/tasks/${task._id}`,{
                title:editTitle.trim(),
                description:editDescription.trim()
            });
            setIsEditing(false);
            onTaskUpdate();
        }
        catch(error){
            console.log("error: ",error.message);
        }
        
    };
    const handleDelete = async()=>{
        try{
            await axios.delete(`${API_URL}/tasks/${task._id}`);
            onTaskUpdate();
        }
        catch(error){
            console.log("error: ",error.message);
        }
        
    };
    const handleToggle = async()=>{
        
        try{
            await axios.patch(`${API_URL}/tasks/${task._id}`,{
            completed: !task.completed
        });
        onTaskUpdate();
        }
        catch(error){
            console.log("error: ",error.message);
        }
    };
  
    return (
    <>
    {isEditing ?(
        <div className="edit-container">

        <input type="text" value={editTitle} placeholder="Enter Task" onChange={(e)=>setEditTitle(e.target.value)} />
        <input type="text" value={editDescription} placeholder="Enter Description" onChange={(e)=>setEditDescription(e.target.value)} />
        <button onClick={handleEdit} disabled={!editTitle.trim()}>Save</button>
        <button onClick={()=>setIsEditing(false)} >Cancel</button>

    </div>
    ):(
        <div className="item-container">
          <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title.toUpperCase()}</h3>
        <p>{task.description}</p>
        <button onClick={handleToggle}>
            {task.completed ? 'Mark Incompleted': 'Mark Completed'}
        </button>
          <button onClick={startEdit}>update</button>
          <button onClick={handleDelete}>Delete</button>

      </div>
    )}
      
    </>
  );
}

export default TaskItem;
