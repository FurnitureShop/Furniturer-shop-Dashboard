/* eslint-disable default-case */
import { CaretRightOutlined } from "@ant-design/icons";
import { Button, Input, Popover, Skeleton, Space, Table } from "antd";
import { ENP_GET_ALL_USER } from "api/EndPoint";
import CustomBreadcrumb from "components/shared/CustomBreadcrumb";
import useDebounce from "hooks/useDebounce";
import { axios } from "lib/axios/Interceptor";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { filterCustomerName } from "utils/filterCustomerName";

const Customers = () => {
  const [originData, setOriginData] = useState();
  const [customerList, setCustomerList] = useState();

  const onSearch = (value) => {
    const filteredData = filterCustomerName(value, "name", originData);
    setCustomerList(filteredData);
  };

  const onClear = (value) => {
    if (value === "") {
      onSearch(value);
    }
  };

  useEffect(() => {
    axios.get(ENP_GET_ALL_USER).then((response) => {
      setOriginData(response.data.users);
      setCustomerList(response.data.users);
    });
  }, []);

  const columnsCustomer = [
    {
      title: "CUSTOMER NO.",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "PHONE NUMBER",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
      width: "40%",
      render: (text, record, index) => {
        return record.address.map((value) => {
          return (
            <p
              key={Math.random()}
            >{`${value.landNumber}, ${value.ward}, ${value.district}, ${value.province}`}</p>
          );
        });
      },
    },
  ];

  return (
    <div className="order">
      <div className="bg-white px-9 py-6">
        <CustomBreadcrumb />
        <div className="pt-3">
          <h2 className="text-2xl font-semibold mb-0">Customers</h2>
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
      {customerList ? (
        <Table
          className="tb__customer"
          dataSource={customerList}
          columns={columnsCustomer}
        />
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default Customers;
