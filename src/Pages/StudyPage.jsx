import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const StudyPage = () => {
    const dispatch = useDispatch()
    dispatch({ type: 'Logged In'})
  return (
    <div>
      <Link to="/">Back to Home</Link>
    </div>
  );
};


export default StudyPage;
