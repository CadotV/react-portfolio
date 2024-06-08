import { config } from "@react-spring/web";
import GlassmorphismContainer from "../Structure/GlassmorphismContainer";
import Boop from "../Animation/Boop";
import Tooltips from "../UtilityComponent/Tooltips";

export default function HeaderSocial({ socials }) {
  const boopConfig = {
    x: 0,
    y: 0,
    rotation: 15,
    scale: 1.3,
    timing: 200,
    springConfig: config.wobbly,
  };
  return (
    <>
      {socials.map((social, index) => (
        <GlassmorphismContainer key={index} className="w-14">
          <a
            className="text-4xl p-2 flex justify-center"
            href={social.href}
            alt={social.alt}
            target="_blank"
            rel="noreferrer"
            data-tooltip-id={`tooltip-${social.alt}`}
          >
            <Boop key={index} boopConfig={boopConfig}>
              {social.icon}
            </Boop>
          </a>
          <Tooltips
            id={`tooltip-${social.alt}`}
            value={social.alt}
            index={index}
          />
        </GlassmorphismContainer>
      ))}
    </>
  );
}
