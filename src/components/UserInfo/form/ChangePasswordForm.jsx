import { Button, Col, Form, Input, Row } from "antd";
import FloatLabel from "components/controls/FloatLabel/FloatLabel";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, selectError, selectLoading } from "store/userSlice";

export default function ChangePasswordForm() {
  const [form] = Form.useForm();
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);
  const dispatch = useDispatch();
  const prevLoadingStatus = useRef();

  useEffect(() => {
    if (prevLoadingStatus.current == true) {
      if (!isError) form.resetFields();
    } else prevLoadingStatus.current = isLoading;
  }, [isLoading]);

  const onOldPasswordChangeHandler = (value) => {
    form.setFieldsValue({ oldPassword: value });
  };

  const onNewPasswordChangeHandler = (value) => {
    form.setFieldsValue({ newPassword: value });
  };
  const onConfirmPasswordChangeHandler = (value) => {
    form.setFieldsValue({ confirmPassword: value });
  };

  const onFinish = (values) => {
    if (values.newPassword === values.confirmPassword) {
      dispatch(
        changePassword({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        })
      );
    }
  };
  return (
    <Form
      form={form}
      className="user_change_password_form"
      name="user_change_password_form"
      wrapperCol={{ span: 24 }}
      initialValues={{ oldPassword: "", newPassword: "", confirmPassword: "" }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Row className="mb-2">
        <Col span={24}>
          <Form.Item
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Please input your password!",
                type: "string",
                min: 4,
              },
            ]}
            shouldUpdate={(prevValues, curValues) =>
              curValues.oldPassword.length === 0 ||
              curValues.oldPassword.length === 1
            }
          >
            <FloatLabel
              label="Old password"
              value={form.getFieldValue("oldPassword")}
            >
              <Input
                type="password"
                size="large"
                onChange={(e) => onOldPasswordChangeHandler(e.target.value)}
              />
            </FloatLabel>
          </Form.Item>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col span={24}>
          <Form.Item
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please input your password!",
                type: "string",
                min: 4,
              },
            ]}
            shouldUpdate={(prevValues, curValues) =>
              curValues.newPassword.length === 0 ||
              curValues.newPassword.length === 1
            }
          >
            <FloatLabel
              label="New password"
              value={form.getFieldValue("newPassword")}
            >
              <Input
                type="password"
                size="large"
                onChange={(e) => onNewPasswordChangeHandler(e.target.value)}
              />
            </FloatLabel>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
                type: "string",
                min: 4,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
            shouldUpdate={(prevValues, curValues) =>
              curValues.confirmPassword.length === 0 ||
              curValues.confirmPassword.length === 1
            }
          >
            <FloatLabel
              label="Confirm new password"
              value={form.getFieldValue("confirmPassword")}
            >
              <Input
                type="password"
                size="large"
                onChange={(e) => onConfirmPasswordChangeHandler(e.target.value)}
              />
            </FloatLabel>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Form.Item>
          <Button
            className="w-44"
            size="large"
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            <span style={{ font: "italic 16px EB Garamond" }}>
              Update password
            </span>
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
}
