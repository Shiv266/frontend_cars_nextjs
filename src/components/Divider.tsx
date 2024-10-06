import React, { FC } from "react";

interface DividerProps {
  width?: string;
  height?: string;
  color?: string;
}

const Divider: FC<DividerProps> = ({
  width = "100%",
  height = "1px",
  color = "#ccc",
}) => {
  return (
    // Todo : hr tag is creating styling issue that's why used div
    <div
      style={{
        width,
        height,
        backgroundColor: color,
      }}
      aria-hidden="true"
    />
  );
};

export default Divider;
