import Categories from 'components/Categories/Categories'
import Category from 'components/Categories/Category'
import MainDashboard from 'components/Dashboard/MainDashboard'
import HomePage from 'pages/HomePage'
import LoginPage from 'pages/LoginPage'
import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import { CATEGORY_DETAIL, CATEGORY_MANAGEMENT, DEFAULT_ROUTE, LOGIN } from './route.config'

const AppRoute = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path={DEFAULT_ROUTE} element={<HomePage />}>
                        <Route index element={<MainDashboard />} />
                        <Route path={CATEGORY_MANAGEMENT} element={<Categories />}/>
                        <Route path={"category"} element={<Category />} />
                    </Route>
                    <Route path={LOGIN} element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default AppRoute