import React from "react";
import { useSelector } from "react-redux";
import Profile from "../Components/Profile";

const AccountInfoPage = () => {
  const id = useSelector((state) => state.userId);
  return (
    <div>
      <Profile />
      {/* <Link to="/">Back to Home</Link> */}
    </div>
  );
};

export default AccountInfoPage;
