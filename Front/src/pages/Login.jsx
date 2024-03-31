import React from "react";
import { useState } from "react";
import axios from "axios";

function Login() {
  let [username, setUsername] = useState("");

  const signup = () => {
    axios
      .post("http://localhost:8000/checkusername", { username: username })
      .then((res) => {
        if (res.data.exists) {
          alert("Username already exists");
        } else {
          localStorage.setItem("username", username);
          window.location.href = "/personal-info";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const login = () => {
    axios
      .post("http://localhost:8000/checkusername", { username: username })
      .then((res) => {
        if (res.data.exists) {
          localStorage.setItem("username", username);
          window.location.href = "/myprojects";
        } else {
          alert("Username does not exist");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sign-up-container">
      <div className="header text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide lg:mt-40">
      Login
      </div>
      <input
        type="text"
        placeholder="Input Unique Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="footer">
        <button onClick={signup}>Create Account</button>
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}

export default Login;
