import React from "react";
import Movies from "./Movies/Movies";
import Artists from "./Artists/Artists";
import Users from "./Users/Users";
import { Tabs } from "antd";
import { useSelector } from "react-redux";

const AdminIndex = () => {
  const { user } = useSelector((state) => state.users);
  return (
    <>
      <div>
        {/* is user has isAdmin = true, user can see the page otherwise NOT */}
        {user?.isAdmin ? (
          <Tabs>
            <Tabs.TabPane tab="Movies" key="1">
              <Movies />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Artists" key="2">
              <Artists />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Users" key="3">
              <Users />
            </Tabs.TabPane>
          </Tabs>
        ) : (
          <div>
            <div className="text-gray-600 text-xl text-center mt-20">
              ⛔️ You are not authorized to view this Page !! ⛔️
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminIndex;
