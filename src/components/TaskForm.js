import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const TaskForm = () => {
  const { user, getTasks } = useAuth();
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const jwtToken = Cookies.get('jwtToken');
    if (!jwtToken) {
      navigate("/");
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/tasks/create',
        {
          ...taskData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      console.log(response.data.message);
      // Refresh tasks after adding a new one
      getTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div>
      <h3>Create a New Task</h3>
      <form onSubmit={handleFormSubmit} className='task-form'>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
