import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "../Components/Profile"


const AccountInfoPage = () => {
    const id = useSelector((state) => state.userId)
    console.log(id)
  return (
    <div>
      <Profile />
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default AccountInfoPage;
