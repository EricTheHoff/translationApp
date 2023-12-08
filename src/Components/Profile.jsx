import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/profile.css'


const Profile = () => {
    const [editMode, setEditMode] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [email, setEmail] = useState("")
    const [file, setFile] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const id = useSelector((state) => state.userId)


    // Upload Profile Image 
    const handleChange = (e) => {
        console.log(e.target.files)
        setFile(URL.createObjectURL(e.target.files[0]))
    }



    const getAccount = async () => {
        await axios.get('/user').then((response) => {
            setEmail(response.data.email)
            setZipcode(response.data.zipCode)
            setPassword(response.data.password)
       })
    }
    


    // Edit Profile Information
    const handleSubmit = async (event) => {
        event.preventDefault()
        const requestData = {
            email: email,
            password: password,
            zipcode: zipcode,
        }
        const response = await axios.put("/editAccount", requestData)
        if (response.data.success) {
            setEditMode(false)
            console.log("success")
        } else {
            console.log("fail")
        }
    }


    
    
    // Delete Account
    const handleDelete = async () => {
        const response = await axios.delete(`/deleteAccount/${id}`);
        if (response.data.success) {
            dispatch({ type: 'Logged Out' })
            navigate('/')
        }
    }
    

    useEffect(() => {
        getAccount()
    },[])

    if (editMode === false) {
        return (
            <div>
                <p>Email: {email}</p>
                <p>ZIP Code: {zipcode}</p>
                <button onClick={() => setEditMode(true)}>Edit</button>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Profile</h1>
                <form onSubmit={handleSubmit}>
                <label>Add Profile Image</label>
                <input type="file" onChange={handleChange} />
                <img src={file} />
                
                <br />
    
                <label>Email</label>
                <input placeholder={email} type="text" onChange={(e) => setEmail(e.target.value)}/>
    
                <br />
    
                <label>Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)}/>
    
                <br/>
    
                <label>ZIP Code</label>
                <input placeholder={zipcode} type="text" maxLength="5" onChange={(e) => setZipcode(e.target.value)}/>
    
                <br />

                <button type="submit">Save</button>
                </form>
                <button onClick={handleDelete}>Delete Account</button> 
            </div>
        );
    }
    
}

export default Profile;