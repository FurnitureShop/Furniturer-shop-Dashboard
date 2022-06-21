import { Card, Col, Form, Input, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import ChangePasswordForm from "./form/ChangePasswordForm";
import UserInfoForm from "./form/UserInfoForm";

export default function UserInfo() {
  return (
    <div className="mx-12">
      <Row gutter={[16, 24]}>
        <Row className="text-4xl font-bold">Account</Row>
        <Col span={24}>
          <Card
            title={
              <Meta
                className="pt-3"
                title={<div className="text-xl">Profile</div>}
                description="The information can be edited"
              />
            }
          >
            <UserInfoForm />
          </Card>
        </Col>
        <Col span={24}>
          <Card
            title={
              <Meta
                className="pt-3"
                title={<div className="text-xl">Password</div>}
                description="Update password"
              />
            }
          >
            <ChangePasswordForm />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
