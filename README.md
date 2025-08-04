# Task Manager App

A simple full-stack MERN (MongoDB, Express, React, Node.js) Task Manager where users can create, edit, delete, and mark tasks as complete or incomplete.

##  Features

-  Create a task with a title and optional description
-  Edit tasks inline
-  Delete tasks
-  Toggle task completion
-  Real-time updates on frontend using REST API
-  Clean and responsive UI

##  Tech Stack

- Frontend: React (Vite), Axios
- Backend: Node.js, Express
- Database: MongoDB (via Mongoose)
- Environment: Localhost + `.env` for API URL config

---

 📁 Project Structure

```bash
task-manager/
├── backend/                  # Node.js + Express + Mongoose
│   └── models/
│       └── Task.js
│   └── routes/
│       └── tasks.js
│   └── server.js
│   └── .env
├── frontend/                 # React app
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   └── TaskList.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── App.css
│   └── .env


# Backend Setup
cd backend
npm install
npm run dev

# Frontend Setup
cd frontend
npm install
npm run dev
