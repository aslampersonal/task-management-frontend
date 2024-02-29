import React, { useContext } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function SignInForm (props) {

    useEffect(() => {
        const jwtToken = Cookies.get('jwtToken');
        if (jwtToken) {
            navigate("/");
          }
    }, []);

    const { token, setToken, user, setUser, getTasks } = useAuth();
    const [formdata, setFormData] = useState({ email: "", password: "" })
    const navigate = useNavigate();

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData({...formdata, [name] : value})
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', document.getElementById("l-username").value);
        formData.append('password', document.getElementById("l-password").value);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status >= 200 && response.status < 300) {

                const jwtToken = response.data.token;
                
                // Set the token as an HTTP-only cookie
                Cookies.set('jwtToken', jwtToken, { expires: 5 / 24 , path: '/', secure: false, sameSite: 'strict' });

                // Store the token in state for application use
                setToken(jwtToken);
                
                const decodedToken = jwtDecode(jwtToken);
                setUser(decodedToken);
                getTasks();
                
            }
            navigate("/dashboard");

        } catch (error) {
            console.error('Error login:', error);
            alert(error);
        }
    }

  return (
    
    <div className="form-container sign-in-container">
      <h1 className="ls-h1">Sign in</h1>
      <div className="social-container"></div>
      <form onSubmit={handleSubmit} className="ls-form">
        <input
          type="text"
          placeholder="User Name"
          name="username"
          id="l-username"
          onChange={handleChange}
          className="ls-input"
        />
        <input
          type="password"
          name="password"
          id="l-password"
          placeholder="Password"
          onChange={handleChange}
          className="ls-input"
        />
        <button type="submit" className="ls-btn">Sign In</button>
      </form>
    </div>
  );
}

