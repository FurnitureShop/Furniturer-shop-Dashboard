import { Modal, Form, Input } from 'antd'
import React from 'react'

const AddCategoryModal = ({ visible, handleClose }) => {
    const [form] = Form.useForm()

    return (
        <Modal
            title="Add category"
            visible={visible}
            onOk={() => form.submit()}
            onCancel={() => handleClose()}
        >
            <Form layout="vertical" form={form}>
                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                    <Input placeholder="Xuan Ha collection" />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea placeholder="Optional" />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddCategoryModal