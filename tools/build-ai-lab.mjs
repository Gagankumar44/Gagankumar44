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
<radialGradient id="wash"><stop stop-color="#5f3ba2" stop-opacity=".35"/><stop offset="1" stop-color="#0b1223" stop-opacity="0"/></radialGradient>
<radialGradient id="cyan"><stop stop-color="#0c766f" stop-opacity=".2"/><stop offset="1" stop-color="#0b1223" stop-opacity="0"/></radialGradient>
<pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="12" cy="12" r=".8" fill="#3d4964" opacity=".5"/></pattern>
<clipPath id="edge"><rect width="${w}" height="${h}" rx="20"/></clipPath>
</defs>
<style>text{font-family:Arial,Helvetica,sans-serif}.mono{font-family:'Courier New',monospace}.spin{transform-box:fill-box;transform-origin:center;animation:orbit 19s linear infinite}.reverse{animation-direction:reverse;animation-duration:28s}.flow{stroke-dasharray:6 13;animation:flow 5s linear infinite}.glimmer{animation:glimmer 4s ease-in-out infinite}.cursor{animation:cursor 2.4s steps(1,end) infinite}@keyframes orbit{to{transform:rotate(360deg)}}@keyframes flow{to{stroke-dashoffset:-190}}@keyframes glimmer{0%,100%{opacity:.55}50%{opacity:1}}@keyframes cursor{0%,60%{opacity:1}61%,100%{opacity:.2}}@media(prefers-reduced-motion:reduce){*{animation:none!important}}</style>
<g clip-path="url(#edge)"><rect width="${w}" height="${h}" fill="${P.bg}"/><rect width="${w}" height="${h}" fill="url(#dots)"/><ellipse cx="${w*.85}" cy="${h*.45}" rx="${w*.32}" ry="${h*.8}" fill="url(#wash)"/><ellipse cx="${w*.2}" cy="${h}" rx="${w*.5}" ry="${h*.8}" fill="url(#cyan)"/>${body}</g>
<rect x=".5" y=".5" width="${w-1}" height="${h-1}" rx="20" fill="none" stroke="#303b56"/>
</svg>\n`;}
function tag(x,y,w,label,colour){return `<rect x="${x}" y="${y}" width="${w}" height="33" rx="16.5" fill="#151f34" stroke="#35425b"/>${m(x+w/2,y+22,label,12,colour,'text-anchor="middle"')}`;}
function constellation(cx,cy,scale=1){return `<g transform="translate(${cx},${cy}) scale(${scale})">
<circle r="140" fill="none" stroke="#293750"/><circle r="111" fill="none" stroke="#35415d" stroke-dasharray="2 9"/>
<g class="spin"><circle r="140" fill="none" stroke="url(#spectrum)" stroke-width="2" stroke-dasharray="90 790"/><circle cx="140" cy="0" r="5" fill="${P.mint}"/></g>
<g class="spin reverse"><circle r="96" fill="none" stroke="${P.violet}" stroke-width="1.5" stroke-dasharray="43 560"/></g>
<path d="M-88 -74L0 0L104 -23M0 0L-14 114M-88 -74L104 -23L-14 114Z" fill="none" stroke="#485775" stroke-width="1.5"/>
<path class="flow" d="M-88 -74L0 0L104 -23M0 0L-14 114" fill="none" stroke="url(#spectrum)" stroke-width="2"/>
<rect x="-45" y="-45" width="90" height="90" rx="24" fill="#18243c" stroke="${P.violet}" stroke-width="1.5"/>
${t(0,13,'AI',36,P.fg,'font-weight="700" text-anchor="middle"')}
<circle cx="-88" cy="-74" r="20" fill="#132c34" stroke="${P.mint}"/>${m(-88,-69,'<>',16,P.mint,'text-anchor="middle"')}
<circle cx="104" cy="-23" r="20" fill="#29213e" stroke="${P.violet}"/>${t(104,-17,'{ }',16,P.violet,'text-anchor="middle"')}
<circle class="glimmer" cx="-14" cy="114" r="17" fill="#352b25" stroke="${P.amber}"/>${m(-14,119,'?',17,P.amber,'text-anchor="middle"')}
</g>`;}
function hero(mobile=false){
  if(mobile)return svg(600,446,'Gagan Kumar — curious about AI, always exploring','Python and Java. Programming and systems foundations. Learning AI models, training and automations.',`
  <path d="M28 2H572" stroke="url(#spectrum)" stroke-width="3"/>
  ${m(28,43,'GAGAN / AI & SOFTWARE',16,P.mint)}
  ${t(25,139,'GAGAN',78,'url(#name)','font-weight="800" letter-spacing="-3"')}
  ${t(25,216,'KUMAR',78,'url(#name)','font-weight="800" letter-spacing="-3"')}
  ${constellation(479,170,.57)}
  ${t(29,272,'Curious about AI.',30,P.mint)}
  ${t(29,311,'Always exploring.',30,P.fg)}
  ${m(30,353,'models · training · automations',17,P.muted)}
  ${tag(29,384,111,'PYTHON',P.mint)}${tag(153,384,94,'JAVA',P.violet)}${tag(260,384,180,'SYSTEMS',P.amber)}`);
  return svg(1000,360,'Gagan Kumar — curious about AI, always exploring','Python and Java. Programming and systems foundations. Learning AI models, training and automations. An animated constellation connects code with curiosity.',`
  <path d="M32 2H968" stroke="url(#spectrum)" stroke-width="3"/>
  ${m(34,39,'GAGAN / AI & SOFTWARE',14,P.mint)}${m(966,39,'RESEARCH • LEARN • BUILD',12,P.muted,'text-anchor="end"')}
  ${t(29,144,'GAGAN KUMAR',77,'url(#name)','font-weight="800" letter-spacing="-3"')}
  ${t(34,196,'Curious about AI. Always exploring.',27,P.fg)}
  ${m(35,232,'> models · training · automations',16,P.muted)}
  <rect class="cursor" x="360" y="219" width="8" height="16" fill="${P.mint}"/>
  ${tag(34,273,104,'PYTHON',P.mint)}${tag(150,273,86,'JAVA',P.violet)}${tag(248,273,183,'COMPUTER SYSTEMS',P.amber)}
  ${constellation(817,187,.86)}
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
const files={'hero.svg':hero(),'hero-mobile.svg':hero(true),'learning-loop.svg':learning(),'learning-loop-mobile.svg':learning(true)};
for(const [name,content] of Object.entries(files))await writeFile(path.join(dest,name),content);
console.log(`Built ${Object.keys(files).length} AI-lab assets.`);
