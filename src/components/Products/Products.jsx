import React from "react";
import { useNavigate } from "react-router";
import { Button, Card, Popconfirm } from "antd";
import { NEW_PRODUCT } from "routes/route.config";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import Paragraph from "antd/lib/skeleton/Paragraph";

export function ProductCard({
    loading,
    title,
    description,
    onEditPressed,
    stockStatus,
    image,
    id,
    purchased,
    price,
    rating,
    onDeleteProduct,
}) {
    // const dispatch = useDispatch();
    return (
        <Card
            hoverable={false}
            actions={[
                <EditOutlined key="edit" onClick={onEditPressed} />,
                <Popconfirm
                    placement="topLeft"
                    title="Pernamently delete this product"
                    onConfirm={onDeleteProduct}
                    okText="OK"
                    okButtonProps={{ danger: true }}
                    cancelText="Cancel"
                >
                    <DeleteOutlined key="delete" />,
                </Popconfirm>,
            ]}
        >
            <div className="text-center">
                <img
                    src={image}
                    className="w-full mb-4 h-60 object-cover"
                    alt="error"
                />

                <Paragraph
                    className="font-semibold text-xl"
                    ellipsis={{ rows: 1, expandable: true, symbol: "more" }}
                >
                    {title}
                </Paragraph>
                <p className="font-semibold text-blue-600 text-xl tracking-tight">
                    ${price}
                </p>
                <p className="mb-0">SOLD: {purchased} item(s)</p>
            </div>
        </Card>
    );
}

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