import React from "react";
import { LangContext } from "../context/ThemeProvider";
import { config } from "@react-spring/web";
import GlassmorphismContainer from "../Structure/GlassmorphismContainer";
import Boop from "../Animation/Boop";
import Tooltips from "../UtilityComponent/Tooltips";
import LinkWithSparkles from "../UtilityComponent/LinkWithSparkles";

export default function HeaderSkills({ skills }) {
  const { langMode } = React.useContext(LangContext);

  return (
    <div className="flex flex-col space-y-2 text-black dark:text-white">
      {skills.map((skill, index) => (
        <Skills
          key={index}
          title={langMode === "fr" ? skill.text.fr : skill.text.en}
          skills={skill.skills}
        />
      ))}
    </div>
  );
}

function Skills({ title, skills }) {
  const boopConfig = {
    x: 0,
    y: 5,
    rotation: 15,
    scale: 1.2,
    timing: 150,
    springConfig: config.wobbly,
  };

  return (
    <GlassmorphismContainer className="">
      <div
        className="flex flex-row p-1 overflow-x-auto"
        data-lenis-prevent-touch
      >
        <SkillsTitle title={title} />
        <div className="flex flex-row p-2">
          {skills.map((skill, index) => (
            <div key={index} className="p-1">
              <span
                style={{ color: skill.color }}
                className="text-3xl flex 1"
                data-tooltip-id={`tooltip-${skill.text}`}
                data-tooltip-content={skill.text}
              >
                <Boop boopConfig={boopConfig}>
                  <a href={skill.link} target="_blank" rel="noreferrer">
                    {skill.icon}
                  </a>
                </Boop>
              </span>
              <Tooltips
                id={`tooltip-${skill.text}`}
                value={skill.text}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </GlassmorphismContainer>
  );
}

function SkillsTitle({ title }) {
  return (
    <>
      <h2 className="flex items-center font-bold p-2 bg-theme rounded-md text-lg">
        {title}
      </h2>
    </>
  );
}
