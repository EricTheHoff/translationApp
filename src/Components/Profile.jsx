import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';


const Profile = () => {


    // Upload Profile Image 
    const [file, setFile] = useState("")
    const handleChange = (e) => {
        console.log(e.target.files)
        setFile(URL.createObjectURL(e.target.files[0]))
    }

    
    // Edit Profile Information
    const [editMode, setEditMode] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [email, setEmail] = useState("")
    const dispatch = useDispatch()
    const select = useSelector()

    
    const editAccount = async (event) => {
        await axios.put("/editAccount")
    }
    
    // Delete Account
    const handleDelete = async (event) => {
        await axios.delete("/deleteAccount", {
            name: username,
            email: email,
            password: password,
            zipCode: zipcode
        })
    }

    return (
        <div>
            <h1>Profile</h1>

            <label>Add Profile Image</label>
            <input type="file" onChange={handleChange} />
            <img src={file} />

            <hr />

            <label>Username</label>
            <input type="text" />
            
            <hr />

            <label>Email</label>
            <input type="text" />

            <hr />

            <label>Password</label>
            <input type="text" />

            <hr />

            <label>ZIP Code</label>
            <input type="text" maxLength="5" />

            <hr />

            <button onClick={setEditMode}>Edit Account Information</button>
            <button onClick={handleDelete}>Delete Account</button>
        </div>
    );
}

export default Profile;