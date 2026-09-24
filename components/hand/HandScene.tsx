import {Suspense,useEffect,useState,memo} from 'react'
import {Canvas,useThree} from '@react-three/fiber'
import {OrbitControls,Environment,Lightformer} from '@react-three/drei'
import * as THREE from 'three'
import {motion,AnimatePresence} from 'framer-motion'
import HandModel from './HandModel'
import OrientationWidget from './OrientationWidget'
import ConnectionOverlay from './ConnectionOverlay'
function Rig(){const {camera,controls}=useThree() as any
 useEffect(()=>{const go=()=>{camera.position.set(1.5,2.5,4.5);controls?.target.set(0,0,.3);controls?.update()}
  go();addEventListener('rg-reset',go);return()=>removeEventListener('rg-reset',go)},[camera,controls]);return null}
function HandScene(){
 const [flash,setFlash]=useState(0),reset=()=>{dispatchEvent(new Event('rg-reset'));setFlash(f=>f+1)}
 useEffect(()=>{if(!flash)return;const t=setTimeout(()=>setFlash(0),1000);return()=>clearTimeout(t)},[flash])
 return <div className="relative w-full h-full" onDoubleClick={reset}>
 <Canvas shadows dpr={[1,2]} camera={{fov:45,position:[1.5,2.5,4.5]}} onCreated={({gl})=>{(gl as any).useLegacyLights=true}}>
  <color attach="background" args={['#0a0a0a']}/><fogExp2 attach="fog" args={['#0a0a0a',.08]}/>
  <ambientLight intensity={.15} color="#1a2a3a"/>
  <directionalLight position={[-3,4,2]} intensity={1.8} color="#40a0c0" castShadow shadow-mapSize={[2048,2048]} shadow-camera-left={-4} shadow-camera-right={4} shadow-camera-top={4} shadow-camera-bottom={-4}/>
  <directionalLight position={[2,1,1]} intensity={.3} color="#ffffff"/>
  <pointLight position={[-2,3,-1]} intensity={2.5} color="#0F6E5E" distance={6}/>
  <pointLight position={[0,-2,1]} intensity={.2} color="#0a3040" distance={4}/>
  <Suspense fallback={null}>
   <Environment resolution={64} environmentIntensity={.2}><Lightformer intensity={2} position={[0,4,2]} scale={[6,6,1]}/></Environment>
   <HandModel/>
  </Suspense>
  <mesh rotation-x={-Math.PI/2} position-y={-1.1} receiveShadow><planeGeometry args={[30,30]}/><shadowMaterial opacity={.35}/></mesh>
  <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI} minAzimuthAngle={-Infinity} maxAzimuthAngle={Infinity} minDistance={.5} maxDistance={12} zoomSpeed={1.2} enablePan panSpeed={.8} screenSpacePanning enableDamping dampingFactor={.05} rotateSpeed={.6} mouseButtons={{LEFT:THREE.MOUSE.ROTATE,MIDDLE:THREE.MOUSE.DOLLY,RIGHT:THREE.MOUSE.PAN}}/>
  <Rig/>
 </Canvas>
 <ConnectionOverlay/><OrientationWidget/>
 <motion.div initial={{opacity:1}} animate={{opacity:0}} transition={{delay:2,duration:1}} className="absolute bottom-3 left-8 font-mono text-[8pt] text-[#333] pointer-events-none">scroll to zoom  ·  drag to rotate  ·  right-drag or shift+drag to pan</motion.div>
 <AnimatePresence>{flash>0&&<motion.div initial={{opacity:1}} animate={{opacity:1}} exit={{opacity:0}} className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[9pt] text-[#0F6E5E] pointer-events-none">VIEW RESET</motion.div>}</AnimatePresence>
 <button aria-label="Reset view" onClick={reset} className="absolute bottom-16 right-4 w-8 h-8 rounded border border-[#2a2a2a] bg-[#161616]/80 text-[#555] hover:text-[#0F6E5E] flex items-center justify-center"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4"/></svg></button></div>}
export default memo(HandScene)
