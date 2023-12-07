import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


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
    const navigate = useNavigate()
    const id = useSelector((state) => state.userId)

    
    
    // Delete Account
    const handleDelete = async () => {
        const response = await axios.delete(`/deleteAccount/:${id}`);
        if (response.data.success) {
            dispatch({ type: 'Logged Out' })
            navigate('/')
        }
    }
    


    // const editAccount = async (event) => {
    //     await axios.put("/editAccount")
    // }

    return (
        <div>
            <h1>Profile</h1>
            <div>
            <label>Add Profile Image</label>
            <input type="file" onChange={handleChange} />
            <img src={file} />
            </div>

            <br />

            <label>Username</label>
            <input type="text" />
            
            <br />

            <label>Email</label>
            <input type="text" />

            <br />

            <label>Password</label>
            <input type="text" />

            <br/>

            <label>ZIP Code</label>
            <input type="text" maxLength="5" />

            <br />

            <button onClick={handleDelete}>Delete Account</button>
        </div>
    );
}

export default Profile;