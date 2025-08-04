import { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
function Home() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const API_URL = import.meta.env.VITE_API_URL;
  const fetchTask = async () => {
    try {
      const res = await axios.get(`${API_URL}/tasks?page=${page}&limit=3`);
      setTasks(res.data.tasks);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log("error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchTask();
    window.scrollTo(0, 0);
    }, [page]);

  return (
    <>
      <div className="main-container">
        <h1>Task Manager</h1>
        <TaskForm onTaskCreated={fetchTask} />
        <TaskList tasks={tasks} onTaskUpdate={fetchTask} />

        <div className="pagination-controls">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            {" "}
            Page {page} of {totalPages}{" "}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
