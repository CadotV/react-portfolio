import React from "react";
import { LangContext } from "../context/ThemeProvider";
import GlassmorphismContainer from "../Structure/GlassmorphismContainer";
import GradientBG from "../Structure/GradientBG";

export default function HeaderPresentation() {
  const { langMode } = React.useContext(LangContext);
  return (
    <GradientBG className="rounded-md p-2">
      <div className="backdrop-filter-md bg-opacity-25 dark:bg-opacity-25 bg-gray-200 dark:bg-gray-800 rounded-md p-4">
        <p>
          {langMode === "fr"
            ? "Bonjour, je suis un développeur web ayant travaillé sur plusieurs projets en php et Javascript. Je me spécialise actuellement en React et son éco-système."
            : "Hi, I am a web developer who worked on many projects using php and Javascript. I'm currently mastering React and its eco-system."}
        </p>
      </div>
    </GradientBG>
  );
}
