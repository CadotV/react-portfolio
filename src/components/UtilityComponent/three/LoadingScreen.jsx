import * as Drei from "@react-three/drei";
import LoadingCube from "./LoadingCube";
import React from "react";
import useTimeout from "../../../hooks/use-timeout.hook";
import { useSpring, config, animated } from "@react-spring/web";

export default function LoadingScreen({ children }) {
  const loaded = useTimeout(5000);
  const springLoading = useSpring({
    opacity: loaded ? 0 : 1,
    config: config.default,
  });

  const springLoaded = useSpring({
    opacity: loaded ? 1 : 0,
    config: config.default,
  });
  return (
    <>
      <animated.div
        className="fixed inset-0 z-50 flex flex-col justify-center overflow-hidden isolate"
        style={springLoading}
      >
        <span className="absolute bottom-20 text-gray-200 font-title text-center inline-block w-full text-4xl">
          Loading ...
        </span>
        {!loaded && (
          <Drei.View style={{ width: "100%", height: "100%", zIndex: 1000 }}>
            <Drei.PerspectiveCamera fov={70} position={[0, 0, 0]}>
              <Drei.Center>
                <LoadingCube
                  scale={1.5}
                  rotation={[Math.PI / 4, Math.PI / 4, 0]}
                />
              </Drei.Center>
            </Drei.PerspectiveCamera>
            <Common color="#150222" />
          </Drei.View>
        )}
      </animated.div>
      <animated.div style={springLoaded}>{children}</animated.div>
    </>
  );
}

function Common({ color }) {
  return (
    <>
      {color && <color attach="background" args={[color]} />}
      <ambientLight intensity={1} />
      <pointLight position={[0, 20, 30]} intensity={50000} color="yellow" />
      <pointLight position={[0, -20, 30]} intensity={50000} color="blue" />
    </>
  );
}
