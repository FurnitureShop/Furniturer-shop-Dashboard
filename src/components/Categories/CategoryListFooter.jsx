import { PlusOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import React from "react";

const CategoryListFooter = ({ handleClick }) => {
  return (
    <Tooltip placement="topLeft" title="Add catogory">
      <Button type="dashed" className="w-full !px-10 !py-3 !h-fit" onClick={handleClick}>
        <PlusOutlined />
        Add new category to list
      </Button>
    </Tooltip>
  );
};

export default CategoryListFooter;
