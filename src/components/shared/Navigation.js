import { BarChartOutlined, GroupOutlined, HddOutlined, SelectOutlined, ShopOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CATEGORY_MANAGEMENT, DEFAULT_ROUTE, INDUSTRY_MANAGEMENT, ORDER_MANAGEMENT, PRODUCT_MANAGEMENT } from 'routes/route.config'

const Navigation = () => {
    const DEFAULT_MENU_ID = DEFAULT_ROUTE
    const [selectedMenuID, setSelectedMenuID] = useState(DEFAULT_MENU_ID)
    const location = useLocation()
    useEffect(() => {
        const path = location.pathname.substring(1, location.pathname.length);
        setSelectedMenuID(path || DEFAULT_MENU_ID)
    }, [location, DEFAULT_MENU_ID])

    return (
        <>
            <Menu theme='dark' mode='inline' selectedKeys={selectedMenuID}>
                <Menu.Item key={DEFAULT_ROUTE} icon={<BarChartOutlined />}>
                    <Link to={DEFAULT_ROUTE}>Dashboard</Link>
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
                <Menu.Item key={INDUSTRY_MANAGEMENT} icon={<GroupOutlined />}>
                    <Link to={INDUSTRY_MANAGEMENT}>Industries</Link>
                </Menu.Item>
            </Menu>
        </>
    )
}

export default Navigation