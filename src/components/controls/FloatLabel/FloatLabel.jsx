import React, { useState } from "react";

import "./FloatLabel.scss";

const FloatLabel = props => {
  const [focus, setFocus] = useState(false);
  const { children, label, value, disabled, customClassName } = props;

  let labelClass =
    focus || (value && value.length !== 0) ? "label-default label-float" : "label-default";
  labelClass = disabled ? labelClass + " label-disabled" : labelClass;
  return (
    <div
      className={`float-label ${customClassName ? customClassName : ""}`}
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      {children}
      <label className={labelClass}>{label}</label>
    </div>
  );
};

export default FloatLabel;