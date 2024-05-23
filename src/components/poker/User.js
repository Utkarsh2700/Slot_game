import React from "react";
import Main from "../../assets/poker/Main";

const User = () => {
  return (
    <div className="flex">
      <img src="user.png" alt="user" className="w-20" />
      <div className="px-4">
        <h3>UserName</h3>
        <p>$175,500</p>
      </div>
    </div>
  );
};

export default User;
