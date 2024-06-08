import React from "react";
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { LangContext, ThemeContext } from "../context/ThemeProvider";
import { useSpring, config, animated } from "@react-spring/web";
import styled from "styled-components";

export default function CustomSandpack({ files }) {
  const { colorMode } = React.useContext(ThemeContext);
  const { langMode } = React.useContext(LangContext);
  const [expand, setExpand] = React.useState(false);

  const keys = Object.keys(files);
  const entryKey = Object.keys(files)[0];

  const spring = useSpring({
    height: expand ? "1000px" : "300px",
    width: "100%",
    config: config.default,
  });

  return (
    <div className="relative w-full overflow-hidden" data-lenis-prevent-touch>
      <SandpackProvider
        template="react"
        theme={colorMode}
        files={files}
        defaultValue={undefined}
        options={{
          visibleFiles: keys,
          activeFile: `${entryKey}`,
        }}
      >
        <SandpackLayout className="opacity-75">
          {/* <div style={spring} className={`${expand ? "h-96" : "h-20"} w-full`}> */}
          <animated.div style={spring} className="overflow-auto">
            <SandpackCodeEditor
              readOnly
              showReadOnly={false}
              showTabs
              showLineNumbers
              showInlineErrors
            />
          </animated.div>
        </SandpackLayout>
      </SandpackProvider>
      <button
        onClick={() => setExpand(!expand)}
        className="absolute right-2 top-1 bg-gray-100 dark:bg-gray-900 rounded-md p-1 px-2 text-black dark:text-white"
      >
        {langMode === "fr" ? "Etendre" : "Expand"}
      </button>
    </div>
  );
}

// const StyledEditor = styled.div`
//   height:
// `
