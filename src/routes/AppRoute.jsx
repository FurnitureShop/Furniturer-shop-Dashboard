
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
  ADD_PRODUCT_FROM_CATEGORY,
  CATEGORY_DETAIL,
  CATEGORY_MANAGEMENT,
  DEFAULT_ROUTE,
  EDIT_PRODUCT,
  EDIT_PRODUCT_FROM_CATEGORY,
  LOGIN,
  NEW_PRODUCT,
  ORDER_MANAGEMENT,
  PRODUCT_MANAGEMENT,
  USER_INFO_MANAGEMENT
} from './route.config'
import Products from 'components/Products/Products'
import CreateProduct from 'components/Products/CreateProduct'
import EditProduct from 'components/Products/EditProduct'
import Order from 'components/Order/Order'
import OrderDetail from 'components/Order/OrderDetail'

const AppRoute = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={DEFAULT_ROUTE} element={<HomePage />}>
            <Route index element={<MainDashboard />} />
            <Route path={CATEGORY_MANAGEMENT} element={<Categories />} />
            <Route path={CATEGORY_DETAIL} element={<Category />} />
            <Route path={USER_INFO_MANAGEMENT} element={<UserInfo />} />
            <Route path={PRODUCT_MANAGEMENT} element={<Products />} />
            <Route path={NEW_PRODUCT} element={<CreateProduct />} />
            <Route path={EDIT_PRODUCT} element={<EditProduct />} />
            <Route
              path={EDIT_PRODUCT_FROM_CATEGORY}
              element={<EditProduct />}
            />
            <Route
              path={ADD_PRODUCT_FROM_CATEGORY}
              element={<CreateProduct />}
            />
            <Route path={ORDER_MANAGEMENT} element={<Order />} />
            <Route
              path={`${ORDER_MANAGEMENT}/:orderId`}
              element={<OrderDetail />}
            />
          </Route>
          <Route path={LOGIN} element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AppRoute
