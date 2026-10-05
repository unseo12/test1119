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



/* =====================================
   MOUSE POSITION
===================================== */

window.addEventListener(
  "mousemove",
  (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

  }
);



/* =====================================
   CURSOR ANIMATION
===================================== */

function moveLight(){

  /* 마우스를 부드럽게 따라가기 */

  cursorX +=
    (mouseX - cursorX) * 0.22;

  cursorY +=
    (mouseY - cursorY) * 0.22;



  /* 이동 방향과 속도 */

  const dx =
    cursorX - previousX;

  const dy =
    cursorY - previousY;


  const speed =
    Math.sqrt(
      dx * dx +
      dy * dy
    );


  const angle =
    Math.atan2(dy, dx) *
    180 / Math.PI;



  /* 움직이는 속도에 따라 길이 변경 */

  const length =
    Math.min(
      18 + speed * 8,
      95
    );



  /* 위치 */

  light.style.left =
    cursorX + "px";

  light.style.top =
    cursorY + "px";



  /* 원 → 선 */

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