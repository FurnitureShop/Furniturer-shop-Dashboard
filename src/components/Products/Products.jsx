import React from "react";
import { useNavigate } from "react-router";
import { Button, Card, Input, Popconfirm } from "antd";
import { NEW_PRODUCT } from "routes/route.config";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import Paragraph from "antd/lib/skeleton/Paragraph";
import CustomBreadcrumb from "components/shared/CustomBreadcrumb";

const Products = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div>
            <div className="bg-white p-9 pl-6 pt-4">
                <CustomBreadcrumb />
                <div className="pt-4">
                    <h2>Products</h2>
                </div>
            </div>

            <div className="mt-6 m-auto w-1/2">
                <Input.Search
                    onChange
                    placeholder="Find a product"
                    enterButton="Search"
                    size="large"
                ></Input.Search>
            </div>
        </div>
    )
}

export default Products

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