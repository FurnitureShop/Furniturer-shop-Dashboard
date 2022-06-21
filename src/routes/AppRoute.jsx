
import Categories from 'components/Categories/Categories'
import Category from 'components/Categories/Category'
import UserInfo from "components/UserInfo/UserInfo"
import MainDashboard from 'components/Dashboard/MainDashboard'
import HomePage from 'pages/HomePage'
import LoginPage from 'pages/LoginPage'
import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import {
  CATEGORY_DETAIL,
  CATEGORY_MANAGEMENT,
  DEFAULT_ROUTE,
  LOGIN,
  USER_INFO_MANAGEMENT
} from './route.config'

const AppRoute = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={DEFAULT_ROUTE} element={<HomePage />}>
            <Route index element={<MainDashboard />} />
            <Route path={CATEGORY_MANAGEMENT} element={<Categories />} />
            <Route path={"category"} element={<Category />} />
            <Route path={USER_INFO_MANAGEMENT} element={<UserInfo />} />
          </Route>
          <Route path={LOGIN} element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AppRoute
