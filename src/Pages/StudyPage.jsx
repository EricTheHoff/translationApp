import React from "react";
import { useState  } from "react";
import { Link, useNavigate } from "react-router-dom";

const StudyPage = () => {
  const [studySaved, setStudySaved] = useState(false)
  const [studySeed, setStudySeed] = useState(false)
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()

    if (studySaved === true) {
        navigate('/study-saved')
        return
    } else if (studySeed === true) {
        navigate('/study-seed')
        return
    } else {
        alert(`Something went wrong. Please try again.`)
    }
  }

    return (
        <>
            <form onSubmit={submit}>
                <h3>Further Study</h3>
                <h4>Choose your Study Pool</h4>
                <button type='submit' onClick={(e) => setStudySaved(true)}>My Saved Translations</button>
                <br/>
                <button type='submit' onClick={(e) => setStudySeed(true)}>Sample Translations</button>
            </form>

            <Link to='/'>Back to Home</Link>
        </>
    )
}

export default StudyPage;
