import React from "react";
import { Form, Input, Modal } from "antd";
import { axios } from "lib/axios/Interceptor";
import { ENP_CATEGORY } from "api/EndPoint";
import { useDispatch } from "react-redux";
import { categoryUpdated } from "store/categorySlice";

const EditCategoryModal = ({ visible, handleClose, initialValues }) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const onFinish = (value) => {
    axios
      .put(ENP_CATEGORY + initialValues._id, { description: value.description })
      .then(() => {
        dispatch(
          categoryUpdated({
            id: value.name,
            changes: { description: value.description },
          })
        );
        handleClose();
      });
  };

  return (
    <Modal
      title="Edit category"
      visible={visible}
      onOk={() => form.submit()}
      onCancel={() => handleClose()}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Form.Item name="name" label="Name">
          <Input disabled />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCategoryModal;
