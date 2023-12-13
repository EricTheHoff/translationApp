import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import user from '../Images/Avatars/user.png'

const RegistrationForm = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [passwordReg, setPasswordReg] = useState("")
    const [confirmReg, setConfirmReg] = useState("")
    const [emailReg, setEmailReg] = useState("")
    const [zipReg, setZipReg] = useState("")

    const [seePassword, setSeePassword] = useState("")

    const showPassword = () => {
        setSeePassword(!seePassword)
    }

    const register = async (event) => {
        event.preventDefault()
        if (emailReg === "" || passwordReg === "" || zipReg === "") {
            alert("All fields must be filled out before creating an account.")
            return
        } else if (passwordReg !== confirmReg) {
            alert("The provided passwords do not match. Please try again.")
            return
        }

        await axios.post('/register', {
            email: emailReg,
            password: passwordReg,
            zipCode: zipReg,
            profilePic: user
        }, console.log(user))
            .then(async () => {
                const user = await axios.get('/user')
                dispatch({ type: 'Logged In' })
                dispatch({ type: 'Active User', payload: user.data.userId })
                dispatch({ type: 'Active Zip', payload: user.data.zipCode })
                navigate('/')
            })
            .catch(() => {
                alert(`Account could not be created. There may already be an account registered to that email.`)
            })
    }

    return (
        <div>
            <form onSubmit={(e) => register(e)}>
                <h1>Create an Account</h1>

                <label>Email: </label>
                <input type="email" placeholder='email@example.com' onChange={(e) => { setEmailReg(e.target.value) }} />

                <label>Password: </label>
                <input type={seePassword ? "text" : "password"} id="password" placeholder='Enter password' onChange={(e) => { setPasswordReg(e.target.value) }} />

                <label>Confirm Password: </label>
                <input type={seePassword ? "text" : "password"} id="password" placeholder='Confirm password' onChange={(e) => { setConfirmReg(e.target.value) }} />

                <label>ZIP Code: </label>
                <input type="text" maxLength="5" placeholder='12345' onChange={(e) => { setZipReg(e.target.value) }} />

                <button type='submit'>Create Account</button>
                <button type="button" onClick={showPassword}>Show Password</button>
                <br />

                <p>
                    Already have an account?{" "}
                    <NavLink to="/login">Login here.</NavLink>
                </p>
            </form>
        </div>
    );
}

export default RegistrationForm;
