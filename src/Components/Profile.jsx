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

    const [zipcode, setZipcode] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [zipState, setZipState] = useState("");

    const id = useSelector((state) => state.userId);

    const getAccount = async () => {
        await axios
            .get("/user")

            .then((response) => {
                setEmail(response.data.email);
                setZipcode(response.data.zipCode);
                setPassword(response.data.password);
                setProfileImage(response.data.profilePic);
                console.log(response.data.profilePic);
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
            newPassword: newPassword,
            currentPassword: currentPassword,
            zipcode: zipcode,
            profilePic: profileImage,
        };
        const response = await axios.put(`/editAccount`, requestData);
        if (response.data.success) {
            setEditMode(false);
            console.log("success");
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
            <div className="background">
                <img
                    id="pic"
                    src={
                        imageFiles[profileImage] ? imageFiles[profileImage] : profileImage
                    }
                />

                <div className="contentDiv">
                    <div className="header">
                        <h1 className="h1">Profile</h1>
                        <button className="editButton" onClick={() => setEditMode(true)}>
                            Edit
                        </button>
                    </div>

                    <div className="hrContainer">
                        <hr />

                        <div className="emailDiv">
                            <p>Email: </p>
                            <p>{email}</p>
                        </div>

                        <hr />

                        <div className="zipcodeDiv">
                            <p>ZIP Code: </p>
                            <p>{zipcode}</p>
                        </div>

                        <hr />

                        {/* <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Freepik - Flaticon</a> */}
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="background">
                <form onSubmit={handleSubmit}>
                    <img
                        src={
                            imageFiles[profileImage] ? imageFiles[profileImage] : profileImage
                        }
                    />
                        <div className="dropdown">
                            <p id="editImgBtn">Edit Image</p>
                            <div className="dropdown-content">
                                <ImageGrid setProfile={setProfileImage} />
                            </div>
                        </div>

                    <div className="contentDiv">

                        <div className="header">
                            <h1 className="h1">Edit Profile</h1>
                            <button className="save" type="submit">
                                Save
                            </button>
                            <button className="cancel" onClick={cancelButton}>
                                Cancel
                            </button>
                        </div>

                        <div className="hrContainer">
                        <hr />

                        <label>Email</label>
                        <input
                            placeholder={email}
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <hr />

                        <label>Password</label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <hr />

                        <label>ZIP Code</label>
                        <input
                            placeholder={zipcode}
                            type="text"
                            onChange={(e) => setZipcode(e.target.value)}
                        />

                        <hr />

                        <button className="delete" onClick={handleDelete}>
                            Delete Account
                        </button>
                        </div>
                    </div>
                </form>

            </div>
        );
    }
}
