import React from "react";
import GlassmorphismContainer from "../Structure/GlassmorphismContainer";
import { useSpring, config, animated } from "@react-spring/web";
import useOutsideClick from "../../hooks/use-outside-click.hook";
import GradientBG from "../Structure/GradientBG";
import NotAvailable from "../UtilityComponent/NotAvailable";

export default function NavSearch() {
  const [searchItem, setSearchItem] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef();
  const outsideClick = useOutsideClick(ref);

  const spring = useSpring({
    width: visible ? 200 : 0,
    config: config.wobbly,
  });

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    console.log(searchTerm);
  };

  const AnimatedGlassmorphismContainer = animated(GlassmorphismContainer);

  return (
    <NotAvailable>
      <AnimatedGlassmorphismContainer
        isFixed
        className="flex flex-row py-1 px-1"
      >
        <animated.input
          style={spring}
          type="text"
          value={searchItem}
          onChange={handleInputChange}
          placeholder="Type to search"
          className="inline-block h-auto px-2 bg-gray-200 dark:bg-gray-800 rounded-md text-sm placeholder-slate-400
        focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
        invalid:border-pink-500 invalid:text-pink-600
        focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
        />
        <button
          ref={ref}
          className={`${
            visible ? "bg-blue-400" : ""
          } p-3 rounded-md transition-colors ease-in-out duration-150`}
          onClick={() => {
            setVisible(!visible);
          }}
        >
          <span className="material-symbols-outlined text-gray-700 dark:text-gray-300 transition-colors ease-in-out duration-200 block">
            search
          </span>
        </button>
      </AnimatedGlassmorphismContainer>
    </NotAvailable>
  );
}
