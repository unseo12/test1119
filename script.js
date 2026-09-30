const light =
document.querySelector(".cursor-light");

let mouseX =
window.innerWidth / 2;

let mouseY =
window.innerHeight / 2;

let lightX = mouseX;
let lightY = mouseY;


window.addEventListener(
  "mousemove",
  (event)=>{

    mouseX = event.clientX;
    mouseY = event.clientY;

  }
);


function moveLight(){

  lightX +=
  (mouseX - lightX) * .08;

  lightY +=
  (mouseY - lightY) * .08;


  light.style.left =
  lightX + "px";

  light.style.top =
  lightY + "px";


  requestAnimationFrame(moveLight);
}


moveLight();



/* =====================================
   TYPOGRAPHY MOUSE REACTION
===================================== */

const title =
document.querySelector(".floating-title");


window.addEventListener(
  "mousemove",
  (event)=>{

    const x =
    event.clientX /
    window.innerWidth - .5;

    const y =
    event.clientY /
    window.innerHeight - .5;


    title.style.marginLeft =
    `${x * 14}px`;

    title.style.marginTop =
    `${y * 9}px`;

  }
);