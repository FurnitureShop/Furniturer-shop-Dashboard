import React, { useContext } from "react";

import { StorageContext } from "./ProductTable";

export const columnsProduct = [
  {
    title: "Product",
    dataIndex: "info",
    key: "info",
    render: (info) => {
      return (
        <div className="flex info__product">
          <img src={info.imageUrl} className="w-20 h-20" />
          <div>
            <p className="font-semibold">{info.name}</p>
            <p>{info.color}</p>
            <p>{info.size}</p>
          </div>
        </div>
      );
    },
  },
  {
    title: "Quantity",
    dataIndex: "amount",
    key: "amount",
    render: (amount) => {
      return (
        <div className="flex">
          {/* //The pillar to make the text center vertical */}
          <div className="h-20" />
          <div className="leading-20 ">
            <span className="">{amount.quantity}</span>
            <span style={{ color: "#bfbfbf" }}>/{amount.inStock}</span>
          </div>
        </div>
      );
    },
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price) => {
      return (
        <div className="flex">
          {/* //The pillar to make the text center vertical */}
          <div className="h-20" />
          <div className="leading-20 ">
            <span className="">{`$${price}`}</span>
          </div>
        </div>
      );
    },
  },
];
