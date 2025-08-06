import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/AdminPage.css';

function AdminPage({ setToken }) {
  const [users, setUsers] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.users);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };
  
  const deleteUser = async (userId) => {
    if (!confirm("Are you sure want to delete user and their task?")) return;
    try {
      await axios.delete(`${API_URL}/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers();
    } catch (error) {
      console.log("error: ", error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <div>
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
      <h2>Admin Dashboard</h2>
      <h3>All Users</h3>
      <ul>
        {users
          .filter((user) => user.role !== "admin")
          .map((user) => (
            <li key={user._id}>
              <h3>
                {user.email} - {user.role}
              </h3>
              <button onClick={()=>navigate(`/admin/users/${user._id}/tasks`)}>View</button>
              <button className="delete-user" onClick={() => deleteUser(user._id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default AdminPage;
