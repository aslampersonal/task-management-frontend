import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const TaskList = ({ tasks, onDelete }) => {
  const { token, getTasks } = useAuth();
  const [editedTask, setEditedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const onUpdate = async (id) => {
    const selectedTask = tasks.find(task => task._id === id);
    setEditedTask(selectedTask);
  };

  const onCancelUpdate = () => {
    setEditedTask(null);
  };

  const onUpdateTask = async (taskData) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${editedTask._id}`, taskData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      getTasks();
      setEditedTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      task.title.toLowerCase().includes(lowerCaseQuery) ||
      task.description.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div className="task-list-container">
      <div className="search-container">
        <label>
          Search:
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='search-bar'
          />
        </label>
      </div>
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task._id}>
              <td>
                {editedTask && editedTask._id === task._id ? (
                  <input
                    type="text"
                    value={editedTask.title}
                    onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  />
                ) : (
                  task.title
                )}
              </td>
              <td>
                {editedTask && editedTask._id === task._id ? (
                  <input
                    type="text"
                    value={editedTask.description}
                    onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                  />
                ) : (
                  task.description
                )}
              </td>
              <td>
                {editedTask && editedTask._id === task._id ? (
                  <input
                    type="date"
                    value={editedTask.dueDate}
                    onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                  />
                ) : (
                  task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'
                )}
              </td>
              <td>
                {editedTask && editedTask._id === task._id ? (
                  <>
                    <button onClick={() => onUpdateTask(editedTask)}>Update</button>
                    <button onClick={onCancelUpdate}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => onUpdate(task._id)}>Edit</button>
                )}
                <button onClick={() => onDelete(task._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TaskList;
