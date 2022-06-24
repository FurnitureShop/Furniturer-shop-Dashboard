import {
  BarChartOutlined,
  HddOutlined,
  LogoutOutlined,
  SelectOutlined,
  ShopOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  CATEGORY_MANAGEMENT,
  CUSTOMER_MANAGEMENT,
  DEFAULT_ROUTE,
  LOGIN,
  ORDER_MANAGEMENT,
  PRODUCT_MANAGEMENT,
  USER_INFO_MANAGEMENT,
} from "routes/route.config";
import { logout } from "store/userSlice";
import "./Navigation.scss";

const Navigation = () => {
  const DEFAULT_MENU_ID = DEFAULT_ROUTE;
  const LOGOUT = -1;
  const [selectedMenuID, setSelectedMenuID] = useState(DEFAULT_MENU_ID);
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname.substring(1, location.pathname.length);
    setSelectedMenuID(path || DEFAULT_MENU_ID);
  }, [location, DEFAULT_MENU_ID]);

  const dispatch = useDispatch();

  return (
    <>
      <Menu
        className="navigation"
        theme="dark"
        mode="inline"
        selectedKeys={selectedMenuID}
      >
        <Menu.Item key={DEFAULT_ROUTE} icon={<BarChartOutlined />}>
          <Link to={DEFAULT_ROUTE}>Dashboard</Link>
        </Menu.Item>
        <Menu.Item key={CUSTOMER_MANAGEMENT} icon={<UsergroupAddOutlined />}>
          <Link to={CUSTOMER_MANAGEMENT}>Customers</Link>
        </Menu.Item>
        <Menu.Item key={ORDER_MANAGEMENT} icon={<ShopOutlined />}>
          <Link to={ORDER_MANAGEMENT}>Order</Link>
        </Menu.Item>
        <Menu.Item key={PRODUCT_MANAGEMENT} icon={<SelectOutlined />}>
          <Link to={PRODUCT_MANAGEMENT}>Products</Link>
        </Menu.Item>
        <Menu.Item key={CATEGORY_MANAGEMENT} icon={<HddOutlined />}>
          <Link to={CATEGORY_MANAGEMENT}>Categories</Link>
        </Menu.Item>
        <Menu.Item key={USER_INFO_MANAGEMENT} icon={<UserOutlined />}>
          <Link to={USER_INFO_MANAGEMENT}>User</Link>
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            dispatch(logout());
          }}
          key={LOGOUT}
          icon={<LogoutOutlined />}
        >
          <Link to={LOGIN}>Logout</Link>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default Navigation;
