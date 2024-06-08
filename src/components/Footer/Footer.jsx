import React from "react";
import GlassmorphismContainer from "../Structure/GlassmorphismContainer";
import GradientBG from "../Structure/GradientBG";
import { LangContext } from "../context/ThemeProvider";
import { FaKeyboard } from "react-icons/fa";
import { BsFillMouseFill } from "react-icons/bs";
import HeaderSocial from "../Header/HeaderSocial";
import * as HeaderData from "../Header/HeaderData";

export default function Footer() {
  const { langMode } = React.useContext(LangContext);
  return (
    <FooterContainer>
      <div className="text-center">
        <p>Version 0.0.1 (Retrieve Github versionning)</p>
        <p>
          © {new Date().getFullYear()} Valentin Cadot.{" "}
          {langMode === "fr" ? "Développé avec un" : "Developed with a"}{" "}
          <span className="inline-block align-middle text-2xl">
            <FaKeyboard />
          </span>{" "}
          {langMode === "fr" ? "et une" : "and a"}
          <span className="inline-block align-middle text-2xl">
            <BsFillMouseFill />
          </span>
        </p>
      </div>
      <div className="flex flex-row justify-center text-center space-x-2">
        <HeaderSocial socials={HeaderData.socials} />
      </div>
    </FooterContainer>
  );
}

function FooterContainer({ children }) {
  return (
    <GradientBG className="p-4">
      <GlassmorphismContainer className="p-4 flex flex-col space-y-2 container mx-auto">
        {children}
      </GlassmorphismContainer>
    </GradientBG>
  );
}
