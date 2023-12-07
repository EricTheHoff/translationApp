import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const StudyPage = () => {
    const dispatch = useDispatch()
  return (
    <div>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

dispatch({ type: 'Logged In'})

export default StudyPage;
