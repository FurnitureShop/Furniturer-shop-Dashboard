/* eslint-disable jsx-a11y/anchor-is-valid */
import { List, Popover, Button } from "antd";
import { ENP_CATEGORY } from "api/EndPoint";
import { axios } from "lib/axios/Interceptor";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { categoryDeleteWithId } from "store/categorySlice";

const CategoryListItem = ({ index, item, setEditItem, setEditVisible }) => {
  const [confirmVisible, setConfirmVisible] = useState(false);

  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const onClickEdit = () => {
    setEditItem(item);
    setEditVisible(true);
  };

  const onClickDelete = () => {
    axios.delete(ENP_CATEGORY + item._id).then(() => {
      dispatch(categoryDeleteWithId(item.name));
      setConfirmVisible(false);
    });
  };

  return (
    <List.Item
      key={index}
      actions={[
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a key="list-category-edit" onClick={onClickEdit}>
          Edit
        </a>,
        <Popover
          visible={confirmVisible}
          placement="topLeft"
          title="Do you want to delete this category"
          // title="Delete category will make all product in this category become 'Uncategoried'"
          content={
            <div className="text-right">
              <Button
                onClick={onClickDelete}
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
          <a key="list-category-delete" onClick={() => setConfirmVisible(true)}>
            Delete
          </a>
        </Popover>,
      ]}
    >
      <List.Item.Meta
        // avatar={<Avatar src={item.image} />}
        title={
          <Link to={`${pathname}/${item.name}`} state={{ id: item.id }}>
            {item.name}
          </Link>
        }
      />
    </List.Item>
  );
};

export default CategoryListItem;
