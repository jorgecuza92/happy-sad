import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import history from "../utils/history";

function Login(props) {
  const [credentials, setCredentials] = useState({});

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          const token = result.token;
          // get the token and place in local storage
          localStorage.setItem("jsonwebtoken", token);
          localStorage.setItem("username", result.username);
          // take user to the dashboard (dont have dashboard route yet)
          props.history.push("/");
        }
      });
  };

  return (
    <div>
      <h1 className="loginHeader">Login</h1>
      <input
        type="text"
        onChange={handleChange}
        className="username"
        name="username"
      />
      <input
        type="password"
        onChange={handleChange}
        className="password"
        name="password"
      />
      <button onClick={handleLogin} className="loginBtn">
        Enter
      </button>
    </div>
  );
}

export default Login;
