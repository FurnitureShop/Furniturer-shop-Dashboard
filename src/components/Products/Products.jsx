import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Card, Input, Popconfirm, Col, Row } from "antd";
import { NEW_PRODUCT, PRODUCT_MANAGEMENT } from "routes/route.config";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import Paragraph from "antd/lib/skeleton/Paragraph";
import CustomBreadcrumb from "components/shared/CustomBreadcrumb";
import useDebounce from "hooks/useDebounce";
import { getAllProduct, getProductWithName } from "store/productSlice";
import { useSelector } from "react-redux";
import "./Products.scss"

const Products = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [productEditing, setProductEditing] = useState(false)
    const [editProduct, setEditProduct] = useState()

    let products = []
    products = useSelector(getAllProduct)

    const handleAddProduct = () => {
        setProductEditing(!productEditing);
    };

    const onEditProduct = (product) => {
        navigate(`/${PRODUCT_MANAGEMENT}/${product?.title}`, {
            state: { id: product.id },
        });
    };

    const onSearch = (e) => {
        const searchKeyword = e.target.value
        dispatch(getProductWithName(searchKeyword))
    }

    useEffect(() => {
        if (editProduct) {
            setProductEditing(true);
        }
    }, [editProduct]);

    useEffect(() => {
        dispatch(getAllProduct());
    }, []);

    return (
        <div className="products">
            <div className="bg-white px-9 py-6">
                <CustomBreadcrumb />
                <div className="pt-3">
                    <h2 className="text-2xl font-semibold mb-0">Products</h2>
                </div>
            </div>

            <div className="mt-6 m-auto w-1/2">
                <Input.Search
                    onChange={useDebounce(onSearch)}
                    placeholder="Find a product"
                    enterButton="Search"
                    size="large"
                ></Input.Search>
            </div>

            <div className="mt-2">
                <Row gutter={[8, 8]}>
                    <Col className="gutter-row" xl={6} lg={8} md={12}>
                        <AddProduct handlePress={handleAddProduct} />
                    </Col>
                    {/* {products && products?.length > 0 ? (
                        products.map(({ name, purchased, price, id, image, rating }) => (
                            <Col className="gutter-row" xl={6} lg={8} md={12} key={id}>
                                <ProductCard
                                    id={id}
                                    title={name}
                                    description={purchased}
                                    onEditPressed={() =>
                                        onEditProduct({
                                            title: name,
                                            purchased,
                                            price,
                                            id,
                                        })
                                    }
                                    price={price}
                                    rating={rating}
                                    image={image}
                                    purchased={purchased}
                                    // onDeleteProduct={() => {
                                    //     dispatch(deleteProduct({ id, name }));
                                    // }}
                                />
                            </Col>
                        ))
                    ) : (
                        <div className="h-60 ">No product to display!</div>
                    )} */}
                </Row>
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
            className="w-full !px-10 !py-3 !h-fit"
            style={{ minHeight: "100%" }}
            onClick={handlePress}
        >
            <PlusOutlined />
            Add new product
        </Button>
    );
}