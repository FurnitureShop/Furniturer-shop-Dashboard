import { Table } from 'antd';
import React from 'react'
import { columnsProduct } from './ProductTableCol';

export const StorageContext = React.createContext();

const ProductTable = (props) => {
    return (
        <StorageContext.Provider value={100}>
            <Table
                style={{
                    display: "flex",
                    paddingLeft: "2em",
                    fontSize: "1em",
                    marginBottom: "0.1em",
                }}
                dataSource={props.source}
                columns={columnsProduct}
                pagination={{ position: ["none", "none"] }}
                size="small"
            />
        </StorageContext.Provider>
    )
}

export default ProductTable