import { Breadcrumb } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { breadcrumbRoutes } from 'routes/route.config'
import useReactRouterBreadcrumbs from 'use-react-router-breadcrumbs'


const CustomBreadcrumb = () => {
    const breadcrumbs = useReactRouterBreadcrumbs(breadcrumbRoutes)

    return (
        <Breadcrumb>
            {breadcrumbs.map(({ match, breadcrumb }, index) => (
                <Breadcrumb.Item key={index}>
                    <Link to={match.pathname}>{breadcrumb}</Link>
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    )
}

export default CustomBreadcrumb