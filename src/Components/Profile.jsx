import React from 'react';
import { useState, useEffect } from 'react';


const Profile = () => {

    const [file, setFile] = useState("")

    const handleChange = (e) => {

        console.log(e.target.files)
    
        setFile(URL.createObjectURL(e.target.files[0]))

    }

    return (
        <div>
            <h1>Profile</h1>

            <label>Add Image</label>
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
            <input type="text" />
        </div>
    );
}

export default Profile;