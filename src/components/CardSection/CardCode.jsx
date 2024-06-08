import React from "react";
import GlassmorphismContainer from "../Structure/GlassmorphismContainer";
import CustomSandpack from "../UtilityComponent/CustomSandpack";
import GradientBG from "../Structure/GradientBG";

export default function CardCode({ files }) {
  return (
    <>
      {files.length !== 0 && (
        <GlassmorphismContainer className="overflow-hidden">
          <GradientBG className="p-4">
            <CustomSandpack files={files} />
          </GradientBG>
        </GlassmorphismContainer>
      )}
    </>
  );
}
