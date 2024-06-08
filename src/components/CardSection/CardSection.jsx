import GlassmorphismContainer from "../Structure/GlassmorphismContainer";
import Boop from "../Animation/Boop";
import Tooltips from "../UtilityComponent/Tooltips";
import { config } from "@react-spring/web";
import GradientBG from "../Structure/GradientBG";
import { LangContext } from "../context/ThemeProvider";
import React from "react";
import CardCode from "./CardCode";
import CardDetails from "./CardDetails";

export default function CardSection({
  title,
  skills,
  files = [],
  textDone,
  textNotDone,
  children,
}) {
  const { langMode } = React.useContext(LangContext);
  return (
    <div className="px-4 container mx-auto">
      <GlassmorphismContainer>
        <section className="p-4 flex flex-col space-y-4">
          <h2 className="font-title text-3xl text-center">
            {langMode === "fr" ? title.fr : title.en}
          </h2>
          {children}
          <CardDetails textDone={textDone} textNotDone={textNotDone} />
          <Skills
            title={
              langMode === "fr" ? "Technologies utilisées" : "Technologies used"
            }
            skills={skills}
          />
          <div>
            <CardCode files={files} />
          </div>
        </section>
      </GlassmorphismContainer>
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
    <GradientBG className="rounded-lg">
      <GlassmorphismContainer>
        <div className="flex flex-row p-1 overflow-x-auto">
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
                  <Boop boopConfig={boopConfig}>{skill.icon}</Boop>
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
    </GradientBG>
  );
}

function SkillsTitle({ title }) {
  return (
    <>
      <h2 className=" backdrop-blur-md flex items-center font-bold p-2 bg-gray-300 dark:bg-gray-700 bg-opacity-25 dark:bg-opacity-25 h-inherit rounded-md">
        {title}
      </h2>
    </>
  );
}
