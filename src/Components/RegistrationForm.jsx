import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import user from "../Images/Avatars/user.png";
import toast from "react-hot-toast";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [passwordReg, setPasswordReg] = useState("");
  const [confirmReg, setConfirmReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [seePassword, setSeePassword] = useState("");

  const showPassword = () => {
    setSeePassword(!seePassword);
  };

  const register = async (event) => {
    event.preventDefault();
    if (emailReg === "" || passwordReg === "") {
      toast.error("All fields must be filled out before creating an account.");
      return;
    } else if (passwordReg !== confirmReg) {
      toast.error("The provided passwords do not match. Please try again.");
      return;
    }

    await axios
      .post("/register", {
        email: emailReg,
        password: passwordReg,
        profilePic: user,
      })
      .then(async () => {
        const user = await axios.get("/user");
        dispatch({ type: "Logged In" });
        dispatch({ type: "Active User", payload: user.data.userId });
        navigate("/");
        toast.success("Registration Successful");
      })
      .catch(() => {
        toast.error(
          `Account could not be created. There may already be an account registered to that email.`
        );
      });
  };

  return (
    <div>
      <form onSubmit={(e) => register(e)}>
        <h1>Create an Account</h1>

        <label>Email: </label>
        <input
          type="email"
          placeholder="email@example.com"
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
        />

        <label>Password: </label>
        <input
          type={seePassword ? "text" : "password"}
          id="password"
          placeholder="Enter password"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />

        <label>Confirm Password: </label>
        <input
          type={seePassword ? "text" : "password"}
          id="password-check"
          placeholder="Confirm password"
          onChange={(e) => {
            setConfirmReg(e.target.value);
          }}
        />

        <button type="submit">Create Account</button>
        <button type="button" onClick={showPassword}>
          Show Password
        </button>
        <br />

        <p>
          Already have an account? <NavLink to="/login">Login here.</NavLink>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
