/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Row, Col, Statistic, Radio, DatePicker, Skeleton } from "antd";
import { ENP_GET_PRODUCT } from "api/EndPoint";
import ColumnSale from "components/Statistic/ColumnSale";
import DonutSaleCategory from "components/Statistic/DonutSaleCategory";
import { axios } from "lib/axios/Interceptor";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPaidOrder,
  selectNumberOfOrder,
  selectPaidOrder,
  selectTotalPrice,
} from "store/orderSlice";
import { filterDateObject } from "utils/FilterDate";

const MainDashboard = () => {
  const { RangePicker } = DatePicker;
  const [dateRange, setDateRange] = useState([
    moment().startOf("day"),
    moment().endOf("day"),
  ]);

  const totalPrice = useSelector(selectTotalPrice);
  const totalOrder = useSelector(selectNumberOfOrder);
  const originData = useSelector(selectPaidOrder);

  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const handleClickThisYear = () => {
    setDateRange([moment().startOf("year"), moment().endOf("year")]);
  };
  const handleClickThisMonth = () => {
    setDateRange([moment().startOf("month"), moment().endOf("month")]);
  };
  const handleClickThisWeek = () => {
    setDateRange([moment().startOf("week"), moment().endOf("week")]);
  };
  const handleClickToday = () => {
    setDateRange([moment().startOf("day"), moment().endOf("day")]);
  };
  const onDatePickerChange = (dates) => {
    setDateRange([dates[0], dates[1]]);
  };

  const handleOnChangeOptionDate = (e) => {
    let value = e.target.value;
    switch (value) {
      case "Today":
        handleClickToday();
        break;
      case "This week":
        handleClickThisWeek();
        break;
      case "This month":
        handleClickThisMonth();
        break;
      case "This year":
        handleClickThisYear();
        break;
      default:
        handleClickToday();
    }
  };

  const matchProductIdWithName = async (arrProduct) => {
    const promises = [];
    arrProduct.forEach((product, index) => {
      promises.push(
        axios
          .get(
            process.env.REACT_APP_BACKEND_URL + ENP_GET_PRODUCT + product.type
          )
          .then((response) => {
            product.type = response.data.product.name;
          })
      );
    });
    Promise.all(promises).then(() => {
      setData(arrProduct);
    });
  };

  const filterData = () => {
    matchProductIdWithName(
      filterDateObject(dateRange[0], dateRange[1], originData)
    );
  };

  useEffect(() => {
    if (!originData || originData.length === 0)
      dispatch(getAllPaidOrder()).then(() => {
        filterData();
      });
    else filterData();
  }, []);

  useEffect(() => {
    if (originData) filterData();
  }, [dateRange]);

  return (
    <div className="dashboard">
      <Row gutter={16} className="mb-4">
        <Col span={8}>
          <Card bordered={false}>
            <Statistic title="Total sales" prefix="USD" value={totalPrice} />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic title="Traffic " value={8846} />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic title="The number of payments " value={totalOrder} />
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col span={24}>
          <Card
            bordered={false}
            title="Sales"
            extra={
              <Row gutter={16}>
                <Radio.Group
                  defaultValue={"Today"}
                  onChange={handleOnChangeOptionDate}
                >
                  <Radio.Button value="Today">Today</Radio.Button>
                  <Radio.Button value="This week">This week</Radio.Button>
                  <Radio.Button value="This month">This month</Radio.Button>
                  <Radio.Button value="This year">This year</Radio.Button>
                </Radio.Group>
                <Col>
                  <RangePicker
                    defaultValue={[dateRange[0], dateRange[1]]}
                    value={[dateRange[0], dateRange[1]]}
                    format={"DD/MM/YYYY"}
                    onChange={onDatePickerChange}
                  />
                </Col>
              </Row>
            }
          >
            {data ? <ColumnSale data={data} /> : <Skeleton />}
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col span={24}>
          <Card bordered={false} title="Sales category share">
            {data ? <DonutSaleCategory data={data} /> : <Skeleton />}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MainDashboard;
