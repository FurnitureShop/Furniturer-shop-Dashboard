/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import { Badge, Col, Row, Skeleton, Steps } from "antd";
import { ENP_GET_PRODUCT_BY_LIST_ID } from "api/EndPoint";
import ProductTable from "components/Products/ProductTable";
import CustomBreadcrumb from "components/shared/CustomBreadcrumb";
import { axios } from "lib/axios/Interceptor";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { ORDER_DETAIL, ORDER_MANAGEMENT } from "routes/route.config";
import FormatProduct from "utils/formatProduct";
import { generateStatusID } from "utils/generateStatusId";

const OrderDetail = () => {
  const location = useLocation();

  const customerData = location.state;
  const [productsData, setProductsData] = useState();
  // const productsData = location.state.orderItemDTOList;

  console.log(customerData);

  let { orderId } = useParams();

  const pages = [
    { url: "#", title: "Home" },
    { url: ORDER_MANAGEMENT, title: "Order" },
    { url: ORDER_DETAIL, title: `#${orderId}` },
  ];

  const badgeStatus = [
    <Badge color="#c9ccc4" text="CREATE" />,
    <Badge color="yellow" text="CONFIRMED" />,
    <Badge color="green" text="ACCEPTED" />,
    <Badge color="red" text="CANCELLED" />,
    <Badge color="blue" text="DELIVERED" />,
  ];
  let statusId = generateStatusID(customerData.status);

  useEffect(() => {
    const listID = [];
    if (!customerData) return;

    for (let index = 0; index < customerData.products.length; index++) {
      listID.push(customerData.products[index].product);
    }
    axios
      .post(ENP_GET_PRODUCT_BY_LIST_ID, { listID: listID })
      .then((response) => {
        for (let index = 0; index < response.data.products.length; index++) {
          response.data.products[index].quantity =
            customerData.products[index].quantity;
        }
        setProductsData(response.data.products);
      });
  }, []);

  return (
    <div>
      <div className="bg-white p-9 pl-6 pt-4">
        <CustomBreadcrumb pages={pages} />
      </div>

      <div className="bg-white p-9 pt-0 pl-6">
        <Row>
          <Col>
            <h1 className="text-3xl mb-10">Order number: #{orderId}</h1>
          </Col>
        </Row>
        <Row>
          <Col span={14}>
            <Row>
              <Col>
                <p>Customer: {customerData.customerName}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>
                  Order time:{" "}
                  {new Date(customerData.createAt).toLocaleDateString("en-GB")}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Cancel reason: {customerData.note}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Address: {customerData.address}</p>
              </Col>
            </Row>
          </Col>
          <Col span={6} offset={4}>
            <Row className="text-slate-400">
              <Col span={12}>
                <p>Status</p>
              </Col>
              <Col span={12}>
                <p>Totals</p>
              </Col>
            </Row>
            <Row className="text-2xl">
              <Col span={12}>{badgeStatus[statusId]}</Col>
              <Col span={12}>
                <p>${customerData.totalPrice}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="bg-white m-6 p-9 pt-6 pl-6">
        <div className="border-0 border-b border-solid border-slate-200">
          <h1>Process progress</h1>
        </div>
        <div className="pt-9">
          {/* Step 0: Create order
            Step 1: Confirm payment method
            Step 2: Accepted / Cancelled
            Step 3: Delivered 
            So Step Cancelled and Delivered = it status id -1 (Id Canncelled=3, Delivered = 4*/}
          <Steps progressDot current={statusId < 2 ? statusId : statusId - 1}>
            <Steps.Step title="Create order" />
            <Steps.Step title="Confirm payment method" />
            <Steps.Step
              title={
                statusId < 2
                  ? "Processing"
                  : statusId === 2
                  ? "Accepted"
                  : "Cancelled"
              }
            />
            <Steps.Step title="Delivered" />
          </Steps>
        </div>
      </div>
      <div className="bg-white m-6 p-9 pt-6 pl-6">
        <div className="border-0 border-b border-solid border-slate-200">
          <h1>Products</h1>
        </div>
        <div className="pt-6">
          {productsData ? (
            <ProductTable source={productsData.map(FormatProduct)} />
          ) : (
            <Skeleton />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
