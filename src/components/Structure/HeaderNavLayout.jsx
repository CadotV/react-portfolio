import React from "react";
import { useSpring, config, animated } from "@react-spring/web";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import useReachNodeBottom from "../../hooks/use-reach-node-bottom.hook";

export default function HeaderNavLayout() {
  const headerRef = React.useRef();
  const navRef = React.useRef();

  const reachNavTop = useReachNodeBottom(headerRef);

  const spring = useSpring({
    position: reachNavTop ? "fixed" : "relative",
    width: reachNavTop ? "96%" : "100%",
    borderRadius: reachNavTop ? "24px" : "0px",
    top: reachNavTop ? "20px" : "0px",
    left: reachNavTop ? "2%" : "0%",
    config: config.default,
  });

  return (
    <>
      <div ref={headerRef} className="h-full w-full">
        <Header />
      </div>
      <animated.div
        ref={navRef}
        style={spring}
        className="z-10 overflow-hidden top-0 backdrop-blur-md bg-gray-100 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 transition-colors ease-in-out duration-200 shadow-md shadow-gray-300 dark:shadow-gray-700"
      >
        <Nav />
      </animated.div>
    </>
  );
}
