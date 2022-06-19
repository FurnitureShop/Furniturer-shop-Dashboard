import HomePage from 'pages/HomePage'
import LoginPage from 'pages/LoginPage'
import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import { DEFAULT_ROUTE, LOGIN } from './route.config'

const AppRoute = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path={DEFAULT_ROUTE} element={<HomePage />}>

                    </Route>
                    <Route path={LOGIN} element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default AppRoute