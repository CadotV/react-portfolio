import React from "react";
import { LangContext } from "../context/ThemeProvider";
import GlassmorphismContainer from "../Structure/GlassmorphismContainer";
import { useSpring, animated, config } from "@react-spring/web";
import { RadioGroup, Switch } from "@headlessui/react";

const langs = ["fr", "en"];

export function LangSelector() {
  const { langMode, setLangMode } = React.useContext(LangContext);

  return (
    <GlassmorphismContainer>
      <RadioGroup
        value={langMode}
        onChange={setLangMode}
        className="flex flex-row pl-4 items-center text-gray-900 dark:text-gray-100 relative"
      >
        <RadioGroup.Label className="flex self-center">
          <span className="material-symbols-outlined">translate</span>
        </RadioGroup.Label>
        <div className="flex flex-row p-4 space-x-4">
          {langs.map((lang, index) => (
            <RadioOption key={index} value={lang} />
          ))}
        </div>
      </RadioGroup>
    </GlassmorphismContainer>
  );
}

function RadioOption({ value }) {
  return (
    <RadioGroup.Option
      value={value}
      className="cursor-pointer uppercase font-bold"
    >
      {({ checked }) => (
        <span
          className={`${
            checked ? "bg-gray-100 dark:bg-gray-900" : ""
          } p-2 rounded-md transition ease-in-out duration-250`}
        >
          {value}
        </span>
      )}
    </RadioGroup.Option>
  );
}
