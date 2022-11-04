import React from 'react'
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import climbing3 from '../assets/walls/climbing3.glb'


function Duck() {
  const gltf = useLoader(GLTFLoader, climbing3)
  return <primitive object={gltf.scene} position={[0, 0, 0]} />
}

function Box() {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" transparent opacity={0.5} />
    </mesh>
  )
}

function Test2() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.8} position={[300, 300, 400]} />
        <Duck />
      </Canvas>
    </>
  )
}

export default Test2