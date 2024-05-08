import React from "react";
import { message } from "antd";
import { useState, useEffect } from "react";
import { GetCurrentUser } from "../API/users.js";
import { useNavigate } from "react-router-dom";

const ProtectedPage = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getCurrentUser = async () => {
    try {
      const response = await GetCurrentUser();
      setUser(response.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getCurrentUser();
    }
  }, []);
  return (
    <div>
      {user && (
        <h1>
          {" "}
          Welcome to the Reel Review : {user.firstName} {user.lastName}
        </h1>
      )}
      {children}
    </div>
  );
};

export default ProtectedPage;
