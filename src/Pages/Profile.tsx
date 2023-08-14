import React from "react";
import { AuthContext } from "../Store";

const Profile = () => {
  const context = React.useContext(AuthContext);
  const { userData } = context;
  return (
    <div>
      <h1>{userData.FullName ?? ""}</h1>
    </div>
  );
};

export default Profile;
