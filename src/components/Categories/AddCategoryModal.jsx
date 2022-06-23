import { Modal, Form, Input } from "antd";
import { ENP_CATEGORY } from "api/EndPoint";
import { axios } from "lib/axios/Interceptor";
import React from "react";
import { useDispatch } from "react-redux";
import { categoryAdded } from "store/categorySlice";

const AddCategoryModal = ({ visible, handleClose }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (value) => {
    axios.post(ENP_CATEGORY, { ...value }).then((response) => {
      dispatch(
        categoryAdded({ ...value, _id: response.data.newCategorySave._id })
      );
      handleClose();
    });
  };

  return (
    <Modal
      title="Add category"
      visible={visible}
      onOk={() => form.submit()}
      onCancel={() => handleClose()}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea placeholder="Optional" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;
