import { Canvas, useFrame, Camera, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { MapControls, Stats } from "@react-three/drei";
import { useRef, useState } from "react";
import Orbit from '../components/Orbit'
// import climbing3 from '../assets/walls/climbing3.glb'
import climbing3 from '../assets/walls/1_더클라임강남점_0.glb'

const Box = () => {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={ref}>
      <boxBufferGeometry />
      <meshBasicMaterial color="blue" />
    </mesh>
  );
};

const Wall = (props) => {
  const gltf = useLoader(GLTFLoader, climbing3)
  // const mesh = gltf.scene.children[0];
  const {setHover} = props

  return <primitive 
  onPointerOver={() => {
    setHover(true);
  }}
  onPointerOut={() => {
    setHover(false);
  }}
  scale={2}
  roughness={5}
  object={gltf.scene} position={[0, 0, 20]}/>
}

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  const {
    camera,
    gl: { domElement }
  } = useThree();

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame(state => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={true}
      maxAzimuthAngle={Math.PI / 2}
      maxPolarAngle={Math.PI}
      minAzimuthAngle={-Math.PI / 2}
      minPolarAngle={0}
    />
  );
};

function Test() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas style={{ background: "white" }} camera={{ position: [0, 0, 25] }}>
        <CameraControls/>
        <Wall/>
        <ambientLight args={['white', 0.8]} />
        <spotLight intensity={1.8} position={[0, 10, 80]} />
        <spotLight intensity={1.5} position={[-100, -100, -200]} />
        <axesHelper args={[10]} />
      </Canvas>
    </div>
  );
}

export default Test;