import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const RegistrationForm = () => {

    // const navigate = useNavigate()

    // const [usernameReg, setUsernameReg] = useState("")
    // const [passwordReg, setPasswordReg] = useState("")

    // const register = async (event) => {
    //     event.preventDefault()
    //     if (usernameReg === "" || passwordReg === "") {
    //         alert("Please enter a username")
    //     }
    //     await axios.post('/register', {
    //         username: usernameReg,
    //         password: passwordReg
    //     }).then((res) => {
    //         if (res.data === "Username already in use") {
    //             alert(res.data)
    //         } else {
    //             navigate("/")
    //         }
    //     })
    // }

    return (
        <div>
            {/* <form>
                <h1>Create an Account</h1>

                <label>Username</label>

                <input type="text" onChange={(e) => { setUsernameReg(e.target.value) }} />

                <label>Password</label>

                <input type="text" onChange={(e) => { setPasswordReg(e.target.value) }} />

                <button type='submit' onClick={register}>Create Account</button>
            </form> */}
        </div>
    );
}

export default RegistrationForm;
