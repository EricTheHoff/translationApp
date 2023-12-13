import { useState } from "react";
import { NavLink } from "react-router-dom";
import React from "react";

const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  
  
    const myPassword= () => {
    
      setPasswordShown(!passwordShown);
    };

  return (
    <>
      <form
        onSubmit={(e) => {
          login(e, {
            email: email,
            password: password,
          });
        }}
      >
        <label htmlFor="email">Email: </label>
        <br></br>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <label htmlFor="password">Password: </label>
        <br></br>
        <input
          type={passwordShown ? "text" : "password"}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <button type="submit">Login</button>
        <button type="button" onClick={myPassword}>Show Password</button>
        <br></br>

        <p>
          Don't have an account?{" "}
          <NavLink to="/register">Register for one here.</NavLink>
        </p>
      </form>
    </>
  );
};

export default Login;

