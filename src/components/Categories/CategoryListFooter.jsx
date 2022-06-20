import { PlusOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import React from 'react'

const CategoryListFooter = ({ handleClick }) => {
    return (
        <Tooltip placement='topLeft' title="Can't add catogory at this time">
            <Button type='dashed' disabled className='w-full' onClick={handleClick}>
                <PlusOutlined />
                Add to list
            </Button>
        </Tooltip>
    )
}

export default CategoryListFooter