import MainDashboard from "components/Dashboard/MainDashboard";
import UserInfo from "components/UserInfo/UserInfo";
import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DEFAULT_ROUTE, LOGIN, USER_INFO_MANAGEMENT } from "./route.config";

const AppRoute = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={DEFAULT_ROUTE} element={<HomePage />}>
            <Route index element={<MainDashboard />} />
            <Route path={USER_INFO_MANAGEMENT} element={<UserInfo />} />
          </Route>
          <Route path={LOGIN} element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRoute;
