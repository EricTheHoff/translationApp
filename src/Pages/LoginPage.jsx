import axios from 'axios'
import React from 'react'
import Login from '../Components/Login.jsx'

const LoginPage = () => {
    const login = async (e, loginData) => {
        e.preventDefault()
        // await axios.post('/login', loginData)

        // .then(async () => {
        //     const user = await axios.get('/user')
        //     dispatch({ type: 'Logged In' })
        //     dispatch({ type: 'User', payload: user.data.userId })
        //     navigate()
        // })

        // .catch((error) => {
        //     console.log(`The following error has occurred: ${error}`)
        // })
    }

    return (
        <>
            <Login
            login={login}
            />
        </>
    )
}

export default LoginPage