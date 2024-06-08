import { config, useSpring, animated } from "@react-spring/web";
import useScrollTo from "react-spring-scroll-to-hook";
import useDetectYPosition from "../../hooks/use-detect-y-position.hook";
import Boop from "../Animation/Boop";
import Button from "../Structure/Button";

// TODO: Canvas viewport bug when scrolling while click to top

export default function BackToTop() {
  const { scrollTo } = useScrollTo({ config: config.slow });
  const reachY = useDetectYPosition(200);
  const spring = useSpring({
    opacity: reachY ? 1 : 0,
    y: reachY ? 0 : 50,
    config: config.slow,
  });
  return (
    <animated.div className="fixed bottom-3 right-4" style={spring}>
      <Boop boopConfig={{ y: -10 }}>
        <Button onClick={scrollTo}>
          <span className="material-symbols-outlined text-gray-700 dark:text-gray-300 transition-colors ease-in-out duration-200 block">
            navigation
          </span>
        </Button>
      </Boop>
    </animated.div>
  );
}
