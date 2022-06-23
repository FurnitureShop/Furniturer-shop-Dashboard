/* eslint-disable default-case */
import { CaretRightOutlined } from '@ant-design/icons';
import { Badge, Button, Input, Popover, Space, Table } from 'antd';
import CustomBreadcrumb from 'components/shared/CustomBreadcrumb';
import useDebounce from 'hooks/useDebounce';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./Order.scss"

const Order = () => {
    const [orderList, setOrderList] = useState();
    const [cancelReason, setCancelReason] = useState("");

    const onSearch = (e) => {
        const searchTerm = e.target.value;
        // TODO: api call and filter items
    };

    const columnsOrder = [
        {
            title: "ORDER NO.",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "STATUS",
            dataIndex: "orderStatus",
            key: "orderStatus",
            render: (statusOrder) => {
                switch (statusOrder) {
                    case "Cancel":
                        return <Badge color="red" text="Cancel" />;
                    case "Pending":
                        return <Badge color="yellow" text="Pending" />;
                    case "Confirmed":
                        return <Badge color="green" text="Confirmed" />;
                    case "Delivering":
                        return <Badge color="yellow" text="Delivering" />;
                    case "Success":
                        return <Badge color="green" text="Success" />;
                }
            },
        },
        {
            title: "EMAIL",
            dataIndex: "customerEmail",
            key: "customerEmail",
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
            render: (text, record) => {
                return (
                    <Space size="middle">
                        {/* <a onClick={() => onClickConfirmed(record.id)}>Confirmed</a>
                <a onClick={() => onClickDelivering(record.id)}>Delivering</a>
                <a onClick={() => onClickSuccess(record.id)}>Success</a> */}
                        <Popover
                            title="Cancel reason"
                            content={
                                <div>
                                    <Input.Group compact>
                                        <Input onChange={(e) => setCancelReason(e.target.value)} />
                                    </Input.Group>
                                    <div className="mt-2">
                                        <Button
                                        //   onClick={() => onClickCancel(record.id, cancelReason)}
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
                    <Link to={`/order/${record.id}`} state={record}>
                        <CaretRightOutlined style={{ color: "black" }} />
                    </Link>
                );
            },
        },
    ];

    return (
        <div className='order'>
            <div className="bg-white p-9 pl-6 pt-6">
                <CustomBreadcrumb />
                <div className="pt-6">
                    <h2>Order</h2>
                </div>
            </div>
            <div className=" mt-6 mb-4 m-auto w-1/2">
                <Input.Search
                    onChange={useDebounce(onSearch)}
                    placeholder="Customer name"
                    enterButton="Search"
                    size="large"
                ></Input.Search>
            </div>
            <Table
                className="tb__order"
                dataSource={orderList}
                columns={columnsOrder}
            />
        </div>
    )
}

export default Order