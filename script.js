/* =====================================
   DFY STYLE CURSOR TRAIL
===================================== */
const light =
document.querySelector(".cursor-light");


let mouseX =
window.innerWidth / 2;

let mouseY =
window.innerHeight / 2;


let cursorX = mouseX;
let cursorY = mouseY;


let previousX = mouseX;
let previousY = mouseY;


/* 마우스 위치 */

window.addEventListener(
  "mousemove",
  (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

  }
);



function moveLight(){

  /* 커서가 마우스를 부드럽게 따라감 */

  cursorX +=
    (mouseX - cursorX) * 0.22;

  cursorY +=
    (mouseY - cursorY) * 0.22;



  /* 이동 거리 계산 */

  const dx =
    cursorX - previousX;

  const dy =
    cursorY - previousY;


  const speed =
    Math.sqrt(
      dx * dx +
      dy * dy
    );



  /* 이동 방향 */

  const angle =
    Math.atan2(dy, dx) *
    180 / Math.PI;



  /*
    움직일수록 원이 길어짐

    정지 = 18px 원
    빠른 이동 = 최대 95px 선
  */

  const length =
    Math.min(
      18 + speed * 8,
      95
    );



  light.style.left =
    cursorX + "px";

  light.style.top =
    cursorY + "px";


  light.style.width =
    length + "px";


  light.style.transform =
    `translate(-9px, -50%) rotate(${angle}deg)`;



  previousX = cursorX;
  previousY = cursorY;


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
  (event) => {

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