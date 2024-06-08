import React from "react";
import { Tooltip } from "react-tooltip";
import { ThemeContext } from "../context/ThemeProvider";

export default function Tooltips({ value, id = "" }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { colorMode } = React.useContext(ThemeContext);

  return (
    <span className="z-50">
      <Tooltip
        id={id}
        content={value}
        style={{
          zIndex: 100,
          backgroundColor: colorMode === "light" ? "white" : "black",
          color: colorMode === "light" ? "black" : "white",
          fontWeight: 700,
          fontSize: "16px",
        }}
        className="font-bold"
      />
    </span>
  );
}
