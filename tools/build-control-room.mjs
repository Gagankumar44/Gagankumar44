import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Original code-native artwork. No scripts, external fonts or remote services
// are embedded in the SVGs. Rebuild with: node tools/build-control-room.mjs
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'control-room');
await mkdir(out, { recursive: true });
const C = { bg: '#080f18', panel: '#101c2a', edge: '#243849', white: '#eef6fc', muted: '#9bb1c3', cyan: '#52e0ef', green: '#b7f76b' };
const esc = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const text = (x,y,s,size=18,fill=C.white,extra='') => `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" ${extra}>${esc(s)}</text>`;
const mono = (x,y,s,size=13,fill=C.muted,extra='') => text(x,y,s,size,fill,`class="mono" ${extra}`);
const line = (x1,y1,x2,y2,stroke=C.edge,extra='') => `<path d="M${x1} ${y1}H${x2}" stroke="${stroke}" ${extra}/>`;
const circle = (x,y,r,fill,extra='') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
function shell(w,h,title,desc,body,css='') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc">
<title id="title">${esc(title)}</title><desc id="desc">${esc(desc)}</desc>
<defs><pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#163044" stroke-width=".5"/></pattern><radialGradient id="glow"><stop stop-color="#143947" stop-opacity=".85"/><stop offset="1" stop-color="#080f18" stop-opacity="0"/></radialGradient><linearGradient id="bar"><stop stop-color="#52e0ef"/><stop offset="1" stop-color="#b7f76b"/></linearGradient></defs>
<style>text{font-family:Arial,Helvetica,sans-serif}.mono{font-family:'Courier New',monospace}.spin{transform-box:fill-box;transform-origin:center;animation:spin 16s linear infinite}.pulse{animation:pulse 3.8s ease-in-out infinite}.flow{stroke-dasharray:8 12;animation:flow 5s linear infinite}.draw{stroke-dasharray:600;animation:draw 5s ease-in-out infinite}.cursor{animation:cursor 2.4s steps(1,end) infinite}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{0%,100%{opacity:.35}50%{opacity:1}}@keyframes flow{to{stroke-dashoffset:-160}}@keyframes draw{0%,12%{stroke-dashoffset:600}65%,100%{stroke-dashoffset:0}}@keyframes cursor{0%,55%{opacity:1}56%,100%{opacity:.25}}${css}@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}</style>
<rect x=".5" y=".5" width="${w-1}" height="${h-1}" rx="16" fill="${C.bg}" stroke="${C.edge}"/>
${body}</svg>\n`;
}
function network(cx,cy,r) {
  return `<circle cx="${cx}" cy="${cy}" r="${r+48}" fill="url(#glow)"/>
  <g fill="none" stroke="${C.edge}"><circle cx="${cx}" cy="${cy}" r="${r}"/><circle cx="${cx}" cy="${cy}" r="${r*.72}"/><circle cx="${cx}" cy="${cy}" r="${r*.39}"/><path d="M${cx-r-15} ${cy}H${cx+r+15}M${cx} ${cy-r-15}V${cy+r+15}" stroke-dasharray="3 7"/></g>
  <g class="spin"><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.cyan}" stroke-width="2" stroke-dasharray="44 ${r*6.283-44}"/>${circle(cx+r,cy,4,C.cyan)}</g>
  <path d="M${cx-r*.76} ${cy+r*.34}L${cx-r*.38} ${cy-r*.48}L${cx+r*.5} ${cy-r*.26}L${cx+r*.4} ${cy+r*.55}L${cx-r*.76} ${cy+r*.34}L${cx} ${cy}L${cx+r*.5} ${cy-r*.26}" fill="none" stroke="#315d70" stroke-width="1.4"/>
  <path class="flow" d="M${cx-r*.76} ${cy+r*.34}L${cx} ${cy}L${cx+r*.5} ${cy-r*.26}" fill="none" stroke="${C.cyan}" stroke-width="2"/>
  ${circle(cx-r*.76,cy+r*.34,5,C.cyan)}${circle(cx-r*.38,cy-r*.48,4,C.muted)}${circle(cx+r*.5,cy-r*.26,6,C.green,'class="pulse"')}${circle(cx+r*.4,cy+r*.55,4,C.muted)}
  <rect x="${cx-29}" y="${cy-21}" width="58" height="42" rx="9" fill="${C.panel}" stroke="${C.cyan}"/>
  ${mono(cx,cy+7,'GK',20,C.white,'text-anchor="middle" font-weight="bold"')}`;
}
function hero(mobile=false) {
  if (mobile) return shell(600,570,'Gagan Kumar — Developer control room','Creative builder exploring design, code and AI. A conceptual idea network animates beside the profile identity.',`
  <rect x="1" y="1" width="598" height="568" rx="16" fill="url(#grid)"/>
  ${mono(28,39,'GAGAN / CONTROL ROOM',17,C.cyan)}${circle(560,33,4,C.green,'class="pulse"')}${line(28,59,572,59)}
  ${mono(30,102,'CREATIVE BUILDER',16,C.muted)}
  ${text(27,184,'GAGAN',86,C.white,'font-weight="800" letter-spacing="-4"')}
  ${text(27,270,'KUMAR',86,C.white,'font-weight="800" letter-spacing="-4"')}
  ${text(31,320,'Ideas become experiments.',25,C.cyan)}
  ${text(31,354,'Experiments become understanding.',23,C.white)}
  ${network(478,442,62)}
  ${mono(31,421,'> design. build. learn.',18,C.green)}
  ${mono(31,455,'Visual stories × useful software',14,C.muted)}
  ${line(28,506,572,506)}
  ${mono(30,543,'DESIGN / CODE / AI',17,C.white)}${mono(569,543,'01',17,C.cyan,'text-anchor="end"')}`);
  return shell(1000,432,'Gagan Kumar — Developer control room','Creative builder. Ideas become experiments; experiments become understanding. Design, code and AI, with an animated conceptual idea network.',`
  <rect x="1" y="1" width="998" height="430" rx="16" fill="url(#grid)"/>
  ${mono(32,37,'GAGAN / CONTROL ROOM',14,C.cyan)}${mono(968,37,'DESIGN  /  CODE  /  AI',13,C.muted,'text-anchor="end"')}${line(32,57,968,57)}
  ${mono(36,104,'CREATIVE BUILDER',15,C.muted)}
  ${text(30,191,'GAGAN KUMAR',75,C.white,'font-weight="800" letter-spacing="-2"')}
  ${text(35,237,'Ideas become experiments.',27,C.cyan)}
  ${text(35,273,'Experiments become understanding.',25,C.white)}
  ${mono(36,326,'> design. build. learn.',17,C.green)}<rect class="cursor" x="275" y="312" width="9" height="17" fill="${C.green}"/>
  ${network(815,212,112)}
  ${mono(815,354,'THE IDEA NETWORK',12,C.muted,'text-anchor="middle"')}
  ${line(32,379,968,379)}${circle(39,405,3,C.green,'class="pulse"')}${mono(51,410,'ALWAYS LEARNING',12,C.muted)}
  ${mono(968,410,'VISUAL STORIES × USEFUL SOFTWARE',12,C.muted,'text-anchor="end"')}`);
}
function project({slug,index,title,kicker,colour,kind}) {
  const icon = kind==='motion' ? `
    <rect x="785" y="45" width="159" height="94" rx="9" fill="${C.panel}" stroke="#395260"/>
    <path d="M795 59H934M795 126H934" stroke="#395260" stroke-dasharray="5 7"/>
    <path d="M843 77L843 110L871 94Z" fill="${colour}"/>
    <path class="flow" d="M766 157H949" stroke="${colour}" stroke-width="2"/>
    <circle class="pulse" cx="901" cy="157" r="4" fill="${colour}"/>` : kind==='utility' ? `
    <path d="M787 140H944" stroke="#395260"/>
    <rect x="804" y="94" width="27" height="46" rx="4" fill="#24414d"/><rect x="851" y="67" width="27" height="73" rx="4" fill="#2b6973"/><rect x="898" y="42" width="27" height="98" rx="4" fill="${colour}"/>
    <path class="draw" d="M791 80L837 58L880 73L936 31" fill="none" stroke="${C.white}" stroke-width="2"/>` : `
    <rect x="799" y="46" width="126" height="96" rx="9" fill="${C.panel}" stroke="#395260"/>
    <path d="M815 67H903M815 87H879M815 107H894" stroke="#466578" stroke-width="4"/>
    <path class="flow" d="M779 159H945" fill="none" stroke="${colour}" stroke-width="2"/>
    <rect class="pulse" x="896" y="112" width="47" height="41" rx="7" fill="${C.panel}" stroke="${colour}"/>
    ${text(920,140,'+',27,colour,'text-anchor="middle"')}`;
  return shell(1000,190,`${title} — ${kicker}`,`Project ${index}: ${title}. ${kicker}. Decorative animation; no live analytics.`,`
  <path d="M1 20V170" stroke="${colour}" stroke-width="3"/>
  ${mono(30,40,`${index} / PROJECT ARCHIVE`,14,colour)}
  ${text(27,103,title,46,C.white,'font-weight="700" letter-spacing="-1"')}
  ${mono(30,146,kicker.toUpperCase(),16,C.muted)}
  ${icon}`);
}
const assets = {
 'hero.svg':hero(), 'hero-mobile.svg':hero(true),
 'project-hero-vault.svg':project({index:'01',title:'Hero Vault',kicker:'Motion study',colour:C.cyan,kind:'motion'}),
 'project-expense-tracker.svg':project({index:'02',title:'Expense Tracker',kicker:'Browser prototype',colour:C.green,kind:'utility'}),
 'project-gagcodes.svg':project({index:'03',title:'GaGcodes',kicker:'Early concept',colour:'#b5a4ff',kind:'concept'}),
 'next-mission.svg':shell(1000,150,'Next mission: make something worth opening','Have an interesting problem? Let’s talk design, experiments and useful software.',`
  ${mono(30,35,'NEXT MISSION / OPEN ENDED',13,C.green)}
  ${text(28,83,'MAKE SOMETHING WORTH OPENING.',34,C.white,'font-weight="700" letter-spacing="-.8"')}
  <path d="M30 118H970" stroke="${C.edge}"/>
  <path class="flow" d="M30 118H970" stroke="${C.cyan}" stroke-width="2"/>
  ${circle(968,35,5,C.green,'class="pulse"')}`),
 'avatar.svg':shell(512,512,'GK — Gagan Kumar','A cyan and green GK monogram inside a dark control-room frame.',`
  <rect x="32" y="32" width="448" height="448" rx="62" fill="${C.panel}" stroke="#294959" stroke-width="2"/>
  <path d="M65 151V104Q65 65 104 65H153M359 65H408Q447 65 447 104V153M447 359V408Q447 447 408 447H359M153 447H104Q65 447 65 408V359" fill="none" stroke="${C.cyan}" stroke-width="6"/>
  ${text(250,316,'GK',172,C.white,'text-anchor="middle" font-weight="800" letter-spacing="-16"')}
  <path d="M154 358H354" stroke="url(#bar)" stroke-width="9"/>
  ${circle(406,110,9,C.green)}`),
};
for (const name of ['project-hero-vault','project-expense-tracker','project-gagcodes']) {
  assets[name+'-mobile.svg'] = assets[name+'.svg']
    .replace('width="1000" height="190" viewBox="0 0 1000 190"','width="650" height="190" viewBox="0 0 650 190"')
    .replace('width="999" height="189"','width="649" height="189"');
}
assets['next-mission-mobile.svg'] = shell(600,172,'Next mission: make something worth opening','Connect with Gagan to explore design and useful software.',`
${mono(25,33,'NEXT MISSION / OPEN ENDED',16,C.green)}
${text(24,81,'MAKE SOMETHING',34,C.white,'font-weight="700"')}
${text(24,122,'WORTH OPENING.',34,C.white,'font-weight="700"')}
<path d="M25 148H575" stroke="${C.edge}"/>
<path class="flow" d="M25 148H575" stroke="${C.cyan}" stroke-width="2"/>`);
for (const [name,data] of Object.entries(assets)) await writeFile(path.join(out,name),data);
console.log(`Built ${Object.keys(assets).length} SVG assets.`);
