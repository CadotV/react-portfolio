import { config, animated, useSpring } from "@react-spring/web";
import React from "react";
import styled from "styled-components";

export default function MenuIcon({ width, height, hovered, open }) {
  const offsetY = 4;
  const springTop = useSpring({
    y: hovered ? -offsetY : 0,
    opacity: open ? 0 : 1,
    config: config.stiff,
  });
  const springBottom = useSpring({
    y: hovered ? offsetY : 0,
    opacity: open ? 0 : 1,
    config: config.stiff,
  });

  const springMiddleLeft = useSpring({
    rotateZ: hovered ? 90 : 0,
    x: hovered ? -11 : 0,
    opacity: open ? 0 : 1,
    config: config.stiff,
  });
  const springMiddleRight = useSpring({
    rotateZ: hovered ? -90 : 0,
    x: hovered ? 11 : 0,
    opacity: open ? 0 : 1,
    config: config.stiff,
  });
  const springCrossLeft = useSpring({
    rotateZ: hovered ? 45 : 0,
    opacity: open ? 1 : 0,
    config: config.stiff,
  });
  const springCrossRight = useSpring({
    rotateZ: hovered ? -45 : 0,
    opacity: open ? 1 : 0,
    config: config.stiff,
  });

  const widthPx = `${width}px`;
  const heightPx = `${height / 6}px`;

  return (
    <div
      className="flex flex-col justify-center space-y-1 w-full h-full"
      style={{ width: width, height: height }}
    >
      <StyledTopBar
        style={{
          "--width": widthPx,
          "--height": heightPx,
          ...springTop,
        }}
        className="bg-gray-800 dark:bg-gray-200 transition-colors ease-in-out duration-150 rounded-lg"
      />
      <div className="relative" style={{ height: height / 6 }}>
        <StyledMiddleBar
          style={{
            "--width": widthPx,
            "--height": heightPx,
            ...springMiddleLeft,
          }}
          className="absolute bg-gray-800 dark:bg-gray-200 transition-colors ease-in-out duration-150 rounded-lg transform"
        />
        <StyledMiddleBar
          style={{
            "--width": widthPx,
            "--height": heightPx,
            ...springMiddleRight,
          }}
          className="absolute bg-gray-800 dark:bg-gray-200 transition-colors ease-in-out duration-150 rounded-lg transform"
        />
      </div>
      <StyledBottomBar
        style={{
          "--width": widthPx,
          "--height": heightPx,
          ...springBottom,
        }}
        className="bg-gray-800 dark:bg-gray-200 transition-colors ease-in-out duration-150 rounded-lg"
      />
      <StyledMiddleCross
        style={{
          "--width": widthPx,
          "--height": heightPx,
          ...springCrossLeft,
        }}
        className="absolute bg-gray-800 dark:bg-gray-200 transition-colors ease-in-out duration-150 rounded-lg transform"
      />
      <StyledMiddleCross
        style={{
          "--width": widthPx,
          "--height": heightPx,
          ...springCrossRight,
        }}
        className="absolute bg-gray-800 dark:bg-gray-200 transition-colors ease-in-out duration-150 rounded-lg transform"
      />
    </div>
  );
}

const StyledTopBar = styled(animated.span)`
  display: block;
  width: var(--width);
  height: var(--height);
`;

const StyledMiddleBar = styled(animated.span)`
  display: block;
  width: var(--width);
  height: var(--height);
`;
const StyledBottomBar = styled(animated.span)`
  display: block;
  width: var(--width);
  height: var(--height);
`;
const StyledMiddleCross = styled(animated.span)`
  display: block;
  width: var(--width);
  height: var(--height);
`;
