import useBoop from "../../hooks/use-boop.hook";
import { animated } from "@react-spring/web";

export default function Boop({ children, boopConfig, className = "" }) {
  const [style, trigger] = useBoop(boopConfig);

  return (
    <animated.span onMouseEnter={trigger} style={style} className={className}>
      {children}
    </animated.span>
  );
}
