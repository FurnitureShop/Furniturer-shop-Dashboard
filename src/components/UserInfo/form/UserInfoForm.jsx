import { Col, Form, Input, Row, Button } from "antd";
import FloatLabel from "components/controls/FloatLabel/FloatLabel";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoading, selectUser, updateInfo } from "store/userSlice";

export default function UserInfoForm() {
  const [form] = Form.useForm();

  const user = useSelector(selectUser);
  const isLoading = useSelector(selectLoading);
  const dispatch = useDispatch();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const onFullNameChangeHandler = (value) => {
    form.setFieldsValue({ name: value });
  };

  const onPhoneNumberChangeHandler = (value) => {
    form.setFieldsValue({ phone: value });
  };

  const onFinish = (values) => {
    dispatch(updateInfo(values));
  };

  return (
    <Form
      form={form}
      className="user_info_form"
      name="user_info_form"
      wrapperCol={{ span: 24 }}
      initialValues={{ name: user.name, phone: user.phone }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Row className="mb-2">
        <Col span={24}>
          <Form.Item
            name="name"
            shouldUpdate={(prevValues, curValues) =>
              curValues.name.length === 0 || curValues.name.length === 1
            }
          >
            <FloatLabel label="Full name" value={form.getFieldValue("name")}>
              <Input
                size="large"
                defaultValue={user.name}
                onChange={(e) => onFullNameChangeHandler(e.target.value)}
              />
            </FloatLabel>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            style={{ marginTop: "0px" }}
            name="phone"
            shouldUpdate={(prevValues, curValues) =>
              curValues.phone.length === 0 || curValues.phone.length === 1
            }
          >
            <FloatLabel
              label="Phone number"
              value={form.getFieldValue("phone")}
            >
              <Input
                size="large"
                defaultValue={user.phone}
                onChange={(e) => onPhoneNumberChangeHandler(e.target.value)}
              />
            </FloatLabel>
          </Form.Item>
        </Col>
        <Col span={12}>
          <FloatLabel label="Email" value={user.email} disabled>
            <Input
              className="cursor-not-allowed"
              size="large"
              value={user.email}
              disabled
            />
          </FloatLabel>
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
              Save information
            </span>
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
}
