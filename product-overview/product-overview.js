/* Product overview graphic — v1 (2026-09-11, from prototype v2)
 * The 9-cube stack with the Helix cage and experts. One file, no dependencies.
 * Injects the SVG into #product-overview (the markup is too large for a Webflow Embed),
 * then animates it. Transparent background — the page shows through.
 * Same skeleton as aquila.js: visibility guard, .js-anim, sleeps off-screen.
 */
(function(){
var SVG = '<svg preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 671">\n\
<g transform="translate(320.00 436.12) scale(3.1487)">\n\
<g id="cage-back">\n\
<path data-a="b0" data-b="b1" fill="none" stroke="#6E6B66" stroke-opacity="0.20" stroke-width="0.34"/>\n\
<path data-a="b0" data-b="m0" fill="none" stroke="#6E6B66" stroke-opacity="0.20" stroke-width="0.34"/>\n\
<path data-a="b1" data-b="b2" fill="none" stroke="#6E6B66" stroke-opacity="0.20" stroke-width="0.34"/>\n\
<path data-a="m1" data-b="b2" fill="none" stroke="#6E6B66" stroke-opacity="0.20" stroke-width="0.34"/>\n\
<path data-a="b2" data-b="b3" fill="none" stroke="#6E6B66" stroke-opacity="0.20" stroke-width="0.34"/>\n\
<path data-a="t2" data-b="t3" fill="none" stroke="#6E6B66" stroke-opacity="0.20" stroke-width="0.34"/>\n\
<path data-a="b2" data-b="m2" fill="none" stroke="#6E6B66" stroke-opacity="0.20" stroke-width="0.34"/>\n\
<path data-a="m2" data-b="t3" fill="none" stroke="#6E6B66" stroke-opacity="0.20" stroke-width="0.34"/>\n\
<path data-a="t2" data-b="m2" fill="none" stroke="#6E6B66" stroke-opacity="0.20" stroke-width="0.34"/>\n\
<path data-a="m2" data-b="b3" fill="none" stroke="#6E6B66" stroke-opacity="0.20" stroke-width="0.34"/>\n\
<path data-a="b3" data-b="b0" fill="none" stroke="#6E6B66" stroke-opacity="0.20" stroke-width="0.34"/>\n\
<path data-a="t3" data-b="t0" fill="none" stroke="#6E6B66" stroke-opacity="0.20" stroke-width="0.34"/>\n\
<path data-a="b3" data-b="m3" fill="none" stroke="#6E6B66" stroke-opacity="0.20" stroke-width="0.34"/>\n\
<path data-a="m3" data-b="t0" fill="none" stroke="#6E6B66" stroke-opacity="0.20" stroke-width="0.34"/>\n\
<path data-a="t3" data-b="m3" fill="none" stroke="#6E6B66" stroke-opacity="0.20" stroke-width="0.34"/>\n\
<path data-a="m3" data-b="b0" fill="none" stroke="#6E6B66" stroke-opacity="0.20" stroke-width="0.34"/>\n\
<path data-n="b0" fill="none" stroke="#D24A2F" stroke-opacity="0.90" stroke-width="0.33" stroke-linejoin="round"/>\n\
<path data-n="b2" fill="none" stroke="#D24A2F" stroke-opacity="0.90" stroke-width="0.33" stroke-linejoin="round"/>\n\
<path data-n="b3" fill="none" stroke="#D24A2F" stroke-opacity="0.90" stroke-width="0.33" stroke-linejoin="round"/>\n\
<path data-n="t3" fill="none" stroke="#D24A2F" stroke-opacity="0.90" stroke-width="0.33" stroke-linejoin="round"/>\n\
<path data-n="m2" fill="none" stroke="#D24A2F" stroke-opacity="0.90" stroke-width="0.33" stroke-linejoin="round"/>\n\
<path data-n="m3" fill="none" stroke="#D24A2F" stroke-opacity="0.90" stroke-width="0.33" stroke-linejoin="round"/>\n\
</g>\n\
<g opacity="0.49">\n\
<polygon points="-70.67,-24.62 -2.47,-77.23 70.67,-28.17 70.67,-1.78 2.47,50.83 -70.67,1.78" fill="#080808" fill-opacity="0.90"/>\n\
<path d="M-70.67 1.78 L2.47 50.83 M-2.47 -50.83 L70.67 -1.78 M-70.67 -24.62 L2.47 24.44 M-2.47 -77.23 L70.67 -28.17 M-70.67 1.78 L-2.47 -50.83 M2.47 50.83 L70.67 -1.78 M-70.67 -24.62 L-2.47 -77.23 M2.47 24.44 L70.67 -28.17 M-70.67 1.78 L-70.67 -24.62 M2.47 50.83 L2.47 24.44 M-2.47 -50.83 L-2.47 -77.23 M70.67 -1.78 L70.67 -28.17" fill="none" stroke="#535855" stroke-width="0.60"/>\n\
</g>\n\
<g opacity="0.51">\n\
<polygon points="-65.72,-22.63 -2.30,-71.56 30.25,-49.73 30.25,-27.56 -33.18,21.37 -65.72,-0.46" fill="#0D0D0D" fill-opacity="0.85"/>\n\
<path d="M-65.72 -0.46 L-33.18 21.37 M-2.30 -49.39 L30.25 -27.56 M-65.72 -22.63 L-33.18 -0.80 M-2.30 -71.56 L30.25 -49.73 M-65.72 -0.46 L-2.30 -49.39 M-33.18 21.37 L30.25 -27.56 M-65.72 -22.63 L-2.30 -71.56 M-33.18 -0.80 L30.25 -49.73 M-65.72 -0.46 L-65.72 -22.63 M-33.18 21.37 L-33.18 -0.80 M-2.30 -49.39 L-2.30 -71.56 M30.25 -27.56 L30.25 -49.73" fill="none" stroke="#535855" stroke-width="0.60"/>\n\
</g>\n\
<g opacity="0.51">\n\
<polygon points="-30.25,1.16 33.18,-47.77 65.72,-25.94 65.72,-3.76 2.30,45.16 -30.25,23.33" fill="#0D0D0D" fill-opacity="0.85"/>\n\
<path d="M-30.25 23.33 L2.30 45.16 M33.18 -25.59 L65.72 -3.76 M-30.25 1.16 L2.30 22.99 M33.18 -47.77 L65.72 -25.94 M-30.25 23.33 L33.18 -25.59 M2.30 45.16 L65.72 -3.76 M-30.25 1.16 L33.18 -47.77 M2.30 22.99 L65.72 -25.94 M-30.25 23.33 L-30.25 1.16 M2.30 45.16 L2.30 22.99 M33.18 -25.59 L33.18 -47.77 M65.72 -3.76 L65.72 -25.94" fill="none" stroke="#535855" stroke-width="0.60"/>\n\
</g>\n\
<polygon points="-17.91,-76.72 -1.09,-65.44 14.60,-77.54 -2.22,-88.82" fill="#131313" fill-opacity="1.00"/>\n\
<polygon points="-17.91,-61.78 -1.09,-50.50 -1.09,-65.44 -17.91,-76.72" fill="#101010" fill-opacity="1.00"/>\n\
<polygon points="-1.09,-50.50 14.60,-62.60 14.60,-77.54 -1.09,-65.44" fill="#0E0E0E" fill-opacity="1.00"/>\n\
<g opacity="0.90"><path d="M-17.91 -76.72 L-1.09 -65.44 L14.60 -77.54 L-2.22 -88.82 Z M-17.91 -61.78 L-1.09 -50.50 L-1.09 -65.44 L-17.91 -76.72 Z M-1.09 -50.50 L14.60 -62.60 L14.60 -77.54 L-1.09 -65.44 Z" fill="none" stroke="#8E8B86" stroke-width="0.60" stroke-linejoin="round"/></g>\n\
<polygon points="6.59,-60.28 23.41,-49.00 39.10,-61.10 22.28,-72.38" fill="#131313" fill-opacity="1.00"/>\n\
<polygon points="6.59,-45.35 23.41,-34.07 23.41,-49.00 6.59,-60.28" fill="#101010" fill-opacity="1.00"/>\n\
<polygon points="23.41,-34.07 39.10,-46.17 39.10,-61.10 23.41,-49.00" fill="#0E0E0E" fill-opacity="1.00"/>\n\
<g opacity="0.90"><path d="M6.59 -60.28 L23.41 -49.00 L39.10 -61.10 L22.28 -72.38 Z M6.59 -45.35 L23.41 -34.07 L23.41 -49.00 L6.59 -60.28 Z M23.41 -34.07 L39.10 -46.17 L39.10 -61.10 L23.41 -49.00 Z" fill="none" stroke="#8E8B86" stroke-width="0.60" stroke-linejoin="round"/></g>\n\
<polygon points="-40.75,-59.10 -23.93,-47.81 -8.25,-59.91 -25.07,-71.20" fill="#131313" fill-opacity="1.00"/>\n\
<polygon points="-40.75,-44.16 -23.93,-32.88 -23.93,-47.81 -40.75,-59.10" fill="#101010" fill-opacity="1.00"/>\n\
<polygon points="-23.93,-32.88 -8.25,-44.98 -8.25,-59.91 -23.93,-47.81" fill="#0E0E0E" fill-opacity="1.00"/>\n\
<g opacity="0.90"><path d="M-40.75 -59.10 L-23.93 -47.81 L-8.25 -59.91 L-25.07 -71.20 Z M-40.75 -44.16 L-23.93 -32.88 L-23.93 -47.81 L-40.75 -59.10 Z M-23.93 -32.88 L-8.25 -44.98 L-8.25 -59.91 L-23.93 -47.81 Z" fill="none" stroke="#8E8B86" stroke-width="0.60" stroke-linejoin="round"/></g>\n\
<polygon points="31.09,-43.85 47.91,-32.57 63.60,-44.67 46.78,-55.95" fill="#131313" fill-opacity="1.00"/>\n\
<polygon points="31.09,-28.91 47.91,-17.63 47.91,-32.57 31.09,-43.85" fill="#101010" fill-opacity="1.00"/>\n\
<polygon points="47.91,-17.63 63.60,-29.73 63.60,-44.67 47.91,-32.57" fill="#0E0E0E" fill-opacity="1.00"/>\n\
<g opacity="0.90"><path d="M31.09 -43.85 L47.91 -32.57 L63.60 -44.67 L46.78 -55.95 Z M31.09 -28.91 L47.91 -17.63 L47.91 -32.57 L31.09 -43.85 Z M47.91 -17.63 L63.60 -29.73 L63.60 -44.67 L47.91 -32.57 Z" fill="none" stroke="#8E8B86" stroke-width="0.60" stroke-linejoin="round"/></g>\n\
<polygon points="-16.25,-42.66 0.57,-31.38 16.25,-43.48 -0.57,-54.76" fill="#131313" fill-opacity="1.00"/>\n\
<polygon points="-16.25,-27.73 0.57,-16.44 0.57,-31.38 -16.25,-42.66" fill="#101010" fill-opacity="1.00"/>\n\
<polygon points="0.57,-16.44 16.25,-28.54 16.25,-43.48 0.57,-31.38" fill="#0E0E0E" fill-opacity="1.00"/>\n\
<g opacity="0.90"><path d="M-16.25 -42.66 L0.57 -31.38 L16.25 -43.48 L-0.57 -54.76 Z M-16.25 -27.73 L0.57 -16.44 L0.57 -31.38 L-16.25 -42.66 Z M0.57 -16.44 L16.25 -28.54 L16.25 -43.48 L0.57 -31.38 Z" fill="none" stroke="#8E8B86" stroke-width="0.60" stroke-linejoin="round"/></g>\n\
<polygon points="-63.60,-41.47 -46.78,-30.19 -31.09,-42.29 -47.91,-53.57" fill="#131313" fill-opacity="1.00"/>\n\
<polygon points="-63.60,-26.54 -46.78,-15.25 -46.78,-30.19 -63.60,-41.47" fill="#101010" fill-opacity="1.00"/>\n\
<polygon points="-46.78,-15.25 -31.09,-27.35 -31.09,-42.29 -46.78,-30.19" fill="#0E0E0E" fill-opacity="1.00"/>\n\
<g opacity="0.90"><path d="M-63.60 -41.47 L-46.78 -30.19 L-31.09 -42.29 L-47.91 -53.57 Z M-63.60 -26.54 L-46.78 -15.25 L-46.78 -30.19 L-63.60 -41.47 Z M-46.78 -15.25 L-31.09 -27.35 L-31.09 -42.29 L-46.78 -30.19 Z" fill="none" stroke="#8E8B86" stroke-width="0.60" stroke-linejoin="round"/></g>\n\
<polygon points="8.25,-26.23 25.07,-14.94 40.75,-27.04 23.93,-38.33" fill="#131313" fill-opacity="1.00"/>\n\
<polygon points="8.25,-11.29 25.07,-0.01 25.07,-14.94 8.25,-26.23" fill="#101010" fill-opacity="1.00"/>\n\
<polygon points="25.07,-0.01 40.75,-12.11 40.75,-27.04 25.07,-14.94" fill="#0E0E0E" fill-opacity="1.00"/>\n\
<g opacity="0.90"><path d="M8.25 -26.23 L25.07 -14.94 L40.75 -27.04 L23.93 -38.33 Z M8.25 -11.29 L25.07 -0.01 L25.07 -14.94 L8.25 -26.23 Z M25.07 -0.01 L40.75 -12.11 L40.75 -27.04 L25.07 -14.94 Z" fill="none" stroke="#8E8B86" stroke-width="0.60" stroke-linejoin="round"/></g>\n\
<polygon points="-39.10,-25.04 -22.28,-13.75 -6.59,-25.85 -23.41,-37.14" fill="#131313" fill-opacity="1.00"/>\n\
<polygon points="-39.10,-10.10 -22.28,1.18 -22.28,-13.75 -39.10,-25.04" fill="#101010" fill-opacity="1.00"/>\n\
<polygon points="-22.28,1.18 -6.59,-10.92 -6.59,-25.85 -22.28,-13.75" fill="#0E0E0E" fill-opacity="1.00"/>\n\
<g opacity="0.90"><path d="M-39.10 -25.04 L-22.28 -13.75 L-6.59 -25.85 L-23.41 -37.14 Z M-39.10 -10.10 L-22.28 1.18 L-22.28 -13.75 L-39.10 -25.04 Z M-22.28 1.18 L-6.59 -10.92 L-6.59 -25.85 L-22.28 -13.75 Z" fill="none" stroke="#8E8B86" stroke-width="0.60" stroke-linejoin="round"/></g>\n\
<polygon points="-14.60,-8.60 2.22,2.68 17.91,-9.42 1.09,-20.70" fill="#131313" fill-opacity="1.00"/>\n\
<polygon points="-14.60,6.33 2.22,17.62 2.22,2.68 -14.60,-8.60" fill="#101010" fill-opacity="1.00"/>\n\
<polygon points="2.22,17.62 17.91,5.52 17.91,-9.42 2.22,2.68" fill="#0E0E0E" fill-opacity="1.00"/>\n\
<g opacity="0.90"><path d="M-14.60 -8.60 L2.22 2.68 L17.91 -9.42 L1.09 -20.70 Z M-14.60 6.33 L2.22 17.62 L2.22 2.68 L-14.60 -8.60 Z M2.22 17.62 L17.91 5.52 L17.91 -9.42 L2.22 2.68 Z" fill="none" stroke="#8E8B86" stroke-width="0.60" stroke-linejoin="round"/></g>\n\
<line x1="-38.94" y1="-28.77" x2="-36.38" y2="-27.05" stroke="#6E6B66" stroke-opacity="0.79" stroke-width="0.34"/>\n\
<line x1="-36.38" y1="-27.05" x2="-31.26" y2="-23.62" stroke="#6E6B66" stroke-opacity="0.44" stroke-width="0.34"/>\n\
<line x1="-39.50" y1="-40.46" x2="-34.28" y2="-44.49" stroke="#6E6B66" stroke-opacity="0.44" stroke-width="0.34"/>\n\
<line x1="-34.28" y1="-44.49" x2="-32.34" y2="-45.99" stroke="#6E6B66" stroke-opacity="0.79" stroke-width="0.34"/>\n\
<line x1="-16.09" y1="-46.39" x2="-13.53" y2="-44.68" stroke="#6E6B66" stroke-opacity="0.79" stroke-width="0.34"/>\n\
<line x1="-13.53" y1="-44.68" x2="-8.41" y2="-41.24" stroke="#6E6B66" stroke-opacity="0.44" stroke-width="0.34"/>\n\
<line x1="-16.66" y1="-58.09" x2="-11.44" y2="-62.11" stroke="#6E6B66" stroke-opacity="0.44" stroke-width="0.34"/>\n\
<line x1="-11.44" y1="-62.11" x2="-9.50" y2="-63.61" stroke="#6E6B66" stroke-opacity="0.79" stroke-width="0.34"/>\n\
<line x1="6.76" y1="-64.02" x2="9.32" y2="-62.30" stroke="#6E6B66" stroke-opacity="0.79" stroke-width="0.34"/>\n\
<line x1="9.32" y1="-62.30" x2="14.44" y2="-58.87" stroke="#6E6B66" stroke-opacity="0.44" stroke-width="0.34"/>\n\
<line x1="-14.44" y1="-12.34" x2="-11.88" y2="-10.62" stroke="#6E6B66" stroke-opacity="0.79" stroke-width="0.34"/>\n\
<line x1="-11.88" y1="-10.62" x2="-6.76" y2="-7.18" stroke="#6E6B66" stroke-opacity="0.44" stroke-width="0.34"/>\n\
<line x1="-15.00" y1="-24.03" x2="-9.78" y2="-28.06" stroke="#6E6B66" stroke-opacity="0.44" stroke-width="0.34"/>\n\
<line x1="-9.78" y1="-28.06" x2="-7.84" y2="-29.55" stroke="#6E6B66" stroke-opacity="0.79" stroke-width="0.34"/>\n\
<line x1="8.41" y1="-29.96" x2="10.97" y2="-28.24" stroke="#6E6B66" stroke-opacity="0.79" stroke-width="0.34"/>\n\
<line x1="10.97" y1="-28.24" x2="16.09" y2="-24.81" stroke="#6E6B66" stroke-opacity="0.44" stroke-width="0.34"/>\n\
<line x1="7.84" y1="-41.65" x2="13.06" y2="-45.68" stroke="#6E6B66" stroke-opacity="0.44" stroke-width="0.34"/>\n\
<line x1="13.06" y1="-45.68" x2="15.00" y2="-47.18" stroke="#6E6B66" stroke-opacity="0.79" stroke-width="0.34"/>\n\
<line x1="31.26" y1="-47.58" x2="33.82" y2="-45.87" stroke="#6E6B66" stroke-opacity="0.79" stroke-width="0.34"/>\n\
<line x1="33.82" y1="-45.87" x2="38.94" y2="-42.43" stroke="#6E6B66" stroke-opacity="0.44" stroke-width="0.34"/>\n\
<line x1="9.50" y1="-7.59" x2="14.72" y2="-11.62" stroke="#6E6B66" stroke-opacity="0.44" stroke-width="0.34"/>\n\
<line x1="14.72" y1="-11.62" x2="16.66" y2="-13.12" stroke="#6E6B66" stroke-opacity="0.79" stroke-width="0.34"/>\n\
<line x1="32.34" y1="-25.22" x2="37.56" y2="-29.24" stroke="#6E6B66" stroke-opacity="0.44" stroke-width="0.34"/>\n\
<line x1="37.56" y1="-29.24" x2="39.50" y2="-30.74" stroke="#6E6B66" stroke-opacity="0.79" stroke-width="0.34"/>\n\
<g id="cage-front">\n\
<path data-a="t0" data-b="t1" fill="none" stroke="#6E6B66" stroke-opacity="0.33" stroke-width="0.34"/>\n\
<path data-a="m0" data-b="t1" fill="none" stroke="#6E6B66" stroke-opacity="0.33" stroke-width="0.34"/>\n\
<path data-a="t0" data-b="m0" fill="none" stroke="#6E6B66" stroke-opacity="0.33" stroke-width="0.34"/>\n\
<path data-a="m0" data-b="b1" fill="none" stroke="#6E6B66" stroke-opacity="0.33" stroke-width="0.34"/>\n\
<path data-a="t1" data-b="t2" fill="none" stroke="#6E6B66" stroke-opacity="0.33" stroke-width="0.34"/>\n\
<path data-a="b1" data-b="m1" fill="none" stroke="#6E6B66" stroke-opacity="0.33" stroke-width="0.34"/>\n\
<path data-a="m1" data-b="t2" fill="none" stroke="#6E6B66" stroke-opacity="0.33" stroke-width="0.34"/>\n\
<path data-a="t1" data-b="m1" fill="none" stroke="#6E6B66" stroke-opacity="0.33" stroke-width="0.34"/>\n\
<path data-n="t0" fill="none" stroke="#D24A2F" stroke-opacity="0.90" stroke-width="0.33" stroke-linejoin="round"/>\n\
<path data-n="b1" fill="none" stroke="#D24A2F" stroke-opacity="0.90" stroke-width="0.33" stroke-linejoin="round"/>\n\
<path data-n="t1" fill="none" stroke="#D24A2F" stroke-opacity="0.90" stroke-width="0.33" stroke-linejoin="round"/>\n\
<path data-n="t2" fill="none" stroke="#D24A2F" stroke-opacity="0.90" stroke-width="0.33" stroke-linejoin="round"/>\n\
<path data-n="m0" fill="none" stroke="#D24A2F" stroke-opacity="0.90" stroke-width="0.33" stroke-linejoin="round"/>\n\
<path data-n="m1" fill="none" stroke="#D24A2F" stroke-opacity="0.90" stroke-width="0.33" stroke-linejoin="round"/>\n\
</g>\n\
</g>\n\
</svg>';
var __started=false;
function __visible(){var e=document.getElementById('product-overview');return !!(e&&e.getClientRects().length)}
function __boot(){ if(__started||!__visible())return; __started=true; __start(); }
function __start(){
document.documentElement.classList.add('js-anim');
var host=document.getElementById('product-overview');
host.innerHTML=SVG;
var s=host.querySelector('svg'); s.style.width='100%'; s.style.height='auto'; s.style.display='block';

const S=100.000000, yaw=-43.000000*Math.PI/180, pitch=46.000000*Math.PI/180;
const N={"b0": [-3, -3, -0.0], "t0": [-3, -3, 92.0], "b1": [103.0, -3, -0.0], "t1": [103.0, -3, 92.0], "b2": [103.0, 103.0, -0.0], "t2": [103.0, 103.0, 92.0], "b3": [-3, 103.0, -0.0], "t3": [-3, 103.0, 92.0], "m0": [50.0, -14, 31.0], "m1": [114.0, 50.0, 31.0], "m2": [50.0, 114.0, 31.0], "m3": [-14, 50.0, 31.0]};
function proj(u,v,h,extraYaw,scale){
  const a=yaw+extraYaw, cx=(u-S/2)*scale, cy=(v-S/2)*scale, cz=h*scale;
  const x=cx*Math.cos(a)-cy*Math.sin(a), y=cx*Math.sin(a)+cy*Math.cos(a);
  const up=y*Math.sin(pitch)+cz*Math.cos(pitch);
  return [x,-up];
}
// per-node drift: three incommensurate sines, small amplitude, so the cage breathes and skews without ever snapping
const BOXES=[[0, 100.0, 0, 100.0, 0, 38.0], [0, 100.0, 0, 100.0, -52.0, -26.0], [5.0, 28.0, 5.0, 28.0, 40.5, 62.0], [5.0, 28.0, 38.5, 61.5, 40.5, 62.0], [5.0, 28.0, 72.0, 95.0, 40.5, 62.0], [38.5, 61.5, 5.0, 28.0, 40.5, 62.0], [38.5, 61.5, 38.5, 61.5, 40.5, 62.0], [38.5, 61.5, 72.0, 95.0, 40.5, 62.0], [72.0, 95.0, 5.0, 28.0, 40.5, 62.0], [72.0, 95.0, 38.5, 61.5, 40.5, 62.0], [72.0, 95.0, 72.0, 95.0, 40.5, 62.0]], CAM=[0.47375586945672366, -0.5080409705959287, 0.7193398003386511];
function hit(p,box){
  let t0=1e-6,t1=1e9;
  for(let k=0;k<3;k++){
    const lo=box[2*k],hi=box[2*k+1],d=CAM[k];
    if(Math.abs(d)<1e-12){ if(p[k]<lo||p[k]>hi) return false; }
    else{ let ta=(lo-p[k])/d, tb=(hi-p[k])/d; if(ta>tb){const s=ta;ta=tb;tb=s}
          t0=Math.max(t0,ta); t1=Math.min(t1,tb); if(t0>t1) return false; }
  }
  return t1>t0;
}
function hidden(p){
  const q=[p[0]+CAM[0]*0.35,p[1]+CAM[1]*0.35,p[2]+CAM[2]*0.35];
  for(const b of BOXES) if(hit(q,b)) return true;
  return false;
}
const seeds={}; let i=0;
for(const k in N){ seeds[k]=[i*1.7, i*2.9, i*0.8, 0.9+0.25*Math.sin(i*1.3), 0.7+0.2*Math.cos(i*0.7), 1.1+0.3*Math.sin(i*2.1)]; i++; }
const DV=[[1.7320508075688772, 0, 0], [-1.7320508075688772, 0, 0], [0, 1.7320508075688772, 0], [0, -1.7320508075688772, 0], [0, 0, 1.7320508075688772], [0, 0, -1.7320508075688772]], DE=[[0, 2], [0, 3], [0, 4], [0, 5], [1, 2], [1, 3], [1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5]];
const AMP=2.500000, SPD=1.900000, YAW_AMP=4.000000*Math.PI/180, YAW_SPD=2.000000, BREATHE=0.060000, PULSE=0.520000, R0=0.764025, ER=1.700000;
const svg=host.querySelector('svg');
const lines=svg.querySelectorAll('path[data-a]'), dots=svg.querySelectorAll('path[data-n]');
function world(k,t){
  const p=N[k], s=seeds[k];
  return [p[0]+AMP*Math.sin(t*0.21*SPD*s[3]+s[0]), p[1]+AMP*Math.sin(t*0.17*SPD*s[4]+s[1]), p[2]+AMP*0.8*Math.sin(t*0.26*SPD*s[5]+s[2])];
}
function projW(w,t){ return proj(w[0],w[1],w[2], YAW_AMP*Math.sin(t*0.09*YAW_SPD), 1+BREATHE*Math.sin(t*0.13*SPD)); }
function runs(a,b,t,n){
  const pts=[],vis=[];
  for(let i=0;i<=n;i++){const f=i/n, w=[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f,a[2]+(b[2]-a[2])*f]; pts.push(w); vis.push(!hidden(w));}
  let d='',start=null;
  for(let i=0;i<=n;i++){
    if(vis[i]&&start===null) start=i;
    if((!vis[i]||i===n)&&start!==null){ const e=vis[i]?n:i;
      if(e>start){const p0=projW(pts[start],t),p1=projW(pts[e],t); d+='M'+p0[0].toFixed(2)+' '+p0[1].toFixed(2)+' L'+p1[0].toFixed(2)+' '+p1[1].toFixed(2)+' ';}
      start=null; }
  }
  return d;
}
function pos(k,t){
  const p=N[k], s=seeds[k];
  const u=p[0]+AMP*Math.sin(t*0.21*SPD*s[3]+s[0]), v=p[1]+AMP*Math.sin(t*0.17*SPD*s[4]+s[1]), h=p[2]+AMP*0.8*Math.sin(t*0.26*SPD*s[5]+s[2]);
  return proj(u,v,h, YAW_AMP*Math.sin(t*0.09*YAW_SPD), 1+BREATHE*Math.sin(t*0.13*SPD));
}
function frame(ts){
  const t=ts/1000;
  const Wd={}, P={}; for(const k in N){ Wd[k]=world(k,t); P[k]=projW(Wd[k],t); }
  lines.forEach(l=>{ l.setAttribute('d', runs(Wd[l.dataset.a],Wd[l.dataset.b],t,26)); });
  const pr=ER*(1+PULSE*0.25*Math.sin(t*1.1));
  dots.forEach(d=>{const k=d.dataset.n;
    if(hidden(Wd[k])){ d.setAttribute('d',''); return; }
    const s=seeds[k], ax=t*0.35*s[3], ay=t*0.27*s[4]+s[0], az=t*0.19*s[5]+s[1];
    const c=Wd[k], V=[];
    for(const [sx,sy,sz] of DV){
      let x=sx,y=sy,z=sz, y2=y*Math.cos(ax)-z*Math.sin(ax), z2=y*Math.sin(ax)+z*Math.cos(ax); y=y2; z=z2;
      let x2=x*Math.cos(ay)+z*Math.sin(ay); z2=-x*Math.sin(ay)+z*Math.cos(ay); x=x2; z=z2;
      x2=x*Math.cos(az)-y*Math.sin(az); y2=x*Math.sin(az)+y*Math.cos(az); x=x2; y=y2;
      V.push(projW([c[0]+x*pr,c[1]+y*pr,c[2]+z*pr],t));
    }
    d.setAttribute('d', DE.map(([a,b])=>'M'+V[a][0].toFixed(2)+' '+V[a][1].toFixed(2)+'L'+V[b][0].toFixed(2)+' '+V[b][1].toFixed(2)).join(''));
  });
  if(running) raf=requestAnimationFrame(frame);
}
let running=false, raf=0;
function start(){ if(running) return; running=true; raf=requestAnimationFrame(frame); }
function stop(){ running=false; cancelAnimationFrame(raf); }
if(typeof IntersectionObserver==='function'){ new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting?start():stop()),{rootMargin:'10% 0px'}).observe(host); }
start();
        
}
function __ready(fn){document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn):fn()}
__ready(__boot);
var __t=null;
addEventListener('resize',function(){if(__started)return;clearTimeout(__t);__t=setTimeout(__boot,200)},{passive:true});
})();
