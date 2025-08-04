import TaskItem from "./TaskItem";

function TaskList({ tasks, onTaskUpdate }) {
  return (
    <>
      <div className="list-container">
        {tasks.length === 0 ? (
          <p>no tasks found</p>
        ) : (
          <ol>
            {tasks.map((task) => (
              <li key={task._id}>
                <TaskItem task={task} onTaskUpdate={onTaskUpdate} />
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
}

export default TaskList;
