import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dest=path.join(root,'ai-lab');
await mkdir(dest,{recursive:true});
const P={bg:'#0b1223',fg:'#f4f7ff',muted:'#b2bfd6',mint:'#6aead8',violet:'#c5b0ff',amber:'#ffd291'};
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;');
const t=(x,y,s,size=18,colour=P.fg,extra='')=>`<text x="${x}" y="${y}" font-size="${size}" fill="${colour}" ${extra}>${escape(s)}</text>`;
const m=(x,y,s,size=13,colour=P.muted,extra='')=>t(x,y,s,size,colour,`class="mono" ${extra}`);
function svg(w,h,title,desc,body){return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc">
<title id="title">${escape(title)}</title><desc id="desc">${escape(desc)}</desc>
<defs>
<linearGradient id="spectrum"><stop stop-color="#6aead8"/><stop offset=".5" stop-color="#a79aff"/><stop offset="1" stop-color="#ffd291"/></linearGradient>
<linearGradient id="name" x2="1" y2=".3"><stop stop-color="#ffffff"/><stop offset="1" stop-color="#c7caff"/></linearGradient>
<radialGradient id="wash"><stop stop-color="#5f3ba2" stop-opacity=".19"/><stop offset="1" stop-color="#0b1223" stop-opacity="0"/></radialGradient>
<radialGradient id="cyan"><stop stop-color="#0c766f" stop-opacity=".2"/><stop offset="1" stop-color="#0b1223" stop-opacity="0"/></radialGradient>
<pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="12" cy="12" r=".8" fill="#3d4964" opacity=".5"/></pattern>
<clipPath id="edge"><rect width="${w}" height="${h}" rx="20"/></clipPath>
</defs>
<style>text{font-family:Arial,Helvetica,sans-serif}.mono{font-family:'Courier New',monospace}.weave{transform-box:fill-box;transform-origin:center;animation:breathe 9s ease-in-out infinite}.trace{stroke-dasharray:20 300;animation:trace 8s linear infinite}.flow{stroke-dasharray:6 13;animation:flow 5s linear infinite}.cursor{animation:cursor 2.4s steps(1,end) infinite}@keyframes breathe{0%,100%{transform:translateY(2px) rotate(-1deg)}50%{transform:translateY(-4px) rotate(1deg)}}@keyframes trace{to{stroke-dashoffset:-640}}@keyframes flow{to{stroke-dashoffset:-190}}@keyframes cursor{0%,60%{opacity:1}61%,100%{opacity:.2}}@media(prefers-reduced-motion:reduce){*{animation:none!important}}</style>
<g clip-path="url(#edge)"><rect width="${w}" height="${h}" fill="${P.bg}"/><rect width="${w}" height="${h}" fill="url(#dots)"/><ellipse cx="${w*.85}" cy="${h*.45}" rx="${w*.32}" ry="${h*.8}" fill="url(#wash)"/><ellipse cx="${w*.2}" cy="${h}" rx="${w*.5}" ry="${h*.8}" fill="url(#cyan)"/>${body}</g>
<rect x=".5" y=".5" width="${w-1}" height="${h-1}" rx="20" fill="none" stroke="#303b56"/>
</svg>\n`;}
function tag(x,y,w,label,colour){return `<rect x="${x}" y="${y}" width="${w}" height="33" rx="16.5" fill="#151f34" stroke="#35425b"/>${m(x+w/2,y+22,label,12,colour,'text-anchor="middle"')}`;}
// Original generative artwork. The username seeds the shape; the surface is
// decorative and is not a plot of model performance or activity.
const seed=[...'Gagankumar44'].reduce((n,c)=>(n*31+c.charCodeAt(0))>>>0,0);
const phase=(seed%997)/997*Math.PI*2;
function fieldPoint(u,v){
  const x=u*124+(1-v*v)*22*Math.sin(v*3+phase);
  const y=v*110;
  const z=54*Math.sin(2.3*u+phase)*Math.cos(1.8*v)+22*(u*u-v*v);
  return [x*.82+y*.28,y*.68-z*.84-x*.16];
}
function fieldPath(axis,fixed){
  return Array.from({length:61},(_,i)=>{
    const s=-1+i/30;
    const [x,y]=axis==='u'?fieldPoint(s,fixed):fieldPoint(fixed,s);
    return `${i?'L':'M'}${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join('');
}
function curiosityField(cx,cy,scale=1){
  const curves=[];
  for(let i=0;i<=24;i++){
    const v=-1+i/12;
    curves.push(`<path d="${fieldPath('u',v)}" stroke="${i%6===0?P.mint:'#62bfb9'}" opacity="${i%6===0?.85:.5}" stroke-width="${i%6===0?1.35:.8}"/>`);
  }
  for(let i=0;i<=18;i++){
    curves.push(`<path d="${fieldPath('v',-1+i/9)}" stroke="${i%6===0?P.violet:'#8b89bd'}" opacity="${i%6===0?.7:.36}" stroke-width=".8"/>`);
  }
  curves.push(`<path d="${fieldPath('u',.1)}" stroke="${P.amber}" opacity=".9" stroke-width="1.6"/>`);
  curves.push(`<path class="trace" d="${fieldPath('u',-.4)}" stroke="${P.fg}" stroke-width="2" opacity=".8"/>`);
  return `<g transform="translate(${cx},${cy}) scale(${scale})">
  <path d="M-151 -126V-143H-134M134 -143H151V-126M151 116V133H134M-134 133H-151V116" fill="none" stroke="#45516c" stroke-width="1"/>
  <g class="weave" fill="none" stroke-linecap="round" stroke-linejoin="round">${curves.join('')}</g>
  ${m(0,156,'CURIOSITY, DRAWN WITH CODE.',10,P.muted,'text-anchor="middle"')}
  </g>`;
}
function hero(mobile=false){
  if(mobile)return svg(600,446,'Gagan Kumar — curious about AI, always exploring','Python and Java. Programming and systems foundations. Learning AI models, training and automations.',`
  <path d="M28 2H572" stroke="url(#spectrum)" stroke-width="3"/>
  ${m(28,43,'GAGAN / AI & SOFTWARE',16,P.mint)}
  ${t(25,139,'GAGAN',78,'url(#name)','font-weight="800" letter-spacing="-3"')}
  ${t(25,216,'KUMAR',78,'url(#name)','font-weight="800" letter-spacing="-3"')}
  ${curiosityField(479,161,.57)}
  ${t(29,272,'Curious about AI.',30,P.mint)}
  ${t(29,311,'Always exploring.',30,P.fg)}
  ${m(30,353,'models · training · automations',17,P.muted)}
  ${tag(29,384,111,'PYTHON',P.mint)}${tag(153,384,94,'JAVA',P.violet)}${tag(260,384,180,'SYSTEMS',P.amber)}`);
  return svg(1000,360,'Gagan Kumar — curious about AI, always exploring','Python and Java. Programming and systems foundations. Learning AI models, training and automations. An original animated mathematical weave represents curiosity through code.',`
  <path d="M32 2H968" stroke="url(#spectrum)" stroke-width="3"/>
  ${m(34,39,'GAGAN / AI & SOFTWARE',14,P.mint)}${m(966,39,'RESEARCH • LEARN • BUILD',12,P.muted,'text-anchor="end"')}
  ${t(29,144,'GAGAN KUMAR',77,'url(#name)','font-weight="800" letter-spacing="-3"')}
  ${t(34,196,'Curious about AI. Always exploring.',27,P.fg)}
  ${m(35,232,'> models · training · automations',16,P.muted)}
  <rect class="cursor" x="360" y="219" width="8" height="16" fill="${P.mint}"/>
  ${tag(34,273,104,'PYTHON',P.mint)}${tag(150,273,86,'JAVA',P.violet)}${tag(248,273,183,'COMPUTER SYSTEMS',P.amber)}
  ${curiosityField(817,180,.89)}
  <path d="M34 330H968" stroke="#263850"/>
  ${m(34,349,'A WORK IN PROGRESS. A MIND IN MOTION.',10,P.muted)}`);
}
function learning(mobile=false){
  const labels=['RESEARCH','EXPERIMENT','UNDERSTAND','IMPROVE'];
  const colours=[P.mint,P.violet,P.amber,P.mint];
  if(mobile){return svg(600,158,'Research, experiment, understand, improve','My learning loop.',`
  <path class="flow" d="M130 43H470V117H130" fill="none" stroke="url(#spectrum)" stroke-width="2"/>
  ${labels.map((s,i)=>{const x=i%2?322:27;const y=i<2?20:94;return `<rect x="${x}" y="${y}" width="250" height="44" rx="11" fill="#121e32" stroke="#39465e"/>${m(x+125,y+29,s,19,colours[i],'text-anchor="middle"')}`;}).join('')}`);}
  return svg(1000,91,'Research, experiment, understand, improve','My learning loop. A decorative signal flows between four stages.',`
  <path d="M120 46H880" stroke="#34435e" stroke-width="2"/><path class="flow" d="M120 46H880" stroke="url(#spectrum)" stroke-width="2"/>
  ${labels.map((s,i)=>{const x=23+i*247;return `<rect x="${x}" y="23" width="213" height="44" rx="12" fill="#121e32" stroke="#3b4963"/>${m(x+106.5,51,s,16,colours[i],'text-anchor="middle"')}`;}).join('')}`);
}
const files={'curiosity.svg':hero(),'curiosity-mobile.svg':hero(true),'learning-loop.svg':learning(),'learning-loop-mobile.svg':learning(true)};
// Matching light-theme artwork. All labels and geometry stay identical.
const lightColours={
  '#0b1223':'#f7f9fc','#f4f7ff':'#14243b','#b2bfd6':'#596783',
  '#6aead8':'#007f73','#c5b0ff':'#7757b4','#ffd291':'#9d5a16',
  '#ffffff':'#14243b','#c7caff':'#485780','#a79aff':'#7b62b9',
  '#5f3ba2':'#cfc9e3','#0c766f':'#3db5a6','#3d4964':'#a4b0c4',
  '#303b56':'#d7dfeb','#151f34':'#edf2f8','#35425b':'#c9d4e5',
  '#263850':'#d3dce8','#45516c':'#a8b5ca','#62bfb9':'#257f7d',
  '#8b89bd':'#846aa8','#34435e':'#c4d0df','#121e32':'#eef3fa',
  '#39465e':'#c9d3e3','#3b4963':'#cbd5e5'
};
for(const [name,content] of Object.entries(files)){
  files[name.replace('.svg','-light.svg')]=content.replace(/#[0-9a-f]{6}/gi,colour=>lightColours[colour]??colour);
}
for(const [name,content] of Object.entries(files))await writeFile(path.join(dest,name),content);
console.log(`Built ${Object.keys(files).length} AI-lab assets.`);
