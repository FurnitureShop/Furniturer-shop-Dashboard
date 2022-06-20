import React, { useState } from 'react'
import CustomBreadcrumb from 'components/shared/CustomBreadcrumb'
import { List, Tabs } from 'antd'
import CategoryListFooter from './CategoryListFooter'
import CategoryListItem from './CategoryListItem'
import AddCategoryModal from './AddCategoryModal'
import EditCategoryModal from './EditCategoryModal'

const Categories = () => {
    const [createVisible, setCreateVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [editingCategory, setEditingCategory] = useState();

    const data = []

    return (
        <div className='categories'>
            <div className='bg-white p-9 pl-6 pt-4'>
                <CustomBreadcrumb />
                <div className="pt-4">
                    <h2>Categories</h2>
                </div>
            </div>

            <div className='bg-white p-9 pl-6 pt-4 mt-4 m-auto w-1/2'>
                {data && data.length > 0 && (
                    <Tabs tabPosition='left'>
                        {data.map(({ name, id, categories }) => (
                            <Tabs.TabPane tab={name} key={id}>
                                <List
                                    itemLayout='horizontal'
                                    footer={
                                        <CategoryListFooter handleClick={() => setCreateVisible(true)} />
                                    }
                                    dataSource={[...categories]}
                                    renderItem={(item, index) => (
                                        <CategoryListItem
                                            key={index}
                                            item={item}
                                            setEditItem={setEditingCategory}
                                        />
                                    )}
                                />
                            </Tabs.TabPane>
                        ))}
                    </Tabs>
                )}
            </div>

            <AddCategoryModal
                key={Math.random()}
                visible={createVisible}
                handleClose={() => setCreateVisible(false)}
            />

            <EditCategoryModal
                key={Math.random()} // random key to  refresh modal
                visible={editVisible}
                handleClose={() => setEditVisible(false)}
                initialValues={editingCategory}
            />

        </div>
    )
}

export default Categories