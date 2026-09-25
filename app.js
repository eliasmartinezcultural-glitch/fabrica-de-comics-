const works=[
{id:"luna",type:"ficcion",label:"FICCIÓN TERRITORIAL",title:"Luna en Villa Pelón",desc:"Una aventura de misterio, memoria y descubrimiento dentro de un Chañar narrativo.",age:"8+ ",state:"EN PRODUCCIÓN"},
{id:"origen",type:"historica",label:"HISTORIA",title:"El nacimiento de un pueblo",desc:"Relato ilustrado sobre la formación de San Patricio del Chañar y sus primeras etapas.",age:"9+",state:"INVESTIGACIÓN"},
{id:"agua",type:"mixta",label:"HISTORIA + FICCIÓN",title:"El camino del agua",desc:"Una historia ficticia que acompaña el proceso real de transformación del territorio mediante el agua.",age:"8+",state:"CONCEPTO"},
{id:"bicicleta",type:"ficcion",label:"FICCIÓN",title:"La bicicleta roja",desc:"Una niña encuentra una bicicleta antigua y comienza a reconstruir las historias que dejó en el pueblo.",age:"7+",state:"CONCEPTO"},
{id:"escuela",type:"historica",label:"HISTORIA",title:"La escuela de la esquina",desc:"Historias de escuela, familias y comunidad construidas desde documentación y testimonios.",age:"8+",state:"ARCHIVO"},
{id:"voces",type:"memoria",label:"MEMORIA",title:"Voces de Chañar",desc:"Colección de relatos breves nacidos de recuerdos, fotografías y conversaciones con habitantes.",age:"TODO PÚBLICO",state:"ARCHIVO"}];
const $=s=>document.querySelector(s), worksEl=$("#works");
function render(filter="todas"){const list=filter==="todas"?works:works.filter(x=>x.type===filter);worksEl.innerHTML=list.map(x=>`<article class="card"><div><span class="type">${x.label}</span><h3>${x.title}</h3><p>${x.desc}</p></div><div class="card-foot"><span>${x.state}</span><span>${x.age}</span></div></article>`).join("");$("#count").textContent=list.length+" "+(list.length===1?"obra":"obras")}
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");render(b.dataset.filter);$("#factory").scrollIntoView({behavior:"smooth"})});
$("#openFactory").onclick=()=>{$("#factory").classList.remove("hidden");render();$("#factory").scrollIntoView({behavior:"smooth"})};
$("#openMap").onclick=()=>{$("#system").classList.remove("hidden");$("#system").scrollIntoView({behavior:"smooth"})};
render();
