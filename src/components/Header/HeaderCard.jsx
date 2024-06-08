import CardEffect from "../Animation/CardEffect";
import GlassmorphismContainer from "../Structure/GlassmorphismContainer";
import Tooltips from "../UtilityComponent/Tooltips";
import { LangContext } from "../context/ThemeProvider";
import React from "react";
import ColoredContainer from "../Structure/ColoredContainer";
import HeaderImg from "./HeaderImg";

import { GiBrain } from "react-icons/gi";
import { GiArcheryTarget } from "react-icons/gi";
import { TbSword } from "react-icons/tb";
import { GiWisdom } from "react-icons/gi";
import { PiHeartHalfDuotone } from "react-icons/pi";
import HeaderPresentation from "./HeaderPresentation";
import HeaderTitleWebGl from "./HeaderTitleWebGl";

const caracteristiques = [
  {
    text: { fr: "Force", en: "Strength" },
    value: "5",
    color: "brown",
    icon: <TbSword />,
  },
  {
    text: { fr: "Vitalité", en: "Vitality" },
    value: "7",
    color: "pink",
    icon: <PiHeartHalfDuotone />,
  },
  {
    text: { fr: "Dexterité", en: "Dexterity" },
    value: "8",
    color: "yellow",
    icon: <GiArcheryTarget />,
  },
  {
    text: { fr: "Intélligence", en: "Intelligence" },
    value: "9",
    color: "blue",
    icon: <GiBrain />,
  },
  {
    text: { fr: "Sagesse", en: "Wisdom" },
    value: "12",
    color: "cyan",
    icon: <GiWisdom />,
  },
];

export default function HeaderCard({ imgSrc, imgAlt }) {
  const { langMode } = React.useContext(LangContext);
  const ref = React.useRef();
  return (
    <>
      <CardEffect>
        <GlassmorphismContainer>
          <div
            ref={ref}
            className="relative flex flex-col h-full self-stretch p-2 bg-noise-pattern space-y-2"
          >
            <HeaderPresentation />
            <div className="flex flex-row space-x-2 max-h-96">
              <HeaderImg imgSrc={imgSrc} imgAlt={imgAlt} />
              <div className="flex flex-col space-y-2 w-1/2">
                {caracteristiques.map((caracteristique, index) => (
                  <Caracteristique key={index} {...caracteristique} />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <ColoredContainer>
                <p className="text-justify block p-4 text-black dark:text-white">
                  {langMode === "fr"
                    ? `Projet professionnel: Développer des sites et applications avec l'éco-système Javascript`
                    : `Professionnal project: Develop websites using Javascript ecosystem`}
                </p>
              </ColoredContainer>
              <ColoredContainer>
                <p className="text-justify block p-4 text-black dark:text-white">
                  {langMode === "fr"
                    ? `Projet personnel: Développer une application SaaS pour créer sa planète personnalisée avec Threejs et React. Réalisation en Epoxy et impression 3D par la suite.`
                    : `Personal project: Develop a SaaS web-app to imagine his own custom planet with Threejs and React. Create a real planet with epoxy and 3d printing.`}
                </p>
              </ColoredContainer>
            </div>
          </div>
        </GlassmorphismContainer>
      </CardEffect>
    </>
  );
}

function Caracteristique({ ...props }) {
  const { langMode } = React.useContext(LangContext);
  return (
    <div
      className="p-2 flex flex-row items-center space-x-2 rounded-md text-4xl text-black dark:text-black"
      style={{
        backgroundColor: props.color,
        ...props.position,
      }}
    >
      <span className="block">{props.icon}</span>
      <span className="text-lg block">
        {langMode === "fr" ? props.text.fr : props.text.en}
      </span>
      <span className="font-title text-2xl block">{props.value}</span>
    </div>
  );
}
