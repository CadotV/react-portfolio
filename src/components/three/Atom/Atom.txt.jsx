export const AtomString = `
import * as THREE from "three";
import { Instances, Instance, Trail } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { useSpring, config } from "@react-spring/core";
import { a } from "@react-spring/three";

const AnimatedInstance = a(Instance);

export default function Atom({
  numElectron = 10,
  nucleusRadius = 2,
  electronRadius = 0.2,
  animate,
}) {
  const electrons = useMemo(() => {
    const temp = [];
    for (let i = 0; i < numElectron; i++) {
      const t = Math.random() * 200;
      const speed = 0.001 + Math.random() / 50;
      const rand = Math.random();
      const position = new THREE.Vector3()
        .randomDirection()
        .multiplyScalar(nucleusRadius + rand);
      temp.push({
        t,
        speed,
        position,
      });
    }
    return temp;
  }, [numElectron, nucleusRadius]);

  const [springs, api] = useSpring(
    () => ({
      toggled: false,
      scale: 1,
      color: "#03eeff",
      springSpeed: 1,
      electronTrailColor: "#ee00ff",
      config: config.wobbly,
    }),
    []
  );

  const handleClick = useCallback(() => {
    let clicked = false;
    return () => {
      clicked = !clicked;
      api.start({
        toggled: clicked ? true : false,
        scale: clicked ? 0.5 : 1,
        springSpeed: clicked ? 5 : 1,
        color: clicked ? "#ee00ff" : "#03eeff",
        electronTrailColor: clicked ? "#03eeff" : "#ee00ff",
      });
    };
  }, []);

  return (
    <>
      <group position={[0, 0, 0]} onClick={handleClick()}>
        <Nucleus
          position={[0, 0, 0]}
          radius={nucleusRadius}
          springs={springs}
        />
        <InstancedElectrons
          electrons={electrons}
          electronRadius={electronRadius}
          springs={springs}
          animate={animate}
        />
      </group>
    </>
  );
}

export function Nucleus({ ...props }) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const onPointerOver = useCallback(() => setHover(true), []);
  const onPointerOut = useCallback(() => setHover(false), []);

  useEffect(
    () => void (document.body.style.cursor = hovered ? "pointer" : "auto"),
    [hovered]
  );

  return (
    <>
      <a.mesh
        ref={meshRef}
        position={props.position}
        scale={props.springs.scale}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        <pointLight
          position={[props.position]}
          color={"red"}
          intensity={5}
          distance={100}
        />
        <sphereGeometry args={[props.radius, 32, 32]} />
        <a.meshBasicMaterial color={props.springs.color} />
      </a.mesh>
    </>
  );
}

export function InstancedElectrons({
  electrons,
  electronRadius,
  animate,
  springs,
}) {
  return (
    <>
      <Instances limit={electrons.length} range={electrons.length}>
        <dodecahedronGeometry args={[electronRadius, 0]} />
        <a.meshPhongMaterial color={springs.electronTrailColor} />
        {electrons.map((data, i) => (
          <Electron key={i} {...data} animate={animate} springs={springs} />
        ))}
      </Instances>
    </>
  );
}

export function Electron({ t, speed, position, animate, springs }) {
  const instanceRef = useRef();
  const orbitRef = useRef();

  const orbitCenter = new THREE.Vector3();
  const distanceFromOrbitCenter = position.distanceTo(orbitCenter);
  const scalarStart = distanceFromOrbitCenter;
  const scalarEnd = distanceFromOrbitCenter - 6;
  let scalar = scalarStart;

  useFrame(() => {
    if (animate.current) {
      t += speed * instanceRef.current.speed * 0.1;
      orbitRef.current.rotation.set(Math.cos(t), Math.sin(t), 0);
      instanceRef.current.toggled
        ? (scalar = THREE.MathUtils.lerp(scalar, scalarEnd, 0.05))
        : (scalar = THREE.MathUtils.lerp(scalar, scalarStart, 0.05));
      instanceRef.current.position.normalize().multiplyScalar(scalar);
    }
  });
  return (
    <>
      <a.group ref={orbitRef} position={orbitCenter}>
        <AnimatedInstance
          ref={instanceRef}
          position={position}
          speed={springs.springSpeed}
          toggled={springs.toggled}
        />
      </a.group>
    </>
  );
}

`;
