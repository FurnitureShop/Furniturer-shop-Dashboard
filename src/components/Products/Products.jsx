import React from "react";
import { useNavigate } from "react-router";
import { Button } from "antd";
import { NEW_PRODUCT } from "routes/route.config";
import { PlusOutlined } from "@ant-design/icons";

export function AddProduct({ path = NEW_PRODUCT, state }) {
    const navigate = useNavigate();
    const handlePress = () => {
        navigate(path, { state: state });
    };
    return (
        <Button
            type="dashed"
            className="w-full "
            style={{ minHeight: "100%" }}
            onClick={handlePress}
        >
            <PlusOutlined />
            add new product
        </Button>
    );
}