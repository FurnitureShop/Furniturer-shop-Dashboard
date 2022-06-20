import Categories from 'components/Categories/Categories'
import MainDashboard from 'components/Dashboard/MainDashboard'
import HomePage from 'pages/HomePage'
import LoginPage from 'pages/LoginPage'
import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import { CATEGORY_MANAGEMENT, DEFAULT_ROUTE, LOGIN } from './route.config'

const AppRoute = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path={DEFAULT_ROUTE} element={<HomePage />}>
                        <Route index element={<MainDashboard />} />
                        <Route path={CATEGORY_MANAGEMENT} element={<Categories />}/>
                        
                    </Route>
                    <Route path={LOGIN} element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default AppRoute