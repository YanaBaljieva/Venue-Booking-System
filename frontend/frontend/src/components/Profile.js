import React, {useState, useCallback} from "react";
import axios from "axios";
import AuthService from "../services/auth.service";
const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <div className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </div>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};

export default Profile;
