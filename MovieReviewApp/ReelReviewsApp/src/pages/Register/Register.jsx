import React, { useEffect } from "react";
import { Form, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../API/users";
import { antValidationError } from "../../helpers/helper";

const Register = () => {
  // const [form] = Form.useForm(); // create a form instance so we can use it to clear the form
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    // console.log("Login Data :", values);
    try {
      const response = await RegisterUser(values);
      message.success(response.message);
      console.log(values);
      navigate("/login");
      // form.resetFields(); // clear the form fields
    } catch (error) {
      message.error(error.message);
    }
  };
  // validate token from home page, where once token is genrated I wont allow user to go on Login or registerpage using below useEffect
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
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
            <h1 className="text-2xl my-5 mb-2">Register</h1>
            <hr />
            <Form
              layout="vertical"
              className="flex flex-col gap-5 mt-3"
              onFinish={handleSubmit}
            >
              <Form.Item
                label="First Name"
                name="firstName"
                value="firstName"
                rules={antValidationError}
              >
                <input />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastName"
                value="lastName"
                rules={antValidationError}
              >
                <input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                value="email"
                rules={antValidationError}
              >
                <input type="email" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                value="password"
                rules={antValidationError}
              >
                <input type="password" />
              </Form.Item>
              <div className="flex flex-col gap-5">
                <Button type="primary" htmlType="submit" block>
                  Register
                </Button>

                <Link to="/login">Already have an Account? Login Here</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
