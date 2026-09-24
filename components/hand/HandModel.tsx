import {useRef,useMemo,useEffect} from 'react'
import {useFrame} from '@react-three/fiber'
import {Html,RoundedBox} from '@react-three/drei'
import * as THREE from 'three'
import {sensorRef,smoothed,useHand} from '@/store/handStore'
const D=Math.PI/180,S=1.9 // S: radii scaled up so fingers read as ~1/4 palm width
// Fingers point -Z (away from camera), forearm extends +Z toward camera, palm down, thumb on -X (right hand, seen from wrist).
const FING=[{x:-.6,L:[.9,.65,.42],R:[.095,.085,.072],w:[.4,.4,.2]},{x:-.2,L:[1,.7,.45],R:[.1,.09,.075],w:[.4,.4,.2]},
{x:.2,L:[.92,.66,.43],R:[.093,.083,.07],w:[.4,.4,.2]},{x:.6,L:[.68,.5,.33],R:[.078,.068,.058],w:[.4,.4,.2]}]
const THUMB={x:-.85,L:[.7,.5],R:[.11,.09],w:[0,.5]}
function useSkin(){
 const m=useMemo(()=>{
  const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d')!
  for(let i=0;i<5000;i++){g.fillStyle=`hsl(0,0%,${35+Math.random()*35}%)`;g.fillRect(Math.random()*256,Math.random()*256,2,2)}
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(3,3)
  const k=(color:string)=>new THREE.MeshPhysicalMaterial({color,roughness:.6,metalness:0,bumpMap:t,bumpScale:.5,sheen:.6,sheenColor:new THREE.Color('#ff9a7a'),sheenRoughness:.5})
  return {t,skin:k('#c68642'),joint:k('#d4956a'),nail:new THREE.MeshStandardMaterial({color:'#e8d5c0',roughness:.3,metalness:.05})}
 },[])
 useEffect(()=>()=>{m.t.dispose();m.skin.dispose();m.joint.dispose();m.nail.dispose()},[m])
 return m}
function Chain({c,i,idx,rots,labs,mat}:any){
 const {L,R}=c,r0=R[i]*S,r1=(R[i+1]??R[i]*.8)*S,last=i===L.length-1
 return <group ref={(g:any)=>{rots[i]=g}} position-y={i?L[i-1]:0}>
  <mesh castShadow material={mat.joint} scale={[1.1,1,.85]}><sphereGeometry args={[r0*1.02,16,16]}/></mesh>
  <mesh castShadow material={mat.skin} position-y={L[i]/2} scale={[1,1,.88]}><cylinderGeometry args={[r1,r0,L[i],16]}/></mesh>
  {last?<group position-y={L[i]}>
    <mesh castShadow material={mat.skin} scale={[1,1,.88]}><sphereGeometry args={[r1,16,16]}/></mesh>
    <mesh material={mat.nail} position={[0,-L[i]*.35,(r0+r1)/2*.86]}><boxGeometry args={[r1*1.6,L[i]*.7,.03]}/></mesh>
    <Html center style={{pointerEvents:'none'}} position={[0,.25,.3]}><span ref={(e:any)=>{labs[idx]=e}} className="font-mono text-[10pt] text-[#0F6E5E]" style={{opacity:0}}/></Html>
  </group>:<Chain c={c} i={i+1} idx={idx} rots={rots} labs={labs} mat={mat}/>}
 </group>}
export default function HandModel(){
 const mat=useSkin(),root=useRef<THREE.Group>(null),glow=useRef<THREE.PointLight>(null),splay=useRef<THREE.Group>(null)
 const rots=useRef<any[][]>([[],[],[],[],[]]).current,labs=useRef<any[]>([]).current,sm=useRef({f:[0,0,0,0,0],roll:0,pitch:0,yaw:0,e:0}).current
 useFrame((st,dt)=>{
  const k=1-Math.pow(1-useHand.getState().sim.speed,Math.min(dt,.1)*60),d=sensorRef.current,L=THREE.MathUtils.lerp
  for(let i=0;i<5;i++){sm.f[i]=L(sm.f[i],d.f[i],k)
   const w=(i<4?FING[i]:THUMB).w;w.forEach((x,j)=>{if(rots[i][j])rots[i][j].rotation.x=-sm.f[i]*D*x})
   const el=labs[i];if(el){el.textContent=Math.round(sm.f[i])+'°';el.style.opacity=String(Math.min(1,Math.max(0,(sm.f[i]-5)/10)))}}
  if(splay.current)splay.current.rotation.y=35*D-sm.f[4]*D*.5
  sm.roll=L(sm.roll,d.roll,k);sm.pitch=L(sm.pitch,d.pitch,k);sm.yaw=L(sm.yaw,d.yaw,k);sm.e=L(sm.e,d.e,k)
  Object.assign(smoothed,{roll:sm.roll,pitch:sm.pitch,yaw:sm.yaw})
  root.current?.rotation.set(sm.pitch*D,sm.yaw*D,sm.roll*D)
  const on=sm.e>30;if(glow.current)glow.current.intensity=on?sm.e/100*1.5:0
  const fog=st.scene.fog as THREE.FogExp2;if(fog)fog.density=L(fog.density,.08+(on?sm.e/100*.04:0),.05)})
 return <group ref={root} scale={.5}>
  <RoundedBox args={[1.8,.35,2.2]} radius={.16} smoothness={4} castShadow material={mat.skin}/>
  <mesh castShadow material={mat.skin} position={[0,0,1.15]} scale={[1,.85,1]}><sphereGeometry args={[.52,20,20]}/></mesh>
  <mesh castShadow material={mat.skin} position={[0,0,1.8]} rotation-x={Math.PI/2} scale={[1.05,1,.9]}><cylinderGeometry args={[.7,.55,2.8,20]}/></mesh>
  <pointLight ref={glow} position={[0,0,2]} color="#0F6E5E" distance={3} intensity={0}/>
  {FING.map((c,i)=><group key={i} position={[c.x,0,-1.1]} rotation-x={-Math.PI/2}><Chain c={c} i={0} idx={i} rots={rots[i]} labs={labs} mat={mat}/></group>)}
  <group ref={splay} position={[THUMB.x,0,-.2]} rotation-y={35*D}><group rotation-x={-Math.PI/2}><Chain c={THUMB} i={0} idx={4} rots={rots[4]} labs={labs} mat={mat}/></group></group>
 </group>}
