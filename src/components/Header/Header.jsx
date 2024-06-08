import HeaderSkills from "./HeaderSkills";
import HeaderSocial from "./HeaderSocial";
import HeaderCard from "./HeaderCard";
import * as HeaderData from "./HeaderData";
import GradientBG from "../Structure/GradientBG";
import HeaderTitleWebGl from "./HeaderTitleWebGl";
import React from "react";
import { LangContext } from "../context/ThemeProvider";
import LoadingCube from "../UtilityComponent/three/LoadingCube";

import headerPortrait from "../../header_portrait.JPG";

export default function Header() {
  const langMode = React.useContext(LangContext);
  return (
    <header>
      <GradientBG>
        <h1 className="w-full flex flex-col lg:flex-row justify-between container mx-auto">
          <React.Suspense fallback={<LoadingCube />}>
            <HeaderTitleWebGl color="#ffae00">WEB</HeaderTitleWebGl>
            <HeaderTitleWebGl color="#0077ff">APPS</HeaderTitleWebGl>
            <HeaderTitleWebGl color="#e30ff7">GAMES</HeaderTitleWebGl>
          </React.Suspense>
        </h1>
        <div className="p-4 space-y-2 container mx-auto">
          <div className="flex flex-col lg:flex-row space-x-0 space-y-2 lg:space-y-0 lg:space-x-2">
            <HeaderCard imgSrc={headerPortrait} imgAlt="Valentin Cadot" />
            <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-2 space-y-2 lg:space-y-0">
              <HeaderSkills
                skills={[
                  HeaderData.webSkills,
                  HeaderData.javascriptSkills,
                  HeaderData.devSkills,
                  HeaderData.artSkills,
                  HeaderData.otherSkills,
                ]}
              />
              <div className="flex flex-row lg:flex-col space-y-0 lg:space-y-2 justify-between lg:justify-start">
                <HeaderSocial socials={HeaderData.socials} />
              </div>
            </div>
          </div>
        </div>
      </GradientBG>
    </header>
  );
}
