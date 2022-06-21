import { Layout } from "antd";
import { Content, Footer } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import Navigation from "components/shared/Navigation";
import React from "react";
import { Outlet } from "react-router-dom";

const logoDashboard = require("../assets/logo_main.png");

const HomePage = () => {

  return (
    <Layout style={{ minHeight: "100vh" }} hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "auto",
          minHeight: "100vh",
        }}
      >
        <div className="flex gap-2 items-center">
          <img
            className="object-contain bg-white p-3"
            height={50}
            src={logoDashboard}
            alt="logo"
          />
        </div>
        <Navigation />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <Outlet />
        </Content>
        <Footer className="text-center">
          Furniturer Administator webstie ©2022 Created by{" "}
          <b>FURNITURER TEAM</b>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default HomePage;
