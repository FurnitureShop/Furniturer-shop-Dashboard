import React from 'react'
import { Form, Input, Modal } from "antd";

const EditCategoryModal = ({ visible, handleClose, initialValues }) => {
    const [form] = Form.useForm()

    return (
        <Modal
            title="Edit category"
            visible={visible}
            onOk={(_) => form.submit()}
            onCancel={(_) => handleClose()}
        >
            <Form
                layout="vertical"
                form={form}
                initialValues={initialValues}
            >
                <Form.Item name="name" label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditCategoryModal