import React from "react";
import { useMouse, useWindowSize } from "@uidotdev/usehooks";
import useScreenDetector from "../../hooks/use-screen-detector.hook";
import usePrefersReducedMotion from "../../hooks/use-prefers-reduced-motion.hook";

// TODO: Remove effect on mobile

export default function GlassmorphismContainer({
  children,
  className = "",
  animated = true,
}) {
  const [mouse, ref] = useMouse();
  const { isMobile } = useScreenDetector();

  const prefersRefucedMotion = usePrefersReducedMotion();

  return (
    <div
      ref={ref}
      className={`${className} backdrop-blur-md bg-gray-200 dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 rounded-lg border-gray-100 dark:border-gray-900 border border-opacity-25 transition-colors ease-in-out duration-200 shadow-sm shadow-gray-300 dark:shadow-gray-700 text-black dark:text-white overflow-hidden`}
    >
      {((animated && !isMobile) || prefersRefucedMotion) && (
        <span
          className="absolute w-[1000px] h-[1000px] block -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100 dark:from-gray-900 from-0% to-transparent to-70% opacity-25 dark:opacity-25"
          style={{
            left: mouse.elementX - 500,
            top: mouse.elementY - 500,
          }}
        />
      )}
      {children}
    </div>
  );
}
