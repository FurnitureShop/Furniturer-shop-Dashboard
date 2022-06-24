/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Card, Input, Popconfirm, Col, Row, Typography } from "antd";
import { NEW_PRODUCT, PRODUCT_MANAGEMENT } from "routes/route.config";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import CustomBreadcrumb from "components/shared/CustomBreadcrumb";
import { useSelector } from "react-redux";
import "./Products.scss";
import {
  deleteProduct,
  getAllProduct,
  selectProduct,
} from "store/productSlice";
import { filterCustomerName } from "utils/filterCustomerName";

const { Paragraph } = Typography;

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productEditing, setProductEditing] = useState(false);
  const [editProduct] = useState();

  const products = useSelector(selectProduct);
  const [data, setData] = useState();

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(getAllProduct()).then((value) => {
        setData(value.payload.product);
      });
    } else if (products && products.length !== 0) setData(products);
  }, []);

  const handleAddProduct = () => {
    setProductEditing(!productEditing);
  };

  const onDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
    const tempData = [...data];
    tempData.forEach((value, index) => {
      if (value._id === id) {
        tempData.splice(index, 1);
      }
    });

    setData(tempData);
  };

  const onEditProduct = (product) => {
    navigate(`/${PRODUCT_MANAGEMENT}/${product?.name}`, {
      state: { product: product },
    });
  };

  const onSearch = (value) => {
    const filteredData = filterCustomerName(value, "name", products);
    setData(filteredData);
  };

  const onClear = (value) => {
    if (value === "") {
      onSearch(value);
    }
  };

  useEffect(() => {
    if (editProduct) {
      setProductEditing(true);
    }
  }, [editProduct]);

  return (
    <div className="products">
      <div className="bg-white p-9 pl-6 pt-4">
        <CustomBreadcrumb />
        <div className="pt-4">
          <h2>Products</h2>
        </div>
      </div>

      <div className="mt-6 m-auto w-1/2">
        <Input.Search
          onSearch={onSearch}
          onChange={(e) => onClear(e.target.value)}
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
          {data && data?.length > 0 ? (
            data.map((item) => (
              <Col className="gutter-row" xl={6} lg={8} md={12} key={item._id}>
                <ProductCard
                  id={item._id}
                  title={item.name}
                  description={item.description}
                  onEditPressed={() => onEditProduct(item)}
                  price={item.price}
                  image={item.image}
                  inStock={item.inStock}
                  onDeleteProduct={() => {
                    onDeleteProduct(item._id);
                  }}
                />
              </Col>
            ))
          ) : (
            <div className="h-60 ">No product to display!</div>
          )}
        </Row>
      </div>
    </div>
  );
};

export default Products;

export function ProductCard({
  title,
  onEditPressed,
  image,
  inStock,
  price,
  onDeleteProduct,
}) {
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
        <p className="mb-0">Instock: {inStock} item(s)</p>
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
