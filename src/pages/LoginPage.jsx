/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login, selectLoading } from "store/userSlice";
import { useNavigate } from "react-router-dom";
import { getAllProduct } from "store/productSlice";

const LoginPage = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);

  const onFinish = (values) => {
    dispatch(login(values)).then((value) => {
      if (value.payload.user) {
        dispatch(getAllProduct());
        navigate("/");
      } else {
      }
    });
  };

  const onEmailChangeHandler = (value) => {
    form.setFieldsValue({ email: value });
  };

  const onPasswordChangeHandler = (value) => {
    form.setFieldsValue({ password: value });
  };

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="w-1/3 bg-white px-12 py-8 rounded-lg shadow-md">
        <h3>Furniturer Dashboard</h3>
        <Form
          form={form}
          style={{ margin: "auto" }}
          initialValues={{
            email: "",
            password: "",
          }}
          onFinish={onFinish}
        >
          <Form.Item name="email">
            <Input
              onChange={(e) => {
                onEmailChangeHandler(e.target.value);
              }}
              defaultValue="admin@123"
              prefix={<UserOutlined />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item name="password">
            <Input
              onChange={(e) => {
                onPasswordChangeHandler(e.target.value);
              }}
              defaultValue="admin"
              prefix={<LockOutlined />}
              placeholder="Password"
              type={"password"}
            />
          </Form.Item>
          <Form.Item>
            <div className="flex flex-row justify-between">
              <Form.Item valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              {/* <a className="" href="#">
                Forgot password
              </a> */}
            </div>
          </Form.Item>

          <Form.Item className="!mb-0">
            <Button
              type="primary"
              htmlType="submit"
              className="mr-2"
              loading={loading}
            >
              Login
            </Button>
            {/* Or
            <a className="ml-2" href="#">
              Register now
            </a> */}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
