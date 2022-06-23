/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable default-case */
import { CaretRightOutlined } from "@ant-design/icons";
import { Badge, Button, Input, Popover, Skeleton, Space, Table } from "antd";
import { ENP_ORDER } from "api/EndPoint";
import CustomBreadcrumb from "components/shared/CustomBreadcrumb";
import useDebounce from "hooks/useDebounce";
import { axios } from "lib/axios/Interceptor";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrder, selectOrder, updateOrderStatus } from "store/orderSlice";
import { filterCustomerName } from "utils/filterCustomerName";
import { generateStatusID } from "utils/generateStatusId";
import "./Order.scss";

const Order = () => {
  const badgeStatus = [
    <Badge color="#c9ccc4" text="Create" />,
    <Badge color="yellow" text="Confirmed" />,
    <Badge color="green" text="Accepted" />,
    <Badge color="red" text="Cancelled" />,
    <Badge color="blue" text="Delivered" />,
  ];

  const originOrder = useSelector(selectOrder);
  const [orderList, setOrderList] = useState();
  const [cancelReason, setCancelReason] = useState("");
  const dispatch = useDispatch();

  const onSearch = (value) => {
    console.log(value);
    const filteredData = filterCustomerName(value, originOrder);
    setOrderList(filteredData);
  };

  const onClear = (value) => {
    if (value === "") {
      onSearch(value);
    }
  };

  useEffect(() => {
    if (!orderList || orderList.length === 0) {
      dispatch(getAllOrder()).then(() => {
        setOrderList(originOrder);
      });
    } else setOrderList(originOrder);
  }, []);

  const onClickAccepted = (id) => {
    axios.put(ENP_ORDER + `${id}/changestatus/Accepted`).then(() => {
      dispatch(updateOrderStatus({ id, status: "Accepted" }));
    });
  };

  const onClickDelivered = (id) => {
    axios.put(ENP_ORDER + `${id}/changestatus/Delivered`).then(() => {
      dispatch(updateOrderStatus({ id, status: "Delivered" }));
    });
  };

  const onClickCancel = async (id, cancelReason) => {
    await axios.put(ENP_ORDER + `/${id}/cancel`, { cancelReason }).then(() => {
      dispatch(
        updateOrderStatus({ id, status: "Cancelled", note: cancelReason })
      );
    });
  };

  const columnsOrder = [
    {
      title: "ORDER NO.",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (statusOrder) => {
        // Create order -> Confirm payment method -> Accepted/Cancelled -> Delivered
        const id = generateStatusID(statusOrder);
        return badgeStatus[id];
      },
    },
    {
      title: "NAME",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
      width: "40%",
    },
    {
      title: "",
      key: "action",
      render: (text, record, index) => {
        const statusId = generateStatusID(record.status);
        return (
          <Space size="middle">
            {statusId === 1 ? (
              <a onClick={() => onClickAccepted(record._id)}>Accept</a>
            ) : null}
            {statusId === 2 ? (
              <a onClick={() => onClickDelivered(record._id)}>Delivered</a>
            ) : null}
            {statusId === 1 || statusId === 2 ? (
              <Popover
                key={Math.floor(Math.random())}
                title="Cancel reason"
                content={
                  <div>
                    <Input.Group compact>
                      <Input
                        onChange={(e) => setCancelReason(e.target.value)}
                      />
                    </Input.Group>
                    <div className="mt-2">
                      <Button
                        onClick={() => onClickCancel(record._id, cancelReason)}
                      >
                        OK
                      </Button>
                    </div>
                  </div>
                }
                trigger="click"
              >
                <a>Cancel</a>
              </Popover>
            ) : null}
          </Space>
        );
      },
    },
    // Open order detail in new tab
    {
      title: "",
      key: "orderDetail",
      render: (text, record) => {
        // Substring for remove #(anchor) in id
        return (
          <Link to={`/order/${record._id}`} state={record}>
            <CaretRightOutlined style={{ color: "black" }} />
          </Link>
        );
      },
    },
  ];

  return (
    <div className="order">
      <div className="bg-white p-9 pl-6 pt-6">
        <CustomBreadcrumb />
        <div className="pt-6">
          <h2>Order</h2>
        </div>
      </div>
      <div className=" mt-6 mb-4 m-auto w-1/2">
        <Input.Search
          onChange={(e) => onClear(e.target.value)}
          onSearch={onSearch}
          placeholder="Customer name"
          enterButton="Search"
          size="large"
        ></Input.Search>
      </div>
      {orderList ? (
        <Table
          className="tb__order"
          dataSource={orderList}
          columns={columnsOrder}
        />
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default Order;
