import React from "react";
import * as THREE from "three";
import * as Drei from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function LoadingCube({ ...props }) {
  const ref = React.useRef();

  useFrame((delta) => {
    ref.current.rotation.y = delta.clock.elapsedTime;
  });

  return (
    <Drei.Box ref={ref} position={[0, 0, 0]} args={[1, 1, 1]} {...props}>
      <meshStandardMaterial />
    </Drei.Box>

    //   <Suspense fallback={null}>
    //   <a.mesh
    //     ref={sphere}
    //     scale={wobble}
    //     onPointerOver={() => setHovered(true)}
    //     onPointerOut={() => setHovered(false)}
    //     onPointerDown={() => setDown(true)}
    //     onPointerUp={() => {
    //       setDown(false)
    //       // Toggle mode between dark and bright
    //       setMode(!mode)
    //       setBg({ background: !mode ? '#202020' : '#f0f0f0', fill: !mode ? '#f0f0f0' : '#202020' })
    //     }}>
    //     <sphereBufferGeometry args={[1, 64, 64]} />
    //     <AnimatedMaterial color={color} envMapIntensity={env} clearcoat={coat} clearcoatRoughness={0} metalness={0.1} />
    //   </a.mesh>
    //   <Environment preset="warehouse" />
    //   <ContactShadows
    //     rotation={[Math.PI / 2, 0, 0]}
    //     position={[0, -1.6, 0]}
    //     opacity={mode ? 0.8 : 0.4}
    //     width={15}
    //     height={15}
    //     blur={2.5}
    //     far={1.6}
    //   />
    // </Suspense>
  );
}
