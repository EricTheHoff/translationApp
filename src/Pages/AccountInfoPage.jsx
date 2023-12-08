import React from "react";
import { Link } from "react-router-dom";
import Profile from "../Components/Profile"


const AccountInfoPage = () => {
  return (
    <div>
      <Profile />
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default AccountInfoPage;
