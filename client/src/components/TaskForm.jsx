import { useState } from "react";
import axios from "axios";
function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/tasks`, {
        title,
        description,
      });
      setTitle("");
      setDescription("");
      onTaskCreated();
    } catch (error) {
      console.log("Error creating task", error.message);
    }
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            placeholder="Enter Task"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            value={description}
            placeholder="Enter Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">ADD</button>
        </form>
      </div>
    </>
  );
}

export default TaskForm;
