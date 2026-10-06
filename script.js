/* =====================================
   SMOOTH CURSOR TRAIL
===================================== */

const cursor =
document.querySelector(".cursor");

const dot =
document.querySelector(".cursor-dot");

const path =
document.querySelector(".cursor-path");



/* =====================================
   SETTINGS
===================================== */

const POINT_COUNT = 14;

const FOLLOW_SPEED = 0.48;

const TRAIL_SPEED = 0.52;



/* =====================================
   MOUSE
===================================== */

let mouse = {

  x: window.innerWidth / 2,

  y: window.innerHeight / 2

};



/* =====================================
   TRAIL POINTS
===================================== */

const points = [];


for(let i = 0; i < POINT_COUNT; i++){

  points.push({

    x: mouse.x,

    y: mouse.y

  });

}



/* =====================================
   MOUSE MOVE
===================================== */

window.addEventListener(
  "mousemove",
  (event) => {

    mouse.x = event.clientX;
    mouse.y = event.clientY;


    /* 현재 마우스 아래에 있는 요소 확인 */

    const target =
      document.elementFromPoint(
        event.clientX,
        event.clientY
      );


    /* 빨간색으로 변하는 영역인지 확인 */

    const redArea =
      target?.closest(
        ".artist, .schedule-card"
      );


    if(redArea){

      cursor.classList.add(
        "is-inverted"
      );

    }else{

      cursor.classList.remove(
        "is-inverted"
      );

    }

  }
);



/* =====================================
   CREATE SMOOTH SVG PATH
===================================== */

function createPath(){

  if(points.length < 2) return "";


  let d =
    `M ${points[0].x} ${points[0].y}`;


  for(let i = 1; i < points.length - 1; i++){

    const current =
      points[i];

    const next =
      points[i + 1];


    const midX =
      (current.x + next.x) / 2;

    const midY =
      (current.y + next.y) / 2;


    d +=
      ` Q ${current.x} ${current.y}
      ${midX} ${midY}`;

  }


  return d;

}



/* =====================================
   ANIMATION
===================================== */

function animateCursor(){


  /* 첫 번째 점은 실제 마우스를 부드럽게 추적 */

  points[0].x +=
    (mouse.x - points[0].x) *
    FOLLOW_SPEED;

  points[0].y +=
    (mouse.y - points[0].y) *
    FOLLOW_SPEED;



  /* 나머지 점은 앞의 점을 따라감 */

  for(let i = 1; i < points.length; i++){

    points[i].x +=
      (points[i - 1].x - points[i].x) *
      TRAIL_SPEED;

    points[i].y +=
      (points[i - 1].y - points[i].y) *
      TRAIL_SPEED;

  }



  /* 원 위치 */

  dot.style.transform =
    `translate(
      ${points[0].x - 5}px,
      ${points[0].y - 5}px
    )`;



  /* 선 */

  path.setAttribute(
    "d",
    createPath()
  );


  requestAnimationFrame(
    animateCursor
  );

}



animateCursor();



/* =====================================
   CURSOR CLICK EFFECT
===================================== */

window.addEventListener(
  "mousedown",
  () => {

    cursor.classList.add(
      "is-clicking"
    );

  }
);


window.addEventListener(
  "mouseup",
  () => {

    cursor.classList.remove(
      "is-clicking"
    );

  }
);

const soundBars = document.getElementById("soundBars");
const soundArea = document.querySelector(".info-sound");

if(soundBars && soundArea){

  const BAR_COUNT = 72;

  /* -------------------------
     원형 막대 생성
  ------------------------- */

  for(let i = 0; i < BAR_COUNT; i++){

    const bar = document.createElement("span");

    bar.classList.add("sound-bar");

    const angle = (360 / BAR_COUNT) * i;

    bar.style.transform =
      `translate(-50%, -100%) rotate(${angle}deg)`;

    bar.dataset.angle = angle;

    soundBars.appendChild(bar);

  }


  const bars =
    soundBars.querySelectorAll(".sound-bar");


  /* -------------------------
     기본 사운드 움직임
  ------------------------- */

  let time = 0;

  function animateSound(){

    time += 0.045;

    bars.forEach((bar, index) => {

      const wave1 =
        Math.sin(time * 2 + index * .35);

      const wave2 =
        Math.sin(time * 1.3 + index * .12);

      const height =
        22 +
        ((wave1 + 1) * 9) +
        ((wave2 + 1) * 5);

      bar.style.height =
        `${height}px`;

    });

    requestAnimationFrame(animateSound);

  }

  animateSound();


  /* -------------------------
     마우스 인터랙션
  ------------------------- */

  soundArea.addEventListener(
    "mousemove",
    (event) => {

      const rect =
        soundArea.getBoundingClientRect();

      const x =
        event.clientX -
        rect.left -
        rect.width / 2;

      const y =
        event.clientY -
        rect.top -
        rect.height / 2;

      const rotateX =
        y * -.015;

      const rotateY =
        x * .015;

      soundBars.style.transform =
        `
        translate(-50%, -50%)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.04)
        `;

    }
  );


  soundArea.addEventListener(
    "mouseleave",
    () => {

      soundBars.style.transform =
        `
        translate(-50%, -50%)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
        `;

    }
  );


  /* -------------------------
     클릭하면 강한 PULSE
  ------------------------- */

  soundArea.addEventListener(
    "click",
    () => {

      bars.forEach((bar, index) => {

        const random =
          45 + Math.random() * 55;

        bar.style.height =
          `${random}px`;

        if(index % 6 === 0){

          bar.style.background =
            "#D31F1F";

        }

      });


      setTimeout(() => {

        bars.forEach((bar) => {

          bar.style.background =
            "rgba(245,245,245,.65)";

        });

      }, 350);

    }
  );

}