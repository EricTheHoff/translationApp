import { useState } from 'react'
import React from 'react'

const Login = ({ login }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <>
            <form onSubmit={(e) => {
                login(e, {
                    username: username,
                    password: password
                })
            }}>
                <label for='username'>Username: </label>
                <br></br>
                <input type='text' id='username'/>
                <br></br>
                <label for='password'>Password: </label>
                <br></br>
                <input type='password' id='password'/>
                <br></br>

                <button type='submit'>Login</button>
            </form>
        </>
    )
}

export default Login