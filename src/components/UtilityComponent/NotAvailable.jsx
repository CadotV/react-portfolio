import { CgUnavailable } from "react-icons/cg";
import Tooltips from "./Tooltips";
import React from "react";
import { LangContext } from "../context/ThemeProvider";
export default function NotAvailable({ children }) {
  const { langMode } = React.useContext(LangContext);
  return (
    <div className="h-full relative">
      <div
        className="absolute inset-0 flex justify-center isolate z-10 bg-red-300 rounded-md backdrop-blur-md opacity-25 dark:opacity-25"
        data-tooltip-id={`tooltip-notavailable`}
      >
        <CgUnavailable className="h-full w-full text-red-500" />
      </div>
      <Tooltips
        id={"tooltip-notavailable"}
        value={langMode === "fr" ? "Pas encore disponible" : "Not available"}
      />
      {children}
    </div>
  );
}
