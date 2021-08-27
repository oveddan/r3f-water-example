import React, { useRef, useState } from "react";
import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { PerspectiveCamera } from "@react-three/drei";

const Box = (props: { position: [number, number, number] }) => {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef<Mesh>();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (ref && ref.current) ref.current.rotation.x += 0.01;
  });
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

function App() {
  return (
    <div style={{ width: 500, height: 500 }}>
      <Canvas>
        <PerspectiveCamera
          makeDefault
          position-z={10}
          position-y={2}
        ></PerspectiveCamera>

        <ambientLight args={["white", 0.2]} />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
        <mesh position={[0, 0, -5]} rotation-x={1}>
          <planeGeometry args={[100, 100]} />
          <meshLambertMaterial color="blue" />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
