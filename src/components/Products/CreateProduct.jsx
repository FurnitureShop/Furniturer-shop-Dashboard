import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, InputNumber, Row, Upload } from 'antd';
import CustomBreadcrumb from 'components/shared/CustomBreadcrumb'
import { useForm } from 'rc-field-form';
import Input from 'rc-input';
import Select from 'rc-select';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

const CreateProduct = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const [loading, setloading] = useState(false);
    const [form] = useForm();
    const navigate = useNavigate();

    return (
        <div>
            <div className="bg-white p-9 pl-6 pt-4">
                <CustomBreadcrumb />
                <div className="pt-4">
                    <h2>New product</h2>
                </div>
            </div>

            <div className="bg-white p-9 pt-6 pl-6">
                <Form
                    form={form}
                    layout="vertical"
                    name="nest-messages"
                //   onFinish={onFinish}
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
                                name="kindId"
                                label="Category"
                                initialValue={location.state?.categoryId}
                                rules={[
                                    { required: true, message: "Please select a category" },
                                ]}
                            >
                                <Select placeholder="Uncategorized">
                                    {/* {categories.map(({ id, name }) => (
                    <Select.Option value={id} key={id}>
                      {name}
                    </Select.Option>
                  ))} */}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="quantity"
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
                                        `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    }
                                    parser={(value) => value.replace(/(VND)\s?|(,*)/g, "")}
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
                                // getValueFromEvent={normFile}
                                extra="File type accepted *svg/png/ipg"
                            >
                                <Upload
                                    listType="picture-card"
                                    showUploadList={true}
                                    // onPreview={this.handlePreview}
                                    //   onChange={handleChange}
                                    // customRequest={this.handleUpload}
                                    action="http://128.199.254.45:3040/upload"
                                    //   beforeUpload={validate}
                                    multiple={true}
                                >
                                    <div>
                                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div
                                            style={{
                                                marginTop: 8,
                                            }}
                                        >
                                            Upload
                                        </div>
                                    </div>
                                </Upload>
                            </Form.Item>
                            <Button
                                type="primary"
                                className="mt-6"
                                size="large"
                                onClick={() => form.submit()}
                                loading={loading}
                            >
                                Create product
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default CreateProduct