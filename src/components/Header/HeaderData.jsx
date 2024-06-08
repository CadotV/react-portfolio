import * as IconData from "./IconData";

import { MdOutlineMail } from "react-icons/md";
import { FaGithubSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineLinkedin } from "react-icons/ai";

export const webSkills = {
  text: { fr: "Web", en: "Web" },
  skills: [
    IconData.html5,
    IconData.css3,
    IconData.tailwindcss,
    IconData.styledComponent,
    IconData.webpack,
    IconData.w3c,
    IconData.storybook,
  ],
};

export const javascriptSkills = {
  text: { fr: "Javascript", en: "Javascript" },
  skills: [
    IconData.javascript,
    IconData.remix,
    IconData.react,
    IconData.electron,
    IconData.nodejs,
    IconData.socketio,
    IconData.threejs,
    IconData.reactSpring,
    IconData.mongodb,
    IconData.jquery,
  ],
};

export const devSkills = {
  text: { fr: "Développement", en: "Development" },
  skills: [
    IconData.php,
    IconData.mysql,
    IconData.visualStudioCode,
    IconData.git,
    IconData.csharp,
    IconData.glsl,
  ],
};

export const artSkills = {
  text: { fr: "Art digital", en: "Digital Art" },
  skills: [IconData.blender, IconData.photoshop, IconData.figma],
};

export const otherSkills = {
  text: { fr: "Autres", en: "Others" },
  skills: [IconData.electronic, IconData.network],
};

export const socials = [
  {
    alt: "Instagram",
    href: "https://www.instagram.com/valentin.cadot/",
    icon: <FaInstagram />,
  },
  {
    alt: "Linkedin",
    href: "https://www.linkedin.com/in/valentin-cadot-0466b0b5/",
    icon: <AiOutlineLinkedin />,
  },
  {
    alt: "Github",
    href: "https://github.com/CadotV",
    icon: <FaGithubSquare />,
  },
  {
    alt: "Contact me",
    href: "mailto:valentin.cadot@gmail.com",
    icon: <MdOutlineMail />,
  },
];
