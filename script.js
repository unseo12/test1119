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