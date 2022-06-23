import React from "react";

import { Table } from "antd"

import "./ProductTable.scss"
import { columnsProduct } from "./ProductTableCol";



export default function ProductTable(props) {

    return (
        <Table
            className="tb__product"
            dataSource={props.source}
            columns={columnsProduct}
            pagination={{ position: ["none", "none"] }}
            size="small"
        />
    )
}