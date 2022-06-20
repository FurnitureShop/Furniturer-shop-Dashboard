import { Column } from "@ant-design/plots"
import React from 'react'


//Ant Design being bug!!!!
const ColumnSale = ({ data }) => {
    //this is how you suppose to config the chart
    const configColumn = {
        data,
        xField: "type",
        yField: "value"
    }

    return (
        <Column
            {...configColumn}
        />
    )
}

export default ColumnSale