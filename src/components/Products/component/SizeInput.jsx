import { Input, Select } from "antd";
import { useState } from "react";

export function SizeInput({ value = {}, onChange }) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [depth, setDepth] = useState(0);
  const [unit, setUnit] = useState("m");

  const triggerChange = (changedValue) => {
    onChange?.({
      width,
      height,
      depth,
      unit,
      ...value,
      ...changedValue,
    });
  };

  const onWidthChange = (e) => {
    const newNumber = parseInt(e.target.value || "0", 10);

    if (Number.isNaN(width)) {
      return;
    }

    if (!("width" in value)) {
      setWidth(newNumber);
    }

    triggerChange({
      width: newNumber,
    });
  };

  const onHeightChange = (e) => {
    const newNumber = parseInt(e.target.value || "0", 10);

    if (Number.isNaN(height)) {
      return;
    }

    if (!("height" in value)) {
      setHeight(newNumber);
    }

    triggerChange({
      height: newNumber,
    });
  };

  const onDepthChange = (e) => {
    const newNumber = parseInt(e.target.value || "0", 10);

    if (Number.isNaN(depth)) {
      return;
    }

    if (!("depth" in value)) {
      setDepth(newNumber);
    }

    triggerChange({
      depth: newNumber,
    });
  };

  const onUnitChange = (newUnit) => {
    if (!("unit" in value)) {
      setUnit(newUnit);
    }

    triggerChange({
      unit: newUnit,
    });
  };

  return (
    <span>
      <Input
        type="number"
        value={value.width || width}
        onChange={onWidthChange}
        style={{
          width: 80,
        }}
      />
      {" x "}
      <Input
        type="number"
        value={value.height || height}
        onChange={onHeightChange}
        style={{
          width: 80,
        }}
      />
      {" x "}
      <Input
        type="number"
        value={value.depth || depth}
        onChange={onDepthChange}
        style={{
          width: 80,
        }}
      />
      <Select
        value={value.unit || unit}
        style={{
          width: 80,
          margin: "0 8px",
        }}
        onChange={onUnitChange}
      >
        <Select.Option value="m">m</Select.Option>
      </Select>
    </span>
  );
}
