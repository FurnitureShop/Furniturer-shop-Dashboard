import CustomBreadcrumb from 'components/shared/CustomBreadcrumb'
import React from 'react'
import { Col, Row, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import EditableContainer from "components/shared/EditableText";
import { AddProduct } from 'components/Products/Products';
import { CATEGORY_MANAGEMENT } from 'routes/route.config';
import { useParams } from 'react-router';


const Category = () => {
    const { categoryName } = useParams()

    return (
        <div>
            <div className='bg-white p-9 pl-6 pt-4'>
                <CustomBreadcrumb />
                <div className="pt-4 flex">
                    <div className="relative mr-2 p-2">
                        <img
                            //gotta put a src of img here
                            src
                            alt="fail"
                            className="rounded-full"
                            width={100}
                        ></img>
                        <div className="absolute transition-all duration-300 hover:opacity-60 bg-black h-full w-full left-0 top-0 opacity-0 text-white text-center">
                            <label
                                id="getFileLabel"
                                htmlFor="getFile"
                                className="w-full h-full flex items-center justify-center cursor-pointer"
                            >
                                <EditOutlined /> change
                            </label>
                            <input type="file" className="hidden" id="getFile" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <Tooltip title="Click to start editing" placement="rightTop">
                            <span>
                                <EditableContainer>
                                    <EditableContainer.Header
                                        //gotta put a name here
                                        value
                                    />
                                </EditableContainer>
                            </span>
                        </Tooltip>
                        <Tooltip title="Click to start editing" placement="rightTop">
                            <span>
                                <EditableContainer>
                                    <EditableContainer.Text value="" />
                                </EditableContainer>
                            </span>
                        </Tooltip>
                        <p className="opacity-80 text-gray-800 text-base">
                            Sold: 240 items
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <h3 className='text-center mt-5'>In this category</h3>

                <div className='mt-2'>
                    <Row gutter={[8,8]}>
                        <Col className='gutter-row' span={6}>
                            <AddProduct
                                path={`${CATEGORY_MANAGEMENT}/${"productnamegoeshere"}/new-product`}
                                state={{categoryId: 1}}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default Category