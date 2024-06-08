import React from "react";
import { ViewPostProcessing } from "../UtilityComponent/three/ViewPostProcessing";
import * as Drei from "@react-three/drei";
import * as THREE from "three";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import useScreenDetector from "../../hooks/use-screen-detector.hook";
import { useFrame } from "@react-three/fiber";
import LoadingCube from "../UtilityComponent/three/LoadingCube";

export default function CardWebGl({ component, ...rest }) {
  const AnimatedComponent = withAnimateOnPointer(component);
  return <AnimatedComponent {...rest} />;
}

/** HOC that handle animation trigger of component */
const withAnimateOnPointer = (Component) => {
  return function AnimatedComponent(props) {
    const animate = React.useRef(false);

    const [ref, entry] = useIntersectionObserver({
      threshold: 0.7,
      root: null,
      rootMargin: "0px",
    });

    const { isMobile } = useScreenDetector();

    React.useEffect(() => {
      entry?.isIntersecting
        ? (animate.current = true)
        : (animate.current = false);
    }, [entry?.isIntersecting]);

    return (
      <div
        ref={ref}
        style={{
          width: "100%",
          height: isMobile ? 300 : 700,
          margin: "20px auto",
        }}
        data-lenis-prevent
      >
        <ViewContainer
          bgColor={props.bgColor}
          scale={props.scale}
          passes={props.passes}
        >
          <Component {...props} animate={animate} />
        </ViewContainer>
      </div>
    );
  };
};

function ViewContainer({ bgColor, passes, scale, children }) {
  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <ViewContent bgColor={bgColor} passes={passes} scale={scale}>
            {children}
          </ViewContent>
        </div>
      </div>
    </>
  );
}

function ViewContent({ bgColor, passes, scale = 2, children }) {
  const view = React.useRef();
  return (
    <ViewPostProcessing
      ref={view}
      passes={passes}
      borderRadius={25}
      style={{ position: "absolute", width: "100%", height: "100%" }}
    >
      <React.Suspense fallback={<LoadingCube />}>
        <Common color={bgColor} />
        <group scale={scale}>{children}</group>
      </React.Suspense>
      <Drei.OrbitControls makeDefault />
    </ViewPostProcessing>
  );
}

function Common({ color }) {
  return (
    <>
      {color && <color attach="background" args={[color]} />}
      <ambientLight intensity={1} />
      <pointLight position={[20, 30, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="blue" />
      <Drei.Environment preset="dawn" />
      <Drei.PerspectiveCamera
        userData={"view-camera"}
        makeDefault
        fov={70}
        position={[0, 0, 20]}
      />
    </>
  );
}
