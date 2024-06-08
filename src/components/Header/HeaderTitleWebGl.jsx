import React from "react";
import * as THREE from "three";
import { Float, OrthographicCamera, Text3D, View } from "@react-three/drei";
import { Flex, Box } from "@react-three/flex";

import { useFrame } from "@react-three/fiber";

import pixelify from "../../Pixelify_Sans_Bold.json";

export default function HeaderTitleWebGl({ color, children }) {
  const letters = [...children];

  return (
    <View style={{ width: "100%", height: "100px" }}>
      <OrthographicCamera
        makeDefault
        left={0}
        top={0}
        right={window.innerWidth}
        bottom={120}
        position={[0, 0, 20]}
        zoom={30}
      >
        <Flex
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          position={[-2, -0.5, -10]}
          rotation={[-Math.PI / 4, 0, 0]}
        >
          {letters.map((letter, index) => (
            <Box
              centerAnchor
              padding={1}
              flexGrow={1}
              key={index}
              rotation={[0, 0, -Math.PI / 16]}
            >
              <Float
                speed={5} // Animation speed, defaults to 1
                rotationIntensity={1} // XYZ rotation intensity, defaults to 1
                floatIntensity={4} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
                floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
              >
                <Text3D font={pixelify} height={0.3} size={2}>
                  {letter}
                  <meshPhysicalMaterial
                    color={color}
                    thickness={0.5}
                    roughness={0.1}
                    clearcoat={1}
                    clearcoatRoughness={1}
                    transmission={0.8}
                    ior={1.25}
                    side={THREE.DoubleSide}
                  />
                </Text3D>
              </Float>
            </Box>
          ))}
        </Flex>
        <ambientLight intensity={1} />
        <pointLight position={[0, 10, 10]} intensity={15000} color={color} />
      </OrthographicCamera>
    </View>
  );
}

function MovingPointLight({ props }) {
  const ref = React.useRef();

  useFrame((delta) => {
    ref.current.position.x = Math.cos(delta) * 0.001;
  });

  return <pointLight ref={ref} {...props} />;
}
