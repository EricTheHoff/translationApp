import { useState } from 'react'
import { NavLink } from 'react-router-dom'
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
                <input type='text' id='username' onChange={(e) => setUsername(e.target.value)}/>
                <br></br>
                <label for='password'>Password: </label>
                <br></br>
                <input type='password' id='password' onChange={(e) => setPassword(e.target.value)}/>
                <br></br>

                <button type='submit'>Login</button>

                <br></br>

                <p>Don't have an account? <NavLink to='/register'>Register for one here.</NavLink></p>
            </form>
        </>
    )
}

export default Login