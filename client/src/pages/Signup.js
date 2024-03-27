import React, { useState } from "react";
import "../styles/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:3001/auth/register", {
        name,
        username,
        password,
      });
      alert("Registered Successfully");
      navigate("/login");
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
          <span>Signup to continue</span>
        </div>
        <input
          type="text"
          placeholder="name"
          name="name"
          className="input"
          onChange={(e) => setName(e.target.value)}
        />
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
      </form>
    </div>
  );
};

export default Signup;
