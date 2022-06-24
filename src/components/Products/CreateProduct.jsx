/* eslint-disable react-hooks/exhaustive-deps */
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import CustomBreadcrumb from "components/shared/CustomBreadcrumb";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { PRODUCT_MANAGEMENT } from "routes/route.config";
import { getAllCategories, selectAllCategories } from "store/categorySlice";
import { createProduct } from "store/productSlice";
import { SizeInput } from "./component/SizeInput";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [form] = useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState();

  const categories = useSelector((state) => selectAllCategories(state));

  useEffect(() => {
    if (!categories || categories.length === 0) dispatch(getAllCategories());
  }, []);

  const onFinish = (value) => {
    setLoading(true);
    console.log(value);
    if (value.upload && value.upload.length !== 0) {
      dispatch(createProduct(value)).then((response) => {
        setLoading(false);
        navigate(`/${PRODUCT_MANAGEMENT}`);
      });
    }
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div>
      <div className="bg-white p-9 pl-6 pt-4">
        <CustomBreadcrumb />
        <div className="pt-4">
          <h2>New product</h2>
        </div>
      </div>

      <div className="bg-white p-9 pt-0 pl-6">
        <Form
          form={form}
          layout="vertical"
          name="nest-messages"
          onFinish={onFinish}
        >
          <Row>
            <Col span={8}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  { required: true, message: "Please input product name" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please input description" },
                ]}
              >
                <Input.TextArea rows={6} />
              </Form.Item>
              <Form.Item
                name="category"
                label="Category"
                initialValue={location.state?.categoryId}
                rules={[
                  { required: true, message: "Please select a category" },
                ]}
              >
                <Select placeholder="Uncategorized" mode="tags">
                  {categories.map(({ id, name }) => (
                    <Select.Option value={name} key={id}>
                      {name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="material"
                label="Material"
                rules={[
                  { required: true, message: "Material of product is missing" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="size"
                label="Size"
                rules={[
                  {
                    required: true,
                    message: "Size of product is missing",
                  },
                ]}
              >
                <SizeInput />
              </Form.Item>
              <Form.Item
                name="inStock"
                label="Unit in stock"
                rules={[
                  { required: true, message: "Number of product is missing" },
                ]}
              >
                <InputNumber style={{ width: "100%" }} min={1} max={100000} />
              </Form.Item>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Please input price" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/(\$)\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
            <Col span={8} offset={4}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please upload an image!",
                    type: "array",
                  },
                ]}
                name="upload"
                label="Pictures"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="File type accepted *svg/png/ipg"
              >
                <Upload
                  name="logo"
                  maxCount={1}
                  action="/"
                  listType="picture-card"
                  showUploadList={{ showPreviewIcon: false }}
                >
                  <PlusOutlined />
                  <div> Upload</div>
                </Upload>
              </Form.Item>
              <Button
                type="primary"
                className="mt-6"
                size="large"
                htmlType="submit"
                loading={loading}
              >
                Create product
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default CreateProduct;
