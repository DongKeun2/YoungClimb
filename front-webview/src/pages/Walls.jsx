import { Canvas, useFrame, Camera, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { MapControls, Stats } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import Orbit from '../components/Orbit'
import Wall_1_0 from '../assets/walls/Wall_1_0.glb'
import Wall_5_0 from '../assets/walls/Wall_5_0.glb'
import Wall_5_1 from '../assets/walls/Wall_5_1.glb'
import Wall_8_0 from '../assets/walls/Wall_8_0.glb'
import Wall_1_0_Load from '../assets/img/Wall_1_0_Load.png'
import Wall_5_0_Load from '../assets/img/Wall_5_0_Load.png'
import Wall_5_1_Load from '../assets/img/Wall_5_1_Load.png'
import Wall_8_0_Load from '../assets/img/Wall_8_0_Load.png'

import '../App.css'

const Cen1Wall0 = () => {
  const gltf = useLoader(GLTFLoader, Wall_1_0)
  
  return <primitive 
  scale={2}
  roughness={5}
  object={gltf.scene} position={[2, 0, 20]}/>
}

const Cen5Wall0 = () => {
  const gltf = useLoader(GLTFLoader, Wall_5_0)
  const mesh = gltf.scene.children[0];
  mesh.rotation.y += 0.25;

  return <primitive 
  scale={3}
  roughness={5}
  object={gltf.scene} position={[9, 3, 17]}/>
}


const Cen5Wall1 = () => {
  const gltf = useLoader(GLTFLoader, Wall_5_1)
  const mesh = gltf.scene.children[0];
  mesh.rotation.z -= 0.025;

  return <primitive 
  scale={5}
  roughness={5}
  object={gltf.scene} position={[0, 0, 13]}/>
}

const Cen8Wall0 = () => {
  const gltf = useLoader(GLTFLoader, Wall_8_0)
  const mesh = gltf.scene.children[0];
  mesh.rotation.y -= 0.25;

  return <primitive 
  scale={2}
  roughness={1.5}
  object={gltf.scene} position={[-3.5, 7,11]}/>
}

const CameraControls = () => {
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

const Loader = () =>{
  return (
    <div className="loading-container">
      <div id="loading"></div>
      <div id="loading-text">Loading...</div>
    </div>
  )
}


function Walls(props) {
  const {centerId, wallId} = props
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    setTimeout(()=>{setIsLoading(false)}, 3000)
  },[])

  if (centerId==='1' && wallId==='0'){
    return (
      <div style={{position:'relative', width: "100vw", height: "100vh", overflow:'hidden' }}>
      {isLoading?
        <>
          <div className="loadImgContainer">
            <img className="loadingImg" src={Wall_1_0_Load}/>
            <Loader/> 
          </div>
        </> 
        :<></>}
      <Canvas style={{ background: "white" }} camera={{ position: [0, 0, 25] }}>
        <CameraControls/>
        <Cen1Wall0/>
        <ambientLight args={['white', 0.8]} />
        <spotLight intensity={1.8} position={[0, 10, 80]} />
        <spotLight intensity={1.5} position={[-100, -100, -200]} />
        {/* <axesHelper args={[10]} /> */}
      </Canvas>
    </div>
    )
  } else if (centerId === '5' && wallId === '0'){
    return (
      <div style={{position:'relative', width: "100vw", height: "100vh",overflow:'hidden' }}>
      {isLoading?
        <div className="loadImgContainer">
          <img className="loadingImg" src={Wall_5_0_Load}/>
          <Loader/>
        </div>
        :<></>}
      <Canvas style={{ background: "white" }} camera={{ position: [0, 0, 25] }}>
        <CameraControls/>
        <Cen5Wall0/>
        <ambientLight args={['white', 0.8]} />
        <spotLight intensity={1.8} position={[0, 10, 80]} />
        <spotLight intensity={1.5} position={[-100, -100, -200]} />
        {/* <axesHelper args={[10]} /> */}
      </Canvas>
    </div>
    )
  } else if (centerId === '5' && wallId === '1'){
    return (
      <div style={{position:'relative', width: "100vw", height: "100vh",overflow:'hidden' }}>
      {isLoading?
        <div className="loadImgContainer">
          <img className="loadingImg" src={Wall_5_1_Load}/>
          <Loader/>
        </div>
        :<></>}
      <Canvas style={{ background: "white" }} camera={{ position: [0, 0, 25] }}>
        <CameraControls/>
        <Cen5Wall1/>
        <ambientLight args={['white', 0.8]} />
        <spotLight intensity={1.8} position={[0, 10, 80]} />
        <spotLight intensity={1.5} position={[-100, -100, -200]} />
        {/* <axesHelper args={[10]} /> */}
      </Canvas>
    </div>
    )
  } else if (centerId === '8' && wallId === '0'){
    return (
      <div style={{position:'relative', width: "100vw", height: "100vh",overflow:'hidden' }}>
      {isLoading?
        <div className="loadImgContainer">
          <img className="loadingImg" src={Wall_8_0_Load}/>
          <Loader/>
        </div>
        :<></>}
      <Canvas style={{ background: "white" }} camera={{ position: [0, 0, 25] }}>
        <CameraControls/>
        <Cen8Wall0/>
        <ambientLight args={['white', 0.8]} />
        <spotLight intensity={1.8} position={[0, 10, 80]} />
        <spotLight intensity={1.5} position={[-100, -100, -200]} />
        {/* <axesHelper args={[10]} /> */}
      </Canvas>
    </div>
    )
  }
  
  else{
    return (
      <div style={{position:'relative', width: "100vw", height: "100vh", overflow:'hidden' }}>
      {isLoading?
        <>
          <div className="loadImgContainer">
            <img className="loadingImg" src={Wall_1_0_Load}/>
            <Loader/>
          </div>
        </> 
        :<></>}
      <Canvas style={{ background: "white" }} camera={{ position: [0, 0, 25] }}>
        <CameraControls/>
        <Cen1Wall0/>
        <ambientLight args={['white', 0.8]} />
        <spotLight intensity={1.8} position={[0, 10, 80]} />
        <spotLight intensity={1.5} position={[-100, -100, -200]} />
        {/* <axesHelper args={[10]} /> */}
      </Canvas>
    </div>
    );

  }
}

export default Walls;