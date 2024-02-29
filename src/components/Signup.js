import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import { useAuth } from "../AuthContext";

export default function SignUpForm () {

    const { users, setUsers, getUsers } = useAuth();
    const [userName, setUserName] = useState("");
    
    useEffect (() => {
        const jwtToken = Cookies.get('jwt');
        if (jwtToken) {
            navigate("/dashboard");
        } else {
            getUsers();
        }

    }, []);

    useEffect(() => {

    }, [userName]);

    const navigate = useNavigate();

    const [formdata, setFormData] = useState({
        username: "",
        password: "",
    })

    const [errors, setErrors] = useState({})

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData({...formdata, [name] : value})

        if (name === "username") {
            const isUserExist = users.some(user => user.username === value);
            if (isUserExist) {
                setUserName("Username Taken!!!")
            } else {
                setUserName("");
            }
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        //checking username uniqueness
        if (userName !== "") {
            alert("Username is alredy taken!!!");
            return;
        }

        const formData = new FormData();
        formData.append('username', document.getElementById("username").value);
        formData.append('password', document.getElementById("password").value);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', 
            formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data.message);
            window.location.reload();

        } catch (error) {
            console.error('Error registering the user', error);
        }

    }

  return (

    <div className="form-container sign-up-container">
      <form onSubmit={handleSubmit} className="ls-form">
        <h1 className="ls-h1">Create Account</h1>
        <div className="social-container"></div>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          placeholder="User Name"
          className="ls-input"
        />
        <label style={{fontSize:"12px", color: "red"}}>{userName}</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          placeholder="Password"
          className="ls-input"
        />
        <button type="submit" className="ls-btn">Sign Up</button>
      </form>
    </div>
  );
}


