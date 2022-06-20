import { List, Popover, Button, Avatar } from 'antd'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const CategoryListItem = ({ index, item, setEditItem}) => {
    const [confirmVisible, setConfirmVisible] = useState(false);

    const { pathname } = useLocation();

    return (
        <List.Item
            key={index}
            actions={[
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a key="list-category-edit" onClick={() => setEditItem(item)}>
                    Edit
                </a>,
                <Popover
                visible={confirmVisible}
                placement="topLeft"
                title="Delete category will make all product in this category become 'Uncategoried'"
                content={
                  <div className="text-right">
                    <Button
                      type="primary"
                      className="mr-2"
                      danger
                    >
                      OK
                    </Button>
                    <Button title="Cancel" onClick={(_) => setConfirmVisible(false)}>
                      Cancel
                    </Button>
                  </div>
                }
                trigger="click"
              >
                <a key="list-category-delete" onClick={(_) => setConfirmVisible(true)}>
                  Delete
                </a>
              </Popover>,
            ]}>
            <List.Item.Meta
                avatar={<Avatar src={item.image} />}
                title={
                    <Link to={`${pathname}/${item.name}`} state={{ id: item.id }}>
                        {item.name}
                    </Link>
                }
            />
        </List.Item>
    )
}

export default CategoryListItem