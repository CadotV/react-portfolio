import React from "react";
import { config, useSpring, animated } from "@react-spring/web";
import useMousePosition from "../../hooks/use-mouse-position.hook";
import useScreenDetector from "../../hooks/use-screen-detector.hook";
import usePrefersReducedMotion from "../../hooks/use-prefers-reduced-motion.hook";

export default function CardEffect({ children }) {
  const ref = React.useRef();
  const [hovered, setHover] = React.useState(false);
  const mousePosition = useMousePosition();
  const { isMobile } = useScreenDetector();

  const prefersRefucedMotion = usePrefersReducedMotion();

  const spring = useSpring({
    scale: hovered ? 0.9 : 1,
    rotateX: hovered
      ? (mousePosition.x -
          (ref.current.offsetLeft + ref.current.clientWidth / 2)) /
        20
      : 0,
    rotateY: hovered
      ? (mousePosition.y -
          (ref.current.offsetTop + ref.current.clientHeight / 2)) /
        20
      : 0,
    config: config.wobbly,
  });

  return (
    <div
      className="w-full h-full"
      onPointerOver={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      {isMobile || prefersRefucedMotion ? (
        <div ref={ref}>{children}</div>
      ) : (
        <animated.div
          ref={ref}
          className="rounded-lg shadow-sm shadow-white dark:shadow-black transform origin-center"
          style={spring}
        >
          {children}
        </animated.div>
      )}
    </div>
  );
}
