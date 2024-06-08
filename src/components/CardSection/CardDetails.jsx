import React from "react";
import ColoredContainer from "../Structure/ColoredContainer";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { LangContext } from "../context/ThemeProvider";
import GradientBG from "../Structure/GradientBG";
import GlassmorphismContainer from "../Structure/GlassmorphismContainer";

export default function CardDetails({ textDone, textNotDone }) {
  const { langMode } = React.useContext(LangContext);

  return (
    <GradientBG className="rounded-md">
      <div className=" backdrop-blur-md bg-opacity-20 dark:bg-opacity-20 p-1 bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-md flex flex-col sm:flex-row space-x-0 sm:space-x-2 space-y-2 sm:space-y-0">
        <CardUl
          textArray={textDone}
          title={langMode === "fr" ? "Acquis" : "Acquired"}
          icon={<FaCheck className=" text-green-500" />}
        />
        <CardUl
          textArray={textNotDone}
          title={langMode === "fr" ? "Erreurs" : "Mistakes"}
          icon={<ImCross className=" text-red-500" />}
        />
      </div>
    </GradientBG>
  );
}

function CardUl({ textArray, title, icon }) {
  const { langMode } = React.useContext(LangContext);
  return (
    <GlassmorphismContainer className="w-full sm:w-1/2">
      <h3 className="backdrop-blur-md bg-opacity-20 dark:bg-opacity-20 p-1 bg-gray-100 dark:bg-gray-900 font-title text-2xl text-center">
        {title}
      </h3>
      <ul className="p-2">
        {textArray.map((text, index) => (
          <CardLi
            key={index}
            text={langMode === "fr" ? text.fr : text.en}
            icon={icon}
          />
        ))}
      </ul>
    </GlassmorphismContainer>
  );
}

function CardLi({ text, icon }) {
  return (
    <li className="flex flex-row space-x-2 items-center ">
      {icon}
      <p>{text}</p>
    </li>
  );
}
