import React, { useState } from "react";
import "../styles/auth.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      alert("Login Successful");
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
    </div>
  );
};

export default Login;
