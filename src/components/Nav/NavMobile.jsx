import React from "react";
import GlassmorphismContainer from "../Structure/GlassmorphismContainer";
import { ThemeSelector } from "./ThemeSelector";
import { LangSelector } from "./LangSelector";
import MenuIcon from "../Structure/MenuIcon";
import NavSearch from "./NavSearch";

const links = [
  { href: "/programming", text: { fr: "Programmation", en: "Programming" } },
  { href: "/drawing", text: { fr: "Dessin", en: "Drawing" } },
  { href: "/music", text: { fr: "Musique", en: "Music" } },
  { href: "/misc", text: { fr: "Autres", en: "Misc" } },
];

export default function NavMobile() {
  const [open, trigger] = React.useState(false);
  const [hovered, hover] = React.useState(false);
  return (
    <>
      <GlassmorphismContainer className="fixed top-4 right-4 z-10 flex self-center p-4 sm:hidden">
        <button
          onClick={() => trigger(!open)}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
        >
          <MenuIcon width={24} height={24} hovered={hovered} open={open} />
        </button>
      </GlassmorphismContainer>
      <div
        onClick={() => trigger(!open)}
        className={`fixed inset-0 backdrop-blur-md transition-opacity ease-in-out duration-150 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      ></div>
      <div
        className={`${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } fixed top-4 left-4 right-4 sm:hidden isolate`}
      >
        <GlassmorphismContainer className="p-4 flex flex-col">
          <div className={`transition-opacity ease-in-out duration-150`}>
            <div className="flex flex-col">
              <div className="flex flex-col sm:flex-row items-center justify-around space-x-0 sm:space-x-4 space-y-4 sm-space-y-0">
                <ThemeSelector />
                <LangSelector />
                <NavSearch />
              </div>
            </div>
          </div>
        </GlassmorphismContainer>
      </div>
    </>
  );
}
