import React from "react";
import { Form, Button } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
  const handleSubmit = (values) => {
    console.log("Login Data :", values);
  };

  return (
    <>
      <div className="grid grid-cols-2 h-screen">
        <div className="bg-primary flex flex-col items-center justify-center">
          <div>
            <h1 className="text-7xl text-orange-600 font-semibold">
              Reel Reviews App
            </h1>
            <span className="text-xl text-gray-400 mt-4 flex items-center justify-center">
              Let's share your reviews for the Reels!!
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-[400px]">
            <h1 className="text-2xl my-5 mb-2">Login</h1>
            <hr />
            <Form
              layout="vertical"
              className="flex flex-col gap-5 mt-3"
              onFinish={handleSubmit}
            >
              <Form.Item label="Email" name="email">
                <input type="email" />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <input type="password" />
              </Form.Item>
              <div className="flex flex-col gap-5">
                <Button type="primary" htmlType="submit" block>
                  Login
                </Button>

                <Link to="/register">Dont' have an Account? Register Here</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
