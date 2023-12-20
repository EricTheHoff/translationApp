import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Styles/profile.css";
import user from "../Images/Avatars/user.png";
import bear from "../Images/Avatars/bear.png";
import cat from "../Images/Avatars/cat.png";
import chicken from "../Images/Avatars/chicken.png";
import dog from "../Images/Avatars/dog.png";
import koala from "../Images/Avatars/koala.png";
import meerkat from "../Images/Avatars/meerkat.png";
import panda from "../Images/Avatars/panda.png";
import rabbit from "../Images/Avatars/rabbit.png";
import sealion from "../Images/Avatars/sealion.png";
import ImageGrid from "./ImageGrid";
import toast from "react-hot-toast";
import "../Styles/navbar.css";
import "../Styles/images.css";
import Button from "react-bootstrap/Button";

const imageFiles = {
  user,
  bear,
  cat,
  chicken,
  dog,
  koala,
  meerkat,
  panda,
  rabbit,
  sealion,
};

export default function Profile() {
  const [profileImage, setProfileImage] = useState(user);
  const [editMode, setEditMode] = useState(false);
  const [password, setPassword] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAccount = async () => {
    await axios
      .get("/user")

      .then((response) => {
        setEmail(response.data.email);
        setPassword(response.data.password);
        setProfileImage(response.data.profilePic);
      });
  };

  // Edit Profile Information
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error(`The passwords do not match. Please try again.`);
      return;
    }

    const requestData = {
      email: email,
      currentPassword: currentPassword,
      newPassword: newPassword,
      profilePic: profileImage,
    };
    const response = await axios.put(`/editAccount`, requestData);
    if (response.data.success) {
      setEditMode(false);
      toast.success("Account Updated");
    } else {
      toast.error(
        `Something went wrong. Please ensure that you're entering the correct password information before saving.`
      );
    }
    window.location.reload();
  };

  // Delete Account
  const handleDelete = async () => {
    const response = await axios.delete(`/deleteAccount`);
    if (response.data.success) {
      dispatch({ type: "Logged Out" });
      navigate("/");
    }
  };

  const cancelButton = () => {
    if (editMode) {
      setEditMode(false);
      window.location.reload();
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  if (!editMode) {
    return (
      <>
        <div className="imgBackground">
          <img
            className="pic"
            src={
              imageFiles[profileImage] ? imageFiles[profileImage] : profileImage
            }
          />
        </div>
        <div className="bigBoyDiv">
          <br />
          <div className="contentDiv">
            <div className="profileheader">
              <div className="titleDiv">
                <h1 className="h1">Profile</h1>
              </div>
              <div className="pTeg">
                <Button className="ibtn" onClick={() => setEditMode(true)}>
                  Edit
                </Button>
              </div>
            </div>
            <div className="hrContainer">
              <hr />
              <div className="emailDiv">
                <p>Email: </p>
                <p>{email}</p>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="imgBackground">
          <img
            className="pic"
            src={
              imageFiles[profileImage] ? imageFiles[profileImage] : profileImage
            }
          />
        </div>
        <div className="bigBoyDiv">
          <form onSubmit={handleSubmit}>
            <div className="contentDiv">
              <div className="profileheader">
                <h1 className="h1">Edit Profile</h1>
                <div className="pTeg">
                  <Button className="ibtn" type="submit">
                    Save
                  </Button>
                  <Button className="ibtn" onClick={cancelButton}>
                    Cancel
                  </Button>
                </div>
              </div>
              <div className="hrContainer">
                <hr />
                <label className="profileLabels">Email: </label>
                <input
                  id="eProfileInput"
                  className="profileInputs"
                  placeholder={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <hr />
                <label className="profileLabels">Current Password: </label>
                <input
                  className="profileInputs"
                  type="password"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <hr />
                <label className="profileLabels"> New Password: </label>
                <input
                  className="profileInputs"
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <hr />
                <label className="profileLabels"> Confirm Password: </label>
                <input
                  className="profileInputs"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <hr />
                <ImageGrid setProfile={setProfileImage} />
                <br />
                <br />
                <button className="delete" onClick={handleDelete}>
                  Delete Account
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}
