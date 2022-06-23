import { Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import CustomBreadcrumb from "components/shared/CustomBreadcrumb";
import React from "react";
import ChangePasswordForm from "./form/ChangePasswordForm";
import UserInfoForm from "./form/UserInfoForm";
import "./UserInfo.scss"

export default function UserInfo() {
  return (
    <div className="user mx-12">
      <Row className="!mx-0" gutter={[16, 18]}>
        <div className="bg-white px-9 py-6 w-full">
          <CustomBreadcrumb />
          <div className="pt-3">
            <h2 className="text-2xl font-semibold mb-0">User</h2>
          </div>
        </div>
        <Col className="!px-0" span={24}>
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
        <Col className="!px-0" span={24}>
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
