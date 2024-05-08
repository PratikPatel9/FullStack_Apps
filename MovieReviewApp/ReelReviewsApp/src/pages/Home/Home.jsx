import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.users);
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold text-gray-600">
          Welcome to the App : {user?.firstName}
        </h1>
      </div>
    </>
  );
};

export default Home;
