import React, { Suspense, useRef, useState } from "react";
import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh, PerspectiveCamera as ThreePerspectiveCamera, PlaneBufferGeometry } from "three";
import { OrbitControls, PerspectiveCamera, useTexture } from "@react-three/drei";
import { extend, Object3DNode } from '@react-three/fiber'
import { Water2Options } from "three-stdlib";
import {Water} from 'three/examples/jsm/objects/Water2';
import WaterNormalA from './Water_1_M_Normal.jpeg';
import WaterNormalB from './Water_2_M_Normal.jpeg';

extend({Water});

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'water': Object3DNode<Water, typeof Water>;
    }
  }
}

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

const geo = new PlaneBufferGeometry(100,100);

const WaterWrapper = () => {
 const waterNormalTextureA = useTexture(WaterNormalA);
  const waterNormalTextureB = useTexture(WaterNormalB);

const options: Water2Options = {
  color: 'white',
  normalMap0: waterNormalTextureA,
  normalMap1: waterNormalTextureB,
  reflectivity: 0.1,
  // flowSpeed: 0.1,
  // scale: 0.5

};

  return <water rotation-x={-Math.PI/2} position-y={-1} args={[geo, options]} />
}

function App() {
 
  const myCamera = useRef<ThreePerspectiveCamera>();

  return (
    <div style={{ width: 500, height: 500 }}>
      <Canvas>
        <PerspectiveCamera
          makeDefault
          position-z={10}
          position-y={2}
          ref={myCamera}
        ></PerspectiveCamera>
        <OrbitControls camera={myCamera.current} />

        <ambientLight args={["white", 1]} />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
        {/* <mesh position={[0, 0, -5]} rotation-x={1}>
          <planeGeometry args={[100, 100]} />
          <meshLambertMaterial color="blue" />
        </mesh> */}
        <Suspense fallback={null}><WaterWrapper /></Suspense>
        <mesh position-y={-10}rotation-x={-Math.PI/2} >
          <planeBufferGeometry args={[100,100]} />
          <meshPhongMaterial color="blue" />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
