import React, { useRef, useState } from "react";
import "../styles/auth.css";
import { NavLink,useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  const timeoutRef=useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response=await axios.post("https://unity-docs-2.onrender.com/auth/login", {
        username,
        password,
      });
      console.log(response.data.userID);
      window.localStorage.setItem('user', response.data.userID)
      // alert("Login Successful");
      toast.success("Login Successful");
      timeoutRef.current = setTimeout(() => {
        navigate(`/user`);
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <form className="form">
        <div className="title">
          Welcome,
          <br />
          <span>Login to continue</span>
        </div>
        <input
          type="text"
          placeholder="username"
          name="username"
          className="input"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button-confirm" onClick={submit}>
          Let`s go →
        </button>
        <span>
          Not Registered?<NavLink to="/signup">SignUp</NavLink>{" "}
        </span>

      </form>
      <ToastContainer autoClose={1000}/>
    </div>
  );
};

export default Login;
