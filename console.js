const state={step:0,nature:null,title:"",era:"",places:"",characters:"",sources:"",audience:"",format:"",thesis:"",scenes:[]};
const steps=["NUEVA OBRA","NATURALEZA","FICHA","BIBLIA","ESCENAS","PRODUCCIÓN","QA","PUBLICACIÓN"];
const $=s=>document.querySelector(s);
function esc(v){return String(v??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function renderSteps(){document.querySelector("#steps").innerHTML=steps.map((x,i)=>`<div class="step ${i===state.step?"active":i<state.step?"done":""}">${String(i+1).padStart(2,"0")} · ${x}</div>`).join("")}
function panel(title,text,body,actions=true){$("#workspace").innerHTML=`<div class="panel"><span class="eyebrow">ETAPA ${String(state.step+1).padStart(2,"0")} · ${steps[state.step]}</span><h2>${title}</h2><p>${text}</p>${body}${actions?'<div class="actions"><button class="back" onclick="prev()">← Atrás</button><button class="next" onclick="next()">Continuar →</button></div>':""}</div>`}
function render(){
 renderSteps();
 if(state.step===0)panel("Crear una nueva obra","La consola empieza con una ficha vacía. Nada se publica desde aquí sin pasar por el proceso editorial.",`<div class="notice">La obra tendrá identidad propia, pero compartirá el canon territorial de la Fábrica. El lector final nunca verá esta consola.</div>`);
 if(state.step===1)panel("¿Qué clase de historia es?","Elegí la naturaleza principal. La clasificación controla documentación, lenguaje editorial y tratamiento de la verdad.",`<div class="grid">${[
["HISTORIA","Hechos documentados","La obra reconstruye un proceso histórico."],
["MEMORIA","Testimonios y recuerdos","La memoria se identifica como memoria."],
["TERRITORIO","Inspirada en Chañar","El lugar es protagonista, sin afirmar hechos históricos."],
["FICCIÓN","Personajes inventados","Historia narrativa creada dentro del territorio."],
["HISTORIA + FICCIÓN","Real + inventado","Las capas deben quedar claramente diferenciadas."]
].map((x,i)=>`<button class="choice ${state.nature===x[0]?"selected":""}" onclick="state.nature='${x[0]}';render()"><b>0${i+1}</b><strong>${x[0]}</strong><small>${x[1]} · ${x[2]}</small></button>`).join("")}</div>`);
 if(state.step===2)panel("Ficha maestra","Estos datos alimentan todas las etapas posteriores.",`<div class="fields">
${field("title","Título provisional",state.title,"")}
${field("era","Época / período",state.era,"Ej.: década de 1970")}
${field("places","Lugares","",state.places)}
${field("characters","Personajes","",state.characters)}
${field("audience","Público","",state.audience)}
${field("format","Formato","",state.format)}
${field("sources","Fuentes / testimonios","",state.sources,true)}
</div>`);
 if(state.step===3)panel("Biblia de la obra","La biblia fija las reglas narrativas antes de producir escenas.",`<div class="fields">${field("thesis","Idea central","",state.thesis,true)}</div><div class="notice">La biblia definirá tono, protagonistas, conflicto, límites de ficción, elementos históricos inmutables, continuidad territorial y lenguaje visual.</div>`);
 if(state.step===4)panel("Construir escenas","Primero se ordena la narración. Después se ilustra.",`<div id="sceneList"></div><div class="actions"><button class="next" onclick="addScene()">+ Agregar escena</button></div>`,false);
 if(state.step===5)panel("Producción","La obra entra en producción solamente cuando ficha, naturaleza, biblia y escenas están definidas.",`<div class="summary"><div><span>OBRA</span><b>${esc(state.title)||"Sin título"}</b></div><div><span>NATURALEZA</span><b>${esc(state.nature)||"Pendiente"}</b></div><div><span>ESCENAS</span><b>${state.scenes.length}</b></div></div><div class="notice">Producción futura: modelos de personajes → modelos territoriales → storyboard → ilustración → lettering → continuidad.</div>`);
 if(state.step===6)panel("Control de calidad","Antes de publicar, la obra debe pasar controles de contenido, continuidad, lectura, accesibilidad y funcionamiento.",`<div class="grid"><div class="choice"><b>01</b><strong>CONTINUIDAD</strong><small>Personajes, lugares, objetos y cronología.</small></div><div class="choice"><b>02</b><strong>VERDAD</strong><small>Separación clara entre documentación, memoria e invención.</small></div><div class="choice"><b>03</b><strong>LECTURA</strong><small>Ritmo, textos, navegación y comprensión.</small></div><div class="choice"><b>04</b><strong>MULTIPLATAFORMA</strong><small>Móvil, escritorio y distintos tamaños.</small></div></div>`);
 if(state.step===7)panel("Publicar","La obra ya está preparada para salir de la fábrica.",`<div class="summary"><div><span>TÍTULO</span><b>${esc(state.title)||"Sin título"}</b></div><div><span>TIPO</span><b>${esc(state.nature)||"Pendiente"}</b></div><div><span>ESTADO</span><b>LISTA PARA PUBLICACIÓN</b></div></div><div class="notice">Publicar significa generar una experiencia lectora independiente. La consola permanece privada y sigue siendo el archivo de producción.</div>`,false);
}
function field(id,label,value,placeholder="",full=false){return `<div class="field ${full?"full":""}"><label>${label}</label><input id="${id}" value="${esc(value)}" placeholder="${placeholder}"></div>`}
function sync(){["title","era","places","characters","audience","format","sources","thesis"].forEach(k=>{const e=$("#"+k);if(e)state[k]=e.value})}
function next(){sync();if(state.step===1&&!state.nature){alert("Elegí la naturaleza narrativa antes de continuar.");return}if(state.step===2&&!state.title){alert("Definí al menos un título provisional.");return}if(state.step<7)state.step++;render()}
function prev(){sync();if(state.step>0)state.step--;render()}
function addScene(){state.scenes.push({title:"Escena "+String(state.scenes.length+1).padStart(2,"0"),purpose:"Definir función narrativa"});render();renderScenes()}
function renderScenes(){const el=$("#sceneList");if(!el)return;el.innerHTML=state.scenes.map((s,i)=>`<div class="scene"><div class="scene-num">${String(i+1).padStart(2,"0")}</div><div><b contenteditable="true" oninput="state.scenes[${i}].title=this.innerText">${esc(s.title)}</b><p contenteditable="true" oninput="state.scenes[${i}].purpose=this.innerText">${esc(s.purpose)}</p></div><span class="tag">PLANEADA</span></div>`).join("")||'<div class="notice">Todavía no hay escenas. La historia se construye una escena por vez.</div>'}
setInterval(()=>$("#clock").textContent=new Date().toLocaleTimeString("es-AR",{hour:"2-digit",minute:"2-digit"}),1000);
render();
