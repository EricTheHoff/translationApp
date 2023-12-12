import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/profile.css'
import user from "../Images/Avatars/user.png"
import bear from "../Images/Avatars/bear.png"
import cat from "../Images/Avatars/cat.png"
import chicken from "../Images/Avatars/chicken.png"
import dog from "../Images/Avatars/dog.png"
import koala from "../Images/Avatars/koala.png"
import meerkat from "../Images/Avatars/meerkat.png"
import panda from "../Images/Avatars/panda.png"
import rabbit from "../Images/Avatars/rabbit.png"
import sealion from "../Images/Avatars/sealion.png"
import ImageGrid from './ImageGrid';


const Profile = () => {

    const [profileImage, setProfileImage] = useState(user)
    const [editMode, setEditMode] = useState(false)
    const [password, setPassword] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [email, setEmail] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const id = useSelector((state) => state.userId)


    switch (dispatch({type: 'profileImage'})) {

        case 'bear': dispatch({type: 'profileImage', payload: bear})
            break

        case 'cat': dispatch({type: 'profileImage', payload: cat})
            break

        case 'chicken': dispatch({type: 'profileImage', payload: chicken})
            break

        case 'dog': dispatch({type: 'profileImage', payload: dog})
            break

        case 'koala': dispatch({type: 'profileImage', payload: koala})
            break

        case 'meerkat': dispatch({type: 'profileImage', payload: meerkat})
            break

        case 'panda': dispatch({type: 'profileImage', payload: panda})
            break

        case 'rabbit': dispatch({type: 'profileImage', payload: rabbit})
            break

        case 'sealion': dispatch({type: 'profileImage', payload: sealion})
            break
        default : dispatch({type: 'profileImage', payload: user})

    }


    // // Upload Profile Image 
    // const handleChange = async (e) => {
    //     await axios.get('/get-image')
    //     console.log(e.target.files)
    //     setFile(URL.createObjectURL(e.target.files[0]))
    // }

    // // const profileImage = async (e) => {
    // //     await axios.post('/image')
    // // }


    const getAccount = async () => {
        await axios.get('/user').then((response) => {
            setEmail(response.data.email)
            setZipcode(response.data.zipCode)
            setPassword(response.data.password)
            // setFile(response.data.image)
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
    }, [])

    if (!editMode) {
        return (
            <div>
                <img src={profileImage} />
                <p>Email: {email}</p>
                <p>ZIP Code: {zipcode}</p>
                <button onClick={() => setEditMode(true)}>Edit</button>

                <br />

                {/* <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Freepik - Flaticon</a> */}
               
            </div>


        )
    } else {
        return (
            <div>
                <h1>Profile</h1>
                <form onSubmit={handleSubmit}>

                    <br />
                    {/* <input type="file" onChange={handleChange} /> */}
                    <img src={profileImage} />

                    <br />
                    <br />

                    <label>Choose Profile Image</label>
                    <ImageGrid setProfile={setProfileImage}  />

                    <br />

                    <label>Email</label>
                    <input placeholder={email} type="text" onChange={(e) => setEmail(e.target.value)} />

                    <br />

                    <label>Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />

                    <br />

                    <label>ZIP Code</label>
                    <input placeholder={zipcode} type="text" maxLength="5" onChange={(e) => setZipcode(e.target.value)} />

                    <br />

                    <button type="submit">Save</button>
                </form>
                <button onClick={handleDelete}>Delete Account</button>

            </div>
        );
    }

}

export default Profile;