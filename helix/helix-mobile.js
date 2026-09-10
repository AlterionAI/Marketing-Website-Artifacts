/* Helix mobile engine — v1 (from prototype v2, 2026-09-10)
 * Four beat-locked scenes, one canvas each: #sth (intro), #st0, #st1, #st2.
 * Each replays its build-in when it scrolls into view and sleeps off-screen.
 * Same skeleton and ids as aquila-mobile.js; canvas instead of SVG.
 */
(function(){
/* Webflow Designer safety: mark that JS is live, so the .blk reveal in
   helix-mobile.css stays inert in the Designer canvas. */
document.documentElement.classList.add('js-anim');

function Scene(cv,FIXED,OPT){
const mctx=cv.getContext('2d'); const oc=document.createElement('canvas'), octx=oc.getContext('2d'); let ctx=mctx;
const S=100, OR='#D24A2F', OG='#DB3926', GL='#8E8B86', G1='#535855', GREYD='#3A3D3A', GREYM='#6E6B66', BG='#0B0B0C';
const R={yaw:-43,pitch:46,cov:0.9,gut:10.5,bh:21.5,st:38,lift:2.5,wire:0.39,xray:0.55,wop:0.79,
         cgo:3,cgv:7,cgt:30,cgm:11,cgop:0.33,cgw:0.8,er:1.7,amp:2.5,spd:1.9,yawamp:4,yawspd:2,breathe:0.06,pulse:0.52,rot:1,ltone:0.49};
const T=R.st, bw=(S*R.cov-2*R.gut)/3, off=(S-S*R.cov)/2, HB=T+R.lift, HT=HB+R.bh;
const AG_OUT_P=new Path2D('M0.527283 28.0084L11.6482 0.717409C11.7514 0.464044 12.0937 0.422918 12.258 0.641638L29.7885 23.9697C29.9498 24.1844 29.8233 24.4963 29.5573 24.5331L0.901607 28.4902C0.632953 28.5273 0.42494 28.2596 0.527283 28.0084Z');
const AG_IN_P=new Path2D('M0.46516 28.5732L14.8031 16.8075M14.8031 16.8075L29.9821 24.2729M14.8031 16.8075L12.0474 0.334114');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- geometry
// three long slabs running the full length of the layer (the buyer's agent estate), side by side across u
const bounds=[]; for(let i=0;i<3;i++){const u0=off+i*(bw+R.gut);bounds.push([u0,u0+bw,off,S-off,i]);}
const BOXES=[[0,S,0,S,0,T]].concat(bounds.map(b=>[b[0],b[1],b[2],b[3],HB,HT]));
function cageNodes(){const o=R.cgo,N={};
  [[-o,-o],[S+o,-o],[S+o,S+o],[-o,S+o]].forEach((p,i)=>{N['b'+i]=[p[0],p[1],-R.cgv];N['t'+i]=[p[0],p[1],HT+R.cgt]});
  [[S/2,-o-R.cgm],[S+o+R.cgm,S/2],[S/2,S+o+R.cgm],[-o-R.cgm,S/2]].forEach((p,i)=>{N['m'+i]=[p[0],p[1],HT/2]});
  return N;}
const NODES=cageNodes();
// experts minted in beat 3: float outside the cage, join the network
const mid3=(a,b)=>[0,1,2].map(i=>(a[i]+b[i])/2);
const EXTRA={x0:mid3(NODES.t0,NODES.t1),                          // on the front-left top edge
             x1:mid3(NODES.t1,NODES.t2),                          // on the front-right top edge
             x2:[NODES.t3[0]-7,NODES.t3[1]-7,NODES.t3[2]+9],      // just above the top-back expert
             x3:[NODES.b0[0]-11,NODES.b0[1]-7,NODES.b0[2]-4]};     // just outside the left-bottom expert
const ON_EDGE={x0:['t0','t1'],x1:['t1','t2']};                   // extras that sit on an existing edge (the edge is kept whole)
const ALL=Object.assign({},NODES,EXTRA);
const EDGES=[];for(let i=0;i<4;i++){const j=(i+1)%4;EDGES.push(['b'+i,'b'+j],['t'+i,'t'+j],['b'+i,'m'+i],['m'+i,'t'+j],['t'+i,'m'+i],['m'+i,'b'+j]);}
const seeds={};(function(){let i=0;for(const k of Object.keys(ALL)){seeds[k]=[i*1.7,i*2.9,i*0.8,0.9+0.25*Math.sin(i*1.3),0.7+0.2*Math.cos(i*0.7),1.1+0.3*Math.sin(i*2.1)];i++}})();

// ---------- beat 3 network: straight grey lines, expert→expert and expert→product (centres + corners)
// beat 3 network: hand-picked so every line runs outside or in front of the stack; drawn in as a chain, one line leading to the next
const NET3=[['t3','x2'],['x2','t0'],['x2','t2'],['x1','m1'],['x1','m2'],['x0','m0'],['x0','x1'],['m0','x3'],['x3','t0'],['x3','b0']]
  .map(([a,b],i)=>({a,b,t0:0.35+i*0.2}));   // faster cadence (was 0.6 + i*0.42)
const LINE_T=0.26; // seconds for one line to draw

// ---------- state (what tweens between beats)
const CENTER=[S/2,S/2,HT*0.45];
const CAGE1='#D24A2F'; // beat-1 cage colour (alt build: orange)
const B1={yaw:R.yaw,pitch:R.pitch,zoom:1.05,tx:CENTER[0],ty:CENTER[1],tz:CENTER[2],motion:1,warm:1,focus:0,fade:0,net:0,b4:0,cy:0.52,cx:0.41,xr:R.xray,sh:1,slabDark:1,exScale:2.25,cageWhite:1,cageW:3.0,cageOp:0.85,labels:1};
const T2=NODES['t2'];
const B2={yaw:R.yaw,pitch:R.pitch,zoom:10,tx:T2[0],ty:T2[1],tz:T2[2],motion:0,warm:1,focus:1,fade:1,net:0,b4:0,cy:0.5,cx:0.5,xr:R.xray,sh:1,slabDark:0,exScale:1,cageWhite:0,cageW:1,cageOp:R.cgop,labels:0};
const B3=Object.assign({},B1,{warm:1,net:1,xr:0,sh:1,slabDark:1,exScale:1.2,cageWhite:1,cageW:1.2,cageOp:0.55,labels:0}); // beat-1 camera; cage thin and dim so the network reads as the new thing
const CB=bounds[1], CC=[(CB[0]+CB[1])/2,(CB[2]+CB[3])/2,(HB+HT)/2];
const B4={yaw:R.yaw,pitch:R.pitch,zoom:1.15,tx:S/2,ty:S/2,tz:(HB+HT)/2,motion:0,warm:1,focus:0,fade:1,net:0,b4:1,cy:0.5,cx:0.38,xr:R.xray,sh:0.82,slabDark:0,exScale:1,cageWhite:0,cageW:1,cageOp:R.cgop,labels:1};
const BEATS=[B1,B2,B3,B4];
BEATS.forEach(B=>{B.zoom*=(OPT.mz||1);if(OPT.cx!==undefined)B.cx=OPT.cx;if(OPT.cy!==undefined)B.cy=OPT.cy;});
let cur=Object.assign({},BEATS[FIXED]), from=Object.assign({},BEATS[FIXED]), to=BEATS[FIXED], tw0=-1, TW=0.9;
let beat=FIXED, beatT0=performance.now(), drawT0=performance.now();
let running=false, raf=0;
const eoc=u=>{u=Math.min(1,Math.max(0,u));return 1-Math.pow(1-u,3)};
function lerp(a,b,t){return a+(b-a)*t}
function ease(t){return t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
function setBeat(b){ if(b===beat) return; if(b===0) drawT0=performance.now(); beat=b; from=Object.assign({},cur); to=BEATS[Math.max(0,Math.min(3,b))]; tw0=performance.now(); beatT0=performance.now(); }

// ---------- camera
let W=1,H=1,px=1;
function camDir(){const a=cur.yaw*Math.PI/180,b=cur.pitch*Math.PI/180;return [-Math.sin(a)*Math.cos(b),-Math.cos(a)*Math.cos(b),Math.sin(b)]}
function proj(u,v,h,yawExtra,scale){yawExtra=yawExtra||0;scale=scale||1;
  const cx=(u-cur.tx)*scale, cy=(v-cur.ty)*scale, cz=(h-cur.tz)*scale;
  const a=cur.yaw*Math.PI/180+yawExtra, b=cur.pitch*Math.PI/180;
  const x=cx*Math.cos(a)-cy*Math.sin(a), y=cx*Math.sin(a)+cy*Math.cos(a);
  const d=y*Math.cos(b)-cz*Math.sin(b), up=y*Math.sin(b)+cz*Math.cos(b);
  const base=Math.min(W,H)/300*cur.zoom;
  return {x:W*(cur.cx===undefined?0.5:cur.cx)+x*base, y:H*cur.cy-up*base, d:d};}
function hitBox(p,box,cam){let t0=1e-6,t1=1e9;for(let k=0;k<3;k++){const lo=box[2*k],hi=box[2*k+1],d=cam[k];
  if(Math.abs(d)<1e-12){if(p[k]<lo||p[k]>hi)return false}else{let ta=(lo-p[k])/d,tb=(hi-p[k])/d;if(ta>tb){const s=ta;ta=tb;tb=s}t0=Math.max(t0,ta);t1=Math.min(t1,tb);if(t0>t1)return false}}return t1>t0}
function hidden(p,cam){const q=[p[0]+cam[0]*0.35,p[1]+cam[1]*0.35,p[2]+cam[2]*0.35];for(const b of BOXES)if(hitBox(q,b,cam))return true;return false}
function hull(P){const p=P.slice().sort((a,b)=>a.x-b.x||a.y-b.y);const cr=(o,a,b)=>(a.x-o.x)*(b.y-o.y)-(a.y-o.y)*(b.x-o.x);
  const lo=[];for(const q of p){while(lo.length>=2&&cr(lo[lo.length-2],lo[lo.length-1],q)<=0)lo.pop();lo.push(q)}
  const up=[];for(let i=p.length-1;i>=0;i--){const q=p[i];while(up.length>=2&&cr(up[up.length-2],up[up.length-1],q)<=0)up.pop();up.push(q)}
  return lo.slice(0,-1).concat(up.slice(0,-1));}
function area2(p){let a=0;for(let i=0;i<4;i++){const q=p[i],r=p[(i+1)%4];a+=q.x*r.y-r.x*q.y}return a/2}
function box(u0,u1,v0,v1,h0,h1){const c=(a,b,c_)=>[[u0,u1][a],[v0,v1][b],[h0,h1][c_]];
  return [[c(0,0,0),c(0,1,0),c(1,1,0),c(1,0,0)],[c(0,0,1),c(1,0,1),c(1,1,1),c(0,1,1)],[c(0,0,0),c(1,0,0),c(1,0,1),c(0,0,1)],
          [c(0,1,0),c(0,1,1),c(1,1,1),c(1,1,0)],[c(0,1,0),c(0,0,0),c(0,0,1),c(0,1,1)],[c(1,0,0),c(1,1,0),c(1,1,1),c(1,0,1)]];}
function drawXray(a,b,cam,op,f,lw,xr){ // draws a→b; runs behind the stack at op*xr. Visibility boundaries are bisected so the cut is exact, not sampled.
  const n=32;ctx.lineWidth=lw;const at=t=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];const vis=[];
  for(let i=0;i<=n;i++)vis.push(!hidden(at(i/n),cam));
  const edge=(i,j)=>{let lo=i/n,hi=j/n;const vlo=vis[i];for(let k=0;k<7;k++){const m=(lo+hi)/2;if(!hidden(at(m),cam)===vlo)lo=m;else hi=m}return (lo+hi)/2};
  let i=0,t0=0;while(i<n){let j=i;while(j<n&&vis[j]===vis[i])j++;const t1=(j<n)?edge(j-1,j):1;const o=vis[i]?op:op*xr;
    if(o>0.02&&t1>t0){const p0=f(at(t0)),p1=f(at(t1));ctx.globalAlpha=o;ctx.beginPath();ctx.moveTo(p0.x,p0.y);ctx.lineTo(p1.x,p1.y);ctx.stroke()}t0=t1;i=j}ctx.globalAlpha=1;}
const DV=[[1.7320508075688772, 0, 0], [-1.7320508075688772, 0, 0], [0, 1.7320508075688772, 0], [0, -1.7320508075688772, 0], [0, 0, 1.7320508075688772], [0, 0, -1.7320508075688772]], DE=[[0, 2], [0, 3], [0, 4], [0, 5], [1, 2], [1, 3], [1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5]]; // octahedron (circumradius sqrt3, same as the former cube / dodecahedron)
function rotPts(c,r,rot){const [ax,ay,az]=rot;return DV.map(([sx,sy,sz])=>{let x=sx,y=sy,z=sz;
    let y2=y*Math.cos(ax)-z*Math.sin(ax),z2=y*Math.sin(ax)+z*Math.cos(ax);y=y2;z=z2;
    let x2=x*Math.cos(ay)+z*Math.sin(ay);z2=-x*Math.sin(ay)+z*Math.cos(ay);x=x2;z=z2;
    x2=x*Math.cos(az)-y*Math.sin(az);y2=x*Math.sin(az)+y*Math.cos(az);x=x2;y=y2;
    return [c[0]+x*r,c[1]+y*r,c[2]+z*r]})}
function miniCube(c,r,rot,f,col,lw,g,occ){ // name kept; draws a wireframe octahedron. g(i) = 0..1 growth of edge i from its midpoint (draw-in); occ = camera dir → edges are cut where they pass behind the stack
  const W3=rotPts(c,r,rot);ctx.strokeStyle=col;ctx.lineWidth=lw;ctx.lineJoin='round';
  if(occ){const keep=ctx.globalAlpha;DE.forEach(([a,b],i)=>{const k=g?g(i):1;if(k<=0)return;const A=W3[a],B=W3[b],m=[0,1,2].map(q=>(A[q]+B[q])/2);
      drawXray(m.map((v,q)=>v+(A[q]-v)*k),m.map((v,q)=>v+(B[q]-v)*k),occ,keep,f,lw,0)});ctx.globalAlpha=keep;return;}
  const V=W3.map(f);ctx.beginPath();
  DE.forEach(([a,b],i)=>{const k=g?g(i):1;if(k<=0)return;const A=V[a],B=V[b],mx=(A.x+B.x)/2,my=(A.y+B.y)/2;ctx.moveTo(mx+(A.x-mx)*k,my+(A.y-my)*k);ctx.lineTo(mx+(B.x-mx)*k,my+(B.y-my)*k)});ctx.stroke();}
// ---------- agents: tetrahedra living inside the three estate slabs
const TV=[[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]], TE=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
function rotT(c,r,rot){const [ax,ay,az]=rot;return TV.map(([sx,sy,sz])=>{let x=sx,y=sy,z=sz;
    let y2=y*Math.cos(ax)-z*Math.sin(ax),z2=y*Math.sin(ax)+z*Math.cos(ax);y=y2;z=z2;
    let x2=x*Math.cos(ay)+z*Math.sin(ay);z2=-x*Math.sin(ay)+z*Math.cos(ay);x=x2;z=z2;
    x2=x*Math.cos(az)-y*Math.sin(az);y2=x*Math.sin(az)+y*Math.cos(az);x=x2;y=y2;
    return [c[0]+x*r,c[1]+y*r,c[2]+z*r]})}
function miniTetra(c,r,rot,f,col,lw,cam,op,xr){ // wireframe tetrahedron; x-rayed where it sits inside a slab
  const W3=rotT(c,r,rot);ctx.strokeStyle=col;ctx.lineJoin='round';ctx.lineWidth=lw;
  if(cam){TE.forEach(([a,b])=>drawXray(W3[a],W3[b],cam,op,f,lw,xr));return;}
  const V=W3.map(f);ctx.globalAlpha=op;ctx.beginPath();
  TE.forEach(([a,b])=>{ctx.moveTo(V[a].x,V[a].y);ctx.lineTo(V[b].x,V[b].y)});ctx.stroke();ctx.globalAlpha=1;}
// four per slab, spread along the slab's long axis; positions are slab-relative so they follow the beat-4 shrink
const AGENTS=[];for(let i=0;i<3;i++)for(let j=0;j<4;j++){const n=i*4+j;
  AGENTS.push({slab:i,fu:0.30+0.40*((n*0.37)%1),fv:0.13+j*0.245+0.05*((n*0.61)%1),fh:0.34+0.32*((n*0.53)%1),
               ph:[n*1.7,n*2.3,n*0.9],sp:[0.9+0.2*Math.sin(n),0.8+0.2*Math.cos(n*1.3),1.1+0.2*Math.sin(n*2.1)]})}
const AG_R=2.6;
function agentWorld(a,t,mo,SB){const B=SB(bounds[a.slab]);
  return [B[0]+(B[1]-B[0])*a.fu + 0.9*mo*Math.sin(t*0.23*a.sp[0]+a.ph[0]),
          B[2]+(B[3]-B[2])*a.fv + 1.6*mo*Math.sin(t*0.19*a.sp[1]+a.ph[1]),
          HB+(HT-HB)*a.fh       + 1.1*mo*Math.sin(t*0.27*a.sp[2]+a.ph[2])]}
function agentRot(a){return [spinAcc*0.30+a.ph[0], spinAcc*0.24+a.ph[1], spinAcc*0.18+a.ph[2]]}
function expertSolid(c,r,rot,f,col,op){ // filled silhouette of an octahedron (experts on the wiring)
  const Hh=hull(rotPts(c,r,rot).map(f));ctx.fillStyle=col;ctx.globalAlpha=op;ctx.beginPath();Hh.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();ctx.fill();ctx.globalAlpha=1;}
function mix(c1,c2,t){const p=s=>s[0]==='#'?[parseInt(s.slice(1,3),16),parseInt(s.slice(3,5),16),parseInt(s.slice(5,7),16)]:s.match(/\d+/g).map(Number);const a=p(c1),b=p(c2);
  return 'rgb('+a.map((v,i)=>Math.round(v+(b[i]-v)*t)).join(',')+')';}

let spinAcc=0, lastT=null;

// ---------- frame
function frame(ts){
  const st=cv.parentElement.getBoundingClientRect();
  px=devicePixelRatio||1; W=Math.max(1,Math.round(st.width*px)); H=Math.max(1,Math.round(st.height*px));
  if(cv.width!==W||cv.height!==H){cv.width=W;cv.height=H;oc.width=W;oc.height=H}
  mctx.fillStyle=BG;mctx.fillRect(0,0,W,H);
  // everything except the focus expert renders offscreen so it can fade as one
  ctx=octx;ctx.clearRect(0,0,W,H);
  // tween
  if(tw0>=0){const k=ease(Math.min(1,(ts-tw0)/(TW*1000)));for(const key in to)cur[key]=lerp(from[key],to[key],k);if(k>=1)tw0=-1;}
  const t=ts/1000, tb=(ts-beatT0)/1000, dIn=(beat===0&&!reduced)?(ts-drawT0):1e9; // ms since beat 1 began drawing
  const hN=h=>Math.min(1,Math.max(0,(h+R.cgv)/(HT+R.cgt+R.cgv))); // 0 bottom of cage .. 1 top
  const edgeDelay=(a,b)=>350+hN((a[2]+b[2])/2)*1100, nodeDelay=p=>250+hN(p[2])*1100;
  if(lastT===null)lastT=ts; const dt=(ts-lastT)/1000; lastT=ts;
  if(!reduced) spinAcc+=dt;
  const mo=reduced?0:cur.motion;
  const yawExtra=(R.yawamp*Math.PI/180)*Math.sin(t*0.09*R.yawspd)*mo, scale=1+R.breathe*Math.sin(t*0.13*R.spd)*mo;
  const cam=camDir();
  const SB=b=>{const s=cur.sh===undefined?1:cur.sh,c=S/2;return [c+(b[0]-c)*s,c+(b[1]-c)*s,c+(b[2]-c)*s,c+(b[3]-c)*s,b[4]]}; // slabs shrunk about the centre (beat 4)
  const cageCol=mix(mix(GREYD,GREYM,cur.warm),CAGE1,cur.cageWhite), expCol=mix(GREYD,OR,cur.warm), slabStroke=mix(GL,'#3A3D3A',cur.slabDark);
  // The cage's sway (yaw) and breathe (scale) are applied to its WORLD geometry, about the composition centre, so the
  // occlusion test and the drawing see the same positions. (Previously they were applied only in projection, so the
  // cut points against the slabs were computed for an unswayed cage and drifted as it moved.)
  const pf=w=>proj(w[0],w[1],w[2]);
  const sway=p=>{const cx=S/2,cy=S/2,cz=HT*0.45;const x=(p[0]-cx)*scale,y=(p[1]-cy)*scale,z=(p[2]-cz)*scale;const c=Math.cos(yawExtra),s=Math.sin(yawExtra);return [cx+x*c-y*s,cy+x*s+y*c,cz+z]};
  // drifted node positions
  const Wd={};for(const k in ALL){const p=ALL[k],s=seeds[k];
    Wd[k]=sway([p[0]+R.amp*mo*Math.sin(t*0.21*R.spd*s[3]+s[0]),p[1]+R.amp*mo*Math.sin(t*0.17*R.spd*s[4]+s[1]),p[2]+R.amp*0.8*mo*Math.sin(t*0.26*R.spd*s[5]+s[2])]);}
  const dc=proj(S/2,S/2,HT/2).d;
  const isFront=k=>pf(Wd[k]).d<dc;
  // cage (back half)
  ctx.strokeStyle=cageCol;
  const trim=(a,b,ta,tb)=>{const d=[b[0]-a[0],b[1]-a[1],b[2]-a[2]];const L=Math.hypot(d[0],d[1],d[2]);if(L<=ta+tb+1e-3)return null;const u=d.map(v=>v/L);
    return [[a[0]+u[0]*ta,a[1]+u[1]*ta,a[2]+u[2]*ta],[b[0]-u[0]*tb,b[1]-u[1]*tb,b[2]-u[2]*tb]]};
  // beat 3: once the network has drawn (~5s), the cage itself thickens up to the network weight over the next 2s
  const cageUp=(cur.net>0.5&&!reduced)?eoc((tb-2.7)/1.2)*cur.net:(reduced&&cur.net>0.5?1:0);
  const exR=R.er*cur.exScale*1.45; // surface of the expert (dodecahedron ~ circumradius sqrt3*r; inradius ~1.1*r)
  const cageLines=(front)=>{for(const [a,b] of EDGES){const f=isFront(a)&&isFront(b);if(front!==f)continue;const s=trim(Wd[a],Wd[b],exR,exR);if(!s)continue;const g=eoc((dIn-edgeDelay(Wd[a],Wd[b]))/520);if(g<=0)continue;const m=[0,1,2].map(i=>(s[0][i]+s[1][i])/2);drawXray(m.map((v,i)=>v+(s[0][i]-v)*g),m.map((v,i)=>v+(s[1][i]-v)*g),cam,cur.cageOp+(0.9-cur.cageOp)*cageUp,pf,R.cgw*px*(cur.cageW+(2.5-cur.cageW)*cageUp),0)}};
  // services layer
  const drawBox=(u0,u1,v0,v1,h0,h1,fill,fop,gop)=>{const V=[];for(const u of[u0,u1])for(const v of[v0,v1])for(const h of[h0,h1])V.push(proj(u,v,h));const Hh=hull(V);
    if(fill){ctx.beginPath();Hh.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();ctx.fillStyle=fill;ctx.globalAlpha=gop*fop;ctx.fill()}
    ctx.globalAlpha=gop;const E=[[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]];ctx.strokeStyle=G1;ctx.lineWidth=0.8*px;ctx.beginPath();
    for(const [a,c] of E){ctx.moveTo(V[a].x,V[a].y);ctx.lineTo(V[c].x,V[c].y)}ctx.stroke();ctx.globalAlpha=1;};
  drawBox(0,S,0,S,0,T,'#080808',0.9,R.ltone);
  {const ins=3.5,g=4.0,bwid=(S-2*ins-g)/2;for(let k=0;k<2;k++){const u0=ins+k*(bwid+g);drawBox(u0,u0+bwid,ins,S-ins,T*0.08,T*0.92,'#0D0D0D',0.85,R.ltone*1.05)}}
  // products (solid grey)
  const faces=[];for(const b0 of bounds){const b=SB(b0);const od=proj((b[0]+b[1])/2,(b[2]+b[3])/2,(HB+HT)/2).d;box(b[0],b[1],b[2],b[3],HB,HT).forEach(q=>faces.push({q,od}))}
  const drawn=[];for(const F of faces){if(cur.b4>0.5)continue;const pts=F.q.map(p=>proj(p[0],p[1],p[2]));if(area2(pts)>=-0.5)continue;drawn.push({pts,d:pts.reduce((s,p)=>s+p.d,0)/4,od:F.od})}
  drawn.sort((a,b)=>(b.od-a.od)||(b.d-a.d));
  for(const D of drawn){ctx.beginPath();D.pts.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();ctx.fillStyle='#111111';ctx.fill();ctx.lineWidth=0.9*px;ctx.strokeStyle=slabStroke;ctx.stroke()}
  // connectors (mid height, x-ray) with square experts
  {const hm=(HB+HT)/2;ctx.strokeStyle=GREYM;
    for(const b0 of bounds){const b=SB(b0);const i=b[4],j=0,cvv=(b[2]+b[3])/2;const pairs=[];
      if(i<2)pairs.push([[b[1],cvv],[SB(bounds[i+1])[0],cvv]]);
      for(const [a,c] of pairs){drawXray([a[0],a[1],hm],[c[0],c[1],hm],cam,Math.min(1,R.wop*R.wire),w=>proj(w[0],w[1],w[2]),R.cgw*px,cur.xr);
        const mw=[a[0]*0.45+c[0]*0.55,a[1]*0.45+c[1]*0.55,hm];expertSolid(mw,R.er*0.45,[0.4+i*0.3,0.7+j*0.5,0.2],w=>proj(w[0],w[1],w[2]),expCol,0.95*R.wire)}}}
  // agents inside the estate slabs — grey, seen through the slab faces
  if(cur.b4<0.5){for(const a of AGENTS){const w=agentWorld(a,t,mo,SB);
    miniTetra(w,AG_R,agentRot(a),pf,mix(GL,'#3A3D3A',cur.net),1.0*px,cam,0.9-0.25*cur.net,Math.max(cur.xr,R.xray))}}
  // cage (front half) + expert cubes
  ctx.strokeStyle=cageCol; cageLines(false); cageLines(true);
  // beat 3: the memory network draws in over NET_T seconds
  const lineK=seg=>reduced?1:eoc((tb-seg.t0)/LINE_T); // 0..1 draw progress of a network line
  const extraA={}; // minted experts fade in as the first line reaches them (or, on-edge ones, at their slot)
  if(cur.net>0.01){
    for(const x in EXTRA){let a=0;if(ON_EDGE[x]){a=eoc((tb-0.2)/0.5)}else{for(const seg of NET3){if(seg.a===x||seg.b===x){a=Math.max(a,lineK(seg))}}}extraA[x]=a*cur.net}
    ctx.strokeStyle=OR;
    for(const seg of NET3){const k=lineK(seg);if(k<=0)continue;
      // draw from the already-lit end towards the new one
      const fromX=(seg.b in EXTRA&&!(seg.a in EXTRA))?seg.a:(seg.a in EXTRA&&!(seg.b in EXTRA)?seg.b:seg.a);const toX=fromX===seg.a?seg.b:seg.a;
      const s=trim(Wd[fromX],Wd[toX],exR,exR);if(!s)continue;const [a,b]=s;
      const e=[a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k,a[2]+(b[2]-a[2])*k];drawXray(a,e,cam,0.9*cur.net,pf,2*px,0)}
    // signals: short white streaks running along the finished lines (network first, cage edges once they've thickened)
    if(!reduced){const wires=[];
      for(const seg of NET3){if(lineK(seg)>=1){const s=trim(Wd[seg.a],Wd[seg.b],exR,exR);if(s)wires.push({s,since:seg.t0+LINE_T})}}
      if(cageUp>0.5){EDGES.forEach(([a,b])=>{const s=trim(Wd[a],Wd[b],exR,exR);if(s)wires.push({s,since:3.3})})}
      ctx.strokeStyle='#FF7A4A';ctx.lineCap='round';
      wires.forEach((w,i)=>{const P=1.4+((i*7)%6)*0.22, ph=((i*0.617)%1)*P, D=0.55;
        const tt=tb-w.since;if(tt<0)return;const c=((tt+ph)%P);if(c>D)return;const u=c/D;const dir=(i%3===0)?-1:1; // some run the other way
        const u0=dir>0?u:1-u, u1=Math.max(0,Math.min(1,u0-dir*0.12));const [a,b]=w.s;
        const pA=[0,1,2].map(k=>a[k]+(b[k]-a[k])*u0),pB=[0,1,2].map(k=>a[k]+(b[k]-a[k])*u1);
        const al=Math.pow(Math.sin(Math.PI*u),0.6)*cur.net;drawXray(pB,pA,cam,0.95*al,pf,2.4*px,0);
        if(hidden(pA,cam))return;const h=pf(pA);ctx.globalAlpha=al;ctx.fillStyle='#FFB08A';ctx.beginPath();ctx.arc(h.x,h.y,1.6*px,0,6.283);ctx.fill();ctx.globalAlpha=1;});
      ctx.lineCap='butt';}}
  const pulse=(1+R.pulse*0.25*Math.sin(t*1.1)*mo)*cur.exScale;
  for(const k in Wd){ if(k==='t2'&&cur.focus>0.5) continue; const s=seeds[k];const isX=k in EXTRA;if(isX&&!(extraA[k]>0.01))continue;ctx.globalAlpha=isX?extraA[k]:1;
    const nd=nodeDelay(Wd[k]);miniCube(Wd[k],R.er*pulse,[spinAcc*0.35*s[3],spinAcc*0.27*s[4]+s[0],spinAcc*0.19*s[5]+s[1]],pf,expCol,0.8*px,i=>eoc((dIn-nd-i*12)/380),cam);ctx.globalAlpha=1;}
  // composite the scene, faded by the beat state
  ctx=mctx; if(cur.fade<0.995){ctx.globalAlpha=(1-cur.fade)*eoc(dIn/500);ctx.drawImage(oc,0,0);ctx.globalAlpha=1;}
  // the focus expert (t2), drawn last, orange as it warms
  {const s=seeds['t2'];const lw=(0.8+1.2*cur.focus)*px;
    const nd=nodeDelay(Wd['t2']);if(cur.b4<0.5) miniCube(Wd['t2'],R.er*pulse,[spinAcc*0.35*s[3],spinAcc*0.27*s[4]+s[0],spinAcc*0.19*s[5]+s[1]],pf,expCol,lw,i=>eoc((dIn-nd-i*12)/380));}
  // beat 2: two smaller experts behind the focus expert, tethered to it with orange lines
  if(cur.focus>0.01&&cur.b4<0.5){const A=cur.focus;const c=camDir();const T=Wd['t2'];
    const back=(v,du,dh)=>[T[0]-c[0]*v+du,T[1]-c[1]*v,T[2]-c[2]*v+dh];
    const bg=[{p:back(22,12,7),r:R.er*0.55},{p:back(34,-13,-4),r:R.er*0.45}];
    const base=Math.min(W,H)/300*cur.zoom, sil=r=>r*1.78*base; // projected silhouette radius of a dodecahedron
    bg.forEach((e,i)=>{const pa=pf(T),pb=pf(e.p);const dx=pb.x-pa.x,dy=pb.y-pa.y,L=Math.hypot(dx,dy);const ta=sil(R.er*pulse)+2*px,tb=sil(e.r)+2*px;ctx.globalAlpha=0.9*A;
      if(L>ta+tb){const ux=dx/L,uy=dy/L;ctx.strokeStyle=OR;ctx.lineWidth=1.2*px;ctx.beginPath();ctx.moveTo(pa.x+ux*ta,pa.y+uy*ta);ctx.lineTo(pb.x-ux*tb,pb.y-uy*tb);ctx.stroke();}
      ctx.globalAlpha=0.75*A;miniCube(e.p,e.r,[spinAcc*0.25+i,spinAcc*0.2+i*2,i*0.5],pf,OR,0.7*px);ctx.globalAlpha=1;});}
  // beat 4 — YOUR AGENT ESTATE (tb = seconds since entering the beat):
  //   1. the three slabs turn Andromeda-orange
  //   2. a dark-grey outline case draws in around them (no fill); hold
  if(cur.b4>0.5){const A=cur.b4;const P=w=>proj(w[0],w[1],w[2]);const hm=(HB+HT)/2;const TB=reduced?99:tb; // beat clock (NB: `T` is the services-layer thickness)
    const lerp3=(a,b,t)=>[0,1,2].map(i=>a[i]+(b[i]-a[i])*t);
    const win=(t0,t1)=>eoc((TB-t0)/(t1-t0));
    const pulse=(a,b,since,period,ph,col,head,lw,alpha,D)=>{const tt=TB-since;if(tt<0)return;const c=(tt+ph)%period;if(c>D)return;const u=c/D;
      const pA=lerp3(a,b,u),pB=lerp3(a,b,Math.max(0,u-0.16));const al=Math.pow(Math.sin(Math.PI*u),0.6)*alpha;
      const qa=P(pA),qb=P(pB);ctx.globalAlpha=al;ctx.strokeStyle=col;ctx.lineWidth=lw;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(qb.x,qb.y);ctx.lineTo(qa.x,qa.y);ctx.stroke();ctx.lineCap='butt';
      ctx.fillStyle=head;ctx.beginPath();ctx.arc(qa.x,qa.y,1.5*px,0,6.283);ctx.fill();ctx.globalAlpha=1;};
    const SIG='#FF7A4A',SIGH='#FFB08A',DG='#3A3D3A';
    const E12=[[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]];
    // ---- 0. the services layer beneath, exactly as in beat 1 (stays grey) ----
    drawBox(0,S,0,S,0,T,'#080808',0.9,R.ltone*A);
    {const ins=3.5,g=4.0,bwid=(S-2*ins-g)/2;for(let q=0;q<2;q++){const u0=ins+q*(bwid+g);drawBox(u0,u0+bwid,ins,S-ins,T*0.08,T*0.92,'#0D0D0D',0.85,R.ltone*1.05*A)}}
    // ---- 1. slabs: dark grey → orange ----
    const k=win(1.2,2.4);                       // 0 dark grey .. 1 Andromeda orange
        const SBS=bounds.map(SB);const order=SBS.slice().sort((p,q)=>proj((q[0]+q[1])/2,(q[2]+q[3])/2,hm).d-proj((p[0]+p[1])/2,(p[2]+p[3])/2,hm).d); // back to front
    order.forEach((B)=>{const V=[];for(const u of[B[0],B[1]])for(const v of[B[2],B[3]])for(const h of[HB,HT])V.push([u,v,h]);const Vp=V.map(P);
      const F=box(B[0],B[1],B[2],B[3],HB,HT).map(q=>q.map(P));
      for(const q of F){const front=area2(q)<-0.5;if(!front&&k<0.01)continue;ctx.globalAlpha=A*(front?(1.0*(1-k)+0.30*k):0.14*k);ctx.fillStyle=mix('#111111',OR,k); // solid #111 like beat 1 until it turns
        ctx.beginPath();q.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();ctx.fill()}
      ctx.globalAlpha=0.95*A;ctx.strokeStyle=mix(DG,OR,k);ctx.lineWidth=(1.0+0.4*k)*px;ctx.beginPath();for(const [a,b] of E12){ctx.moveTo(Vp[a].x,Vp[a].y);ctx.lineTo(Vp[b].x,Vp[b].y)}ctx.stroke();ctx.globalAlpha=1;});
    // ---- 1b. the agents inside them warm with the slabs ----
    {const acol=mix(GL,OR,k);for(const a of AGENTS){const w=agentWorld(a,t,mo,SB);
      miniTetra(w,AG_R,agentRot(a),P,acol,(1.0+0.5*k)*px,null,A*(0.55+0.45*k))}}
    // ---- 2. the dark-grey case around the three slabs ----
    {const pad=6,c0=SBS[0][0]-pad,c1=SBS[2][1]+pad,d0=SBS[0][2]-pad,d1=SBS[0][3]+pad,h0=HB-4,h1=HT+4;
      const ke=win(2.3,2.8); // edges draw in; no fill
      if(ke>0){const V=[];for(const u of[c0,c1])for(const v of[d0,d1])for(const h of[h0,h1])V.push([u,v,h]);
        ctx.strokeStyle=DG;ctx.lineWidth=1.0*px;ctx.globalAlpha=0.95*A;ctx.beginPath();
        for(const [a,b] of E12){const pa=P(V[a]),pb=P(V[b]),mx=(pa.x+pb.x)/2,my=(pa.y+pb.y)/2;ctx.moveTo(mx+(pa.x-mx)*ke,my+(pa.y-my)*ke);ctx.lineTo(mx+(pb.x-mx)*ke,my+(pb.y-my)*ke)}ctx.stroke();ctx.globalAlpha=1;}}}
  // beat 1: labels in the exploded-stack style — mono caps in a right-hand column, thin grey leader with a 45° jog
  if(cur.labels>0.01){const A=cur.labels*eoc((dIn-1900)/500);const fs=Math.round(11*px);ctx.font=fs+"px 'IBM Plex Mono', ui-monospace, monospace";ctx.textBaseline='middle';ctx.textAlign='left';
    const colX=W*(OPT.colX||0.735), jog=12*px; if('letterSpacing' in ctx) ctx.letterSpacing=(2*px)+'px';
    const leader=(from,labelY,text,col)=>{const dy=Math.abs(labelY-from.y);let x2=colX-14*px, xk=x2-dy-10*px, lx=colX;
      if(xk<from.x){xk=from.x;x2=Math.max(x2,xk+dy+10*px);lx=x2+14*px}   // never run the leader back into the object
      ctx.globalAlpha=A;ctx.strokeStyle='#8E8B86';ctx.lineWidth=0.8*px;ctx.beginPath();ctx.moveTo(from.x,from.y);ctx.lineTo(xk,from.y);ctx.lineTo(xk+dy,labelY);ctx.lineTo(x2,labelY);ctx.stroke();
      ctx.fillStyle='#8E8B86';ctx.beginPath();ctx.arc(from.x,from.y,1.6*px,0,6.283);ctx.fill();
      ctx.fillStyle=col;const lines=text.split('\n');lines.forEach((ln,i)=>ctx.fillText(ln,lx,labelY+(i-(lines.length-1)/2)*fs*1.35));ctx.globalAlpha=1;};
    // HELIX INTELLIGENCE → the right-most cage edge midpoint
    if(cur.b4>0.5){const cased=(reduced||tb>2.3);const pad=cased?6:0,hh=cased?HT+4:HT;let m=null;for(const B0 of bounds){const B=SB(B0);for(const u of[B[0]-pad,B[1]+pad])for(const v of[B[2]-pad,B[3]+pad]){const q=pf([u,v,hh]);if(!m||q.x>m.x)m=q}}leader(m,m.y+40*px,'YOUR\nAGENT ESTATE','#B9B5AE');} // right-most top corner of the stack (or of the case once it forms); tag sits below, clear of the experts
    else{
    let best=null;for(const k of['t0','t1','t2','t3']){const m=pf(Wd[k]);if(!best||m.x>best.x)best=m;} // right-most top expert
    best={x:best.x+R.er*cur.exScale*1.6*Math.min(W,H)/300*cur.zoom,y:best.y};        // start at its surface
    leader(best,best.y-30*px,'HELIX\nINTELLIGENCE',OR);
    // YOUR AGENT ESTATE → the right-most slab's top-face centre
    let sb=null;for(const B of bounds){const m=pf([(B[0]+B[1])/2,B[2]+(B[3]-B[2])*0.72,HT]);if(!sb||m.x>sb.x)sb=m;} // right slab, towards its near end
    leader(sb,sb.y+14*px,'YOUR\nAGENT ESTATE','#B9B5AE');} if('letterSpacing' in ctx) ctx.letterSpacing='0px';}
  if(running) raf=requestAnimationFrame(frame);
}
function replay(){cur=Object.assign({},BEATS[FIXED]);from=Object.assign({},cur);to=BEATS[FIXED];tw0=-1;beat=FIXED;const n=performance.now();beatT0=n;drawT0=n;spinAcc=0;lastT=null;}
function start(){if(running)return;running=true;lastT=null;raf=requestAnimationFrame(frame);}
function stop(){running=false;cancelAnimationFrame(raf);}
return {replay,start,stop,get cur(){return cur}};
}


// ---------------------------------------------------------------- scenes
// Framing per scene for a ~390px-wide box (zoom multiplier, projection
// centre, label column). Tuned by eye; see the mobile reference page.
var FRAMING=[
 {mz:0.85,cx:0.32,cy:0.50,colX:0.51},   // #sth — intro, cage + labels
 {mz:1.60,cx:0.50,cy:0.50},             // #st0 — 01 experts (zoomed)
 {mz:1.00,cx:0.50,cy:0.52},             // #st1 — 02 graph neural network
 {mz:1.20,cx:0.33,cy:0.50,colX:0.58}    // #st2 — 03 agentic estate
];
var IDS=['sth','st0','st1','st2'];
var scenes=[];
IDS.forEach(function(id,i){
 var cv=document.getElementById(id);
 if(!cv)return;
 if(cv.tagName!=='CANVAS'){var c=cv.querySelector('canvas');if(!c){c=document.createElement('canvas');cv.appendChild(c);}cv=c;}
 var sc=Scene(cv,i,FRAMING[i]);scenes.push(sc);
 new IntersectionObserver(function(es){es.forEach(function(e){
  if(e.isIntersecting){sc.replay();sc.start();}else sc.stop();
 })},{threshold:0.25}).observe(cv.parentElement||cv);
});

// ---------------------------------------------------------------- copy reveal
var io=new IntersectionObserver(function(es){
 es.forEach(function(e){if(e.isIntersecting)e.target.classList.add('on')});
},{threshold:0.25});
[].slice.call(document.querySelectorAll('.blk')).forEach(function(b){io.observe(b)});

window.HXM=scenes;
})();
