/**
 * Link for external website
 */

import { useHover } from "@uidotdev/usehooks";
import Sparkles from "../Animation/Sparkles";
import styled, { keyframes } from "styled-components";

export default function LinkWithSparkles({ href, children }) {
  const colors = ["#ee7752", "#e73c7e", "#23a6d5", "#23d5ab"];
  return (
    <>
      {href !== undefined ? (
        <span className="relative inline-block">
          <StyledUnderline />
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-3xl relative"
          >
            <Sparkles colors={colors}>{children}</Sparkles>
          </a>
        </span>
      ) : (
        <>{children}</>
      )}
    </>
  );
}

const Gradient = keyframes`
0% {
  background-position: 0% 50%;
}
50% {
  background-position: 100% 50%;
}
100% {
  background-position: 0% 50%;
}
`;

const StyledUnderline = styled.span`
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 6px;
  border-radius: 4px;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  @media (prefers-reduced-motion: no-preference) {
    -webkit-animation: ${Gradient} 2s ease infinite;
    -moz-animation: ${Gradient} 2s ease infinite;
    animation: ${Gradient} 2s ease infinite;
  }
`;
