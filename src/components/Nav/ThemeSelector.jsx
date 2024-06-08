import React from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { Switch } from "@headlessui/react";
import { useSpring, animated, config } from "@react-spring/web";
import Boop from "../Animation/Boop";
import GlassmorphismContainer from "../Structure/GlassmorphismContainer";

export function ThemeSelector() {
  const { colorMode, setColorMode } = React.useContext(ThemeContext);
  const [enabled, setEnabled] = React.useState(false);
  return (
    <GlassmorphismContainer>
      <div className={`px-2 py-1`}>
        <Switch
          checked={enabled}
          onChange={() => {
            setColorMode(colorMode === "light" ? "dark" : "light");
            setEnabled(!enabled);
          }}
          className={`relative inline-flex h-12 w-20 items-center rounded-lg`}
        >
          <div className="flex flex-row items-center h-full flex-grow">
            <Boop boopConfig={{ rotation: 45, scale: 1.2 }} className="grow">
              <span
                className={`material-symbols-outlined block ${
                  colorMode === "light" ? "text-yellow-400" : "text-white"
                }`}
              >
                light_mode
              </span>
            </Boop>
            <Boop boopConfig={{ rotation: 45, scale: 1.2 }} className="grow">
              <span
                className={`material-symbols-outlined  block ${
                  colorMode === "dark" ? "text-blue-300" : "text-black"
                }`}
              >
                dark_mode
              </span>
            </Boop>
          </div>

          <span className="sr-only">Change theme</span>
          <BGSelector enabled={colorMode === "light" ? false : true} />
        </Switch>
      </div>
    </GlassmorphismContainer>
  );
}

function BGSelector({ enabled }) {
  const spring = useSpring({
    x: enabled ? 40 : 0,
    config: config.wobbly,
  });
  return (
    <animated.span
      className="inline-block h-10 w-10 transform rounded-md bg-gray-100 dark:bg-gray-900 -z-10 absolute"
      style={spring}
    ></animated.span>
  );
}
