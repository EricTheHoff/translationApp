import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const RegistrationForm = () => {

    const navigate = useNavigate()

    const [usernameReg, setUsernameReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")
    const [emailReg, setEmailReg] = useState("")
    const [zipReg, setZipReg] = useState("")

    const register = async (event) => {
        event.preventDefault()
        if (usernameReg === "" || passwordReg === "" || emailReg === "" || zipReg === "") {
            alert("Please enter a valid input")
            return
        }
        await axios.post('/register', {
            name: usernameReg,
            email: emailReg,
            password: passwordReg,
            zipCode: zipReg
        }).then((res) => {
            console.log(res.data)
            if (res.data.message === "Information already in use") {
                alert(res.data.message)
            } else {
                navigate("/translate")
            }
        })
    }

    return (
        <div>
            <form onSubmit={(e) => register(e)}>
                <h1>Create an Account</h1>

                <label>Username</label>
                <input type="text" onChange={(e) => { setUsernameReg(e.target.value) }} />

                <label>Email</label>
                <input type="text" onChange={(e) => { setEmailReg(e.target.value) }} />

                <label>Password</label>
                <input type="text" onChange={(e) => { setPasswordReg(e.target.value) }} />

                <label>ZIP Code</label>
                <input type="text" onChange={(e) => { setZipReg(e.target.value) }} />

                <button type='submit'>Create Account</button>
            </form>
        </div>
    );
}

export default RegistrationForm;
