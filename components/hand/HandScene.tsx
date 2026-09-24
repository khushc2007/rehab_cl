import {Suspense} from 'react'
import {Canvas} from '@react-three/fiber'
import {OrbitControls,Environment,Lightformer} from '@react-three/drei'
import HandModel from './HandModel'
import OrientationWidget from './OrientationWidget'
import ConnectionOverlay from './ConnectionOverlay'
const D=Math.PI/180
export default function HandScene(){return <div className="relative w-full h-full">
 <Canvas shadows dpr={[1,2]} camera={{fov:45,position:[0,1.5,4]}} onCreated={({gl,camera})=>{(gl as any).useLegacyLights=true;camera.lookAt(0,0,0)}}>
  <color attach="background" args={['#0a0a0a']}/><fogExp2 attach="fog" args={['#0a0a0a',.08]}/>
  <ambientLight intensity={.3}/>
  <directionalLight position={[3,5,2]} intensity={1.4} color="#ffe8d0" castShadow shadow-mapSize={[2048,2048]} shadow-camera-left={-4} shadow-camera-right={4} shadow-camera-top={4} shadow-camera-bottom={-4}/>
  <directionalLight position={[-3,2,1]} intensity={.6} color="#b0c8ff"/>
  <pointLight position={[0,-2,2]} intensity={.8} color="#0F6E5E" distance={8}/>
  <pointLight position={[0,-3,0]} intensity={.15} color="#ffffff"/>
  <Suspense fallback={null}>
   <Environment resolution={64} environmentIntensity={.35}><Lightformer intensity={2} position={[0,4,2]} scale={[6,6,1]}/><Lightformer intensity={1} position={[-4,1,0]} scale={[3,3,1]}/></Environment>
   <HandModel/>
  </Suspense>
  <mesh rotation-x={-Math.PI/2} position-y={-1.1} receiveShadow><planeGeometry args={[12,12]}/><shadowMaterial opacity={.35}/></mesh>
  <OrbitControls enableDamping dampingFactor={.08} enablePan={false} autoRotate={false} minPolarAngle={Math.PI/4} maxPolarAngle={Math.PI/1.8} minAzimuthAngle={-35*D} maxAzimuthAngle={35*D} minDistance={2.5} maxDistance={7}/>
 </Canvas>
 <ConnectionOverlay/><OrientationWidget/></div>}
