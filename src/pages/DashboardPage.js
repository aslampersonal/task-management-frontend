import React, { useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import "./DashboardPage.css";

const DashboardPage = () => {
  const { token, setToken, user, setUser, tasks, getTasks } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get('jwtToken');
    if (!jwtToken) {
      navigate("/");
    } else {
      getTasks();
    }
  }, [user]);

  const logout = async () => {
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken) {
      Cookies.remove("jwtToken");
      setToken("");
      setUser(null);
      navigate("/");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Fetch tasks after deleting
      getTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className='dashboard-main'>
      <h2>Dashboard</h2>
      <div className='header'>
        <p>Welcome back!</p>
        <button type="button" onClick={logout} className='logout-btn'>
          Logout
        </button>
      </div>

      <TaskForm />
      <TaskList tasks={tasks} onDelete={deleteTask} />
    </div>
  );
};

export default DashboardPage;
