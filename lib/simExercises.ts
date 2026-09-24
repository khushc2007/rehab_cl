export interface SimEx{label:string;f:number[];emg:number;pitch:number;roll:number;yaw:number;autoFn:'flex'|'extend'|'isolate'|'grip'|'pinch'|'wrist'}
export const EXERCISES:Record<string,SimEx>={
 FINGER_FLEXION:{label:'Finger Flexion',f:[70,75,70,65,25],emg:55,pitch:0,roll:0,yaw:0,autoFn:'flex'},
 FINGER_EXTENSION:{label:'Finger Extension',f:[0,0,0,0,5],emg:28,pitch:0,roll:0,yaw:0,autoFn:'extend'},
 INDIVIDUAL:{label:'Individual Isolation',f:[75,0,0,0,5],emg:40,pitch:0,roll:0,yaw:0,autoFn:'isolate'},
 POWER_GRIP:{label:'Power Grip',f:[85,90,88,82,65],emg:88,pitch:10,roll:0,yaw:0,autoFn:'grip'},
 PINCH_GRIP:{label:'Pinch Grip',f:[55,5,5,5,60],emg:60,pitch:0,roll:0,yaw:0,autoFn:'pinch'},
 WRIST_FLEXION:{label:'Wrist Flexion',f:[10,10,10,10,10],emg:55,pitch:35,roll:0,yaw:0,autoFn:'wrist'}}
// Auto-cycle animation for one exercise at time t (seconds). Returns unnoised finger angles, EMG and wrist pitch.
export function autoFrame(key:string,t:number){
 const ex=EXERCISES[key]??EXERCISES.FINGER_FLEXION;let f=[...ex.f],emg=ex.emg,pitch=ex.pitch
 switch(ex.autoFn){
  case 'flex':{const p=t%2.8,a=p<.8?0:p<2?Math.min(1,(p-.8)/.6):1;f=ex.f.map(v=>v*a);emg=ex.emg*(.2+a*.8)+Math.sin(t*12)*3;break}
  case 'extend':{const p=t%2.8,a=p<.8?1:p<2?1-Math.min(1,(p-.8)/.6):0,c=[70,75,70,65,25];f=c.map((v,i)=>v*a+ex.f[i]*(1-a));emg=ex.emg*(.15+a*.7)+Math.sin(t*10)*2;break}
  case 'isolate':{const i=Math.floor((t%12)/3),p=t%3,a=p<.3?p/.3:p<2.2?1:1-(p-2.2)/.5;f=[0,0,0,0,5];f[i]=75*Math.max(0,a);emg=ex.emg*(.1+Math.max(0,a)*.8)+Math.sin(t*15)*4;break}
  case 'grip':{const p=t%4.5,a=p<.6?p/.6:p<3?1:p<3.5?1-(p-3)/.5:0;f=ex.f.map(v=>v*a);emg=ex.emg*(.1+a*.9)+Math.sin(t*8)*5;pitch=ex.pitch*a;break}
  case 'pinch':{const p=t%3,a=p<.5?p/.5:p<2.2?1:1-(p-2.2)/.4;f=[55*a,5*a,5*a,5*a,60*a];emg=ex.emg*(.2+a*.7)+Math.sin(t*10)*3;break}
  case 'wrist':{const p=t%4;pitch=p<1?35*Math.sin(p*Math.PI):p<2?0:p<3?-25*Math.sin((p-2)*Math.PI):0;emg=ex.emg*(.3+Math.abs(pitch/35)*.6)+Math.sin(t*8)*4;break}}
 return {f,emg,pitch}}
