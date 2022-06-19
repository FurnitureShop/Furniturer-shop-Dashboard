import { Card, Row, Col, Statistic, Radio, DatePicker } from 'antd'
import ColumnSale from 'components/Statistic/ColumnSale';
import moment from 'moment';
import React, { useState } from 'react'

const MainDashboard = () => {
    const { RangePicker } = DatePicker;
    const [fromDate, setFromDate] = useState(moment());
    const [toDate, setToDate] = useState(moment());

    const handleClickThisYear = () => {
        setFromDate(moment().startOf("year"));
        setToDate(moment().endOf("year"));
    };
    const handleClickThisMonth = () => {
        setFromDate(moment().startOf("month"));
        setToDate(moment().endOf("month"));
    };
    const handleClickThisWeek = () => {
        setFromDate(moment().startOf("week"));
        setToDate(moment().endOf("week"));
    };
    const handleClickToday = () => {
        setFromDate(moment());
        setToDate(moment());
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

    const data = [
        {
          type: "Tỳ hưu đá thạch anh tím",
          value: Math.floor(Math.random() * 100),
        },
        {
          type: "Hồ ly đá Ruby",
          value: Math.floor(Math.random() * 100),
        },
        {
          type: "Tỳ hưu đá thạch anh trắng",
          value: Math.floor(Math.random() * 100),
        },
        {
          type: "Hồ ly thạch anh đen",
          value: Math.floor(Math.random() * 100),
        },
        {
          type: "Hồ ly đá Aquamarin",
          value: Math.floor(Math.random() * 100),
        },
        {
          type: "Hồ ly thạch anh tóc thương",
          value: Math.floor(Math.random() * 100),
        },
        {
          type: "Tỳ hưu đá mắt hổ",
          value: Math.floor(Math.random() * 100),
        },
        {
          type: "Thiềm thừ đá thạch anh trắng",
          value: Math.floor(Math.random() * 100),
        },
        {
          type: "Hồ ly đá mắt hổ",
          value: Math.floor(Math.random() * 100),
        },
      ];

    return (
        <div className='dashboard'>
            <Row gutter={16} className="mb-4">
                <Col span={8}>
                    <Card bordered={false}>
                        <Statistic title="Total sales" prefix="VND" value={126560} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false}>
                        <Statistic title="Traffic " value={8846} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false}>
                        <Statistic title="The number of payments " value={6560} />
                    </Card>
                </Col>
            </Row>
            <Row className='mb-4'>
                <Col span={24}>
                    <Card
                        bordered={false}
                        title="Sales"
                        extra={
                            <Row gutter={16}>
                                <Radio.Group
                                    defaultValue={"Today"}
                                    onChange={handleOnChangeOptionDate}>
                                    <Radio.Button value="Today">Today</Radio.Button>
                                    <Radio.Button value="This week">This week</Radio.Button>
                                    <Radio.Button value="This month">This month</Radio.Button>
                                    <Radio.Button value="This year">This year</Radio.Button>
                                </Radio.Group>
                                <Col>
                                    <RangePicker
                                        defaultValue={[]}
                                        value={[fromDate, toDate]}
                                        format={"DD/MM/YYYY"}
                                    />
                                </Col>
                            </Row>
                        }>
                        <ColumnSale data={data}/>
                    </Card>
                </Col>
            </Row>
            <Row className='mb-4'>
                <Col span={24}>
                    <Card bordered={false} title="Sales category share">
                        
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default MainDashboard