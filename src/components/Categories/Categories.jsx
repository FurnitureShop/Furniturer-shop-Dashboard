import React from 'react'
import CustomBreadcrumb from 'components/shared/CustomBreadcrumb'

const Categories = () => {
    return (
        <div className='categories'>
            <div className='bg-white p-9 pl-6 pt-4'>
                <CustomBreadcrumb />
                <div className="pt-4">
                    <h2>Categories</h2>
                </div>
            </div>
        </div>
    )
}

export default Categories