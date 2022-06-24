import React, { useEffect, useState } from "react";
import CustomBreadcrumb from "components/shared/CustomBreadcrumb";
import { List } from "antd";
import CategoryListFooter from "./CategoryListFooter";
import CategoryListItem from "./CategoryListItem";
import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  selectAllCategories,
} from "store/categorySlice";
// import { store } from "../../store";

const Categories = () => {
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState();

  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const allCategories = useSelector((state) => selectAllCategories(state));

  useEffect(() => {
    dispatch(getAllCategories()).then((value) => {
      setData(value.payload.category);
    });
  }, []);

  useEffect(() => {
    setData(allCategories);
  }, [allCategories]);

  return (
    <div className="categories">
      <div className="bg-white px-9 py-6">
        <CustomBreadcrumb />
        <div className="pt-3">
          <h2 className="text-2xl font-semibold mb-0">Categories</h2>
        </div>
      </div>

      <div className="bg-white p-9 pl-6 pt-4 mt-4 m-auto w-1/2">
        {data && data.length > 0 && (
          <List
            itemLayout="horizontal"
            footer={
              <CategoryListFooter handleClick={() => setCreateVisible(true)} />
            }
            dataSource={[...data]}
            renderItem={(item, index) => (
              <CategoryListItem
                key={index}
                item={item}
                setEditItem={setEditingCategory}
                setEditVisible={setEditVisible}
              />
            )}
          />
        )}
      </div>

      <AddCategoryModal
        key={createVisible || Math.random()}
        visible={createVisible}
        handleClose={() => setCreateVisible(false)}
      />

      <EditCategoryModal
        key={editVisible || Math.random()}
        // random key to  refresh modal
        visible={editVisible}
        handleClose={() => setEditVisible(false)}
        initialValues={editingCategory}
      />
    </div>
  );
};

export default Categories;
