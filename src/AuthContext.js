import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const MyContext = createContext();

export function useAuth() {
    return useContext(MyContext);
}
  
export function AuthProvider({ children }) {
  
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);

  const states = {
      tasks, 
      setTasks,
      token, 
      setToken,
      user,
      setUser, 
      getTasks,
      users,
      setUsers,
      getUsers,
  };

  async function getTasks() {
    const jwtToken = Cookies.get("jwtToken");
    const decodedToken = jwtDecode(jwtToken);
    
    setTasks([]);

    if (jwtToken) {
      await axios.get("http://localhost:5000/api/tasks/get",
      {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
      })
      .then((response) => {
        const newTasks = response.data;
        setTasks(newTasks);
      })
      .catch((error) => {
        console.log("Error getting tasks details: ", error);
      }); 
    } else {
        console.log("Authentication failed");
    }
  }

  async function getUsers() {
    await axios.get("http://localhost:5000/api/auth/users")
    .then((response) => {
      setUsers(response.data.users);
    })
    .catch((error) => {
      console.log("Error getting users details: ", error);
    }); 
  }

  return (
    <MyContext.Provider value={ states }>
      {children}
    </MyContext.Provider>
  );
}
