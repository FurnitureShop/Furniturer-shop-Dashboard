import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, InputNumber, Row, Select, Upload } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import CustomBreadcrumb from 'components/shared/CustomBreadcrumb'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';

const EditProduct = () => {
    const { productName } = useParams();
    const [detail, setDetail] = useState();
    const [images, setImages] = useState();
    const [loading, setloading] = useState(false);
    const [form] = useForm();
    const navigate = useNavigate();
    const location = useLocation();

    // const product = useSelector((s) => getProductById(s, productName));

    return (
        <div>
            <div className='bg-white p-9 pl-6 pt-4'>
                <CustomBreadcrumb />
                <div className="pt-4">
                    {/* <h2>{product?.name}</h2> */}
                </div>
            </div>

            <div className="bg-white p-9 pt-6 pl-6">
                {detail && images ? (
                    <Form
                        form={form}
                        initialValues={{
                            upload: images || [],
                            name: detail.name,
                            description: detail.description,
                            kindId: detail.kindId,
                            price: detail.price,
                        }}
                        layout="vertical"
                        name="nest-messages"
                        // onFinish={onFinish}
                    >
                        <Row>
                            <Col span={8}>
                                <Form.Item name="name" label="Name">
                                    <Input disabled={true} />
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
                                    // initialValue={product?.kindId}
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
                                        // onChange={handleChange}
                                        action="http://128.199.254.45:3040/upload"
                                        // beforeUpload={validate}
                                        multiple={true}
                                        // onRemove={onRemoveimg}
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
                                    loading={loading}
                                    onClick={() => form.submit()}
                                >
                                    Apply change
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                ) : (
                    " Loading..."
                )}
            </div>
        </div>
    )
}

export default EditProduct