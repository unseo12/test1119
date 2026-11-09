
/* ==========================================
   PENTAPORT ROCK FESTIVAL 2035
   COMPLETE JAVASCRIPT
========================================== */


/* ==========================================
   01. CUSTOM CURSOR TRAIL
========================================== */

(() => {
  const cursor = document.querySelector(".cursor");

  if (!cursor) return;

  const svg = cursor.querySelector(".cursor-trail");
  const path = cursor.querySelector(".cursor-path");
  const dot = cursor.querySelector(".cursor-dot");

  if (!svg || !path || !dot) return;

  const isTouchDevice = window.matchMedia(
    "(pointer: coarse)"
  ).matches;

  if (isTouchDevice) {
    cursor.style.display = "none";
    return;
  }

  // 기존 커서 움직임 설정값
  const POINT_COUNT = 14;
  const FOLLOW_SPEED = 0.48;
  const TRAIL_SPEED = 0.52;

  const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };

  const points = Array.from(
    { length: POINT_COUNT },
    () => ({
      x: mouse.x,
      y: mouse.y
    })
  );

  let cursorVisible = false;

  function moveCursor(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    if (!cursorVisible) {
      cursorVisible = true;
      cursor.style.opacity = "1";

      points.forEach((point) => {
        point.x = mouse.x;
        point.y = mouse.y;
      });
    }
  }

  window.addEventListener(
    "mousemove",
    moveCursor,
    { passive: true }
  );

  window.addEventListener("mousedown", () => {
    cursor.classList.add("is-clicking");
  });

  window.addEventListener("mouseup", () => {
    cursor.classList.remove("is-clicking");
  });

  // 링크 위에서는 커서 색상 반전
  document.addEventListener("mouseover", (event) => {
    if (event.target.closest("a, button, summary")) {
      cursor.classList.add("is-inverted");
    } else {
      cursor.classList.remove("is-inverted");
    }
  });

  document.addEventListener("mouseout", (event) => {
    if (event.target.closest("a, button, summary")) {
      cursor.classList.remove("is-inverted");
    }
  });

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
    cursorVisible = false;
  });

  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
  });

  function animateCursor() {
    // 첫 번째 포인트는 마우스를 빠르게 따라감
    points[0].x +=
      (mouse.x - points[0].x) * FOLLOW_SPEED;

    points[0].y +=
      (mouse.y - points[0].y) * FOLLOW_SPEED;

    // 나머지 포인트는 앞 포인트를 따라감
    for (let i = 1; i < points.length; i++) {
      const previous = points[i - 1];
      const current = points[i];

      current.x +=
        (previous.x - current.x) * TRAIL_SPEED;

      current.y +=
        (previous.y - current.y) * TRAIL_SPEED;
    }

    // 커서 끝 점
    dot.style.left = `${points[0].x}px`;
    dot.style.top = `${points[0].y}px`;

    // SVG 크기
    svg.setAttribute(
      "viewBox",
      `0 0 ${window.innerWidth} ${window.innerHeight}`
    );

    // 부드러운 커서 궤적
    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const point = points[i];

      d += ` L ${point.x} ${point.y}`;
    }

    path.setAttribute("d", d);

    requestAnimationFrame(animateCursor);
  }

  cursor.style.opacity = "0";

  animateCursor();
})();


/* ==========================================
   02. SCROLL REVEAL ANIMATION
========================================== */

(() => {
  const revealElements =
    document.querySelectorAll(".reveal");

  if (!revealElements.length) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (
    reducedMotion ||
    !("IntersectionObserver" in window)
  ) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
})();


/* ==========================================
   03. LINEUP / SCHEDULE FILTER
========================================== */

(() => {
  const filterButtons =
    document.querySelectorAll(".filter-btn");

  if (!filterButtons.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const parent = button.closest(".filter-row");

      if (!parent) return;

      parent.querySelectorAll(".filter-btn").forEach(
        (item) => item.classList.remove("is-active")
      );

      button.classList.add("is-active");

      const selected =
        button.dataset.filter || "all";

      const container =
        parent.nextElementSibling;

      if (!container) return;

      const items = container.querySelectorAll(
        ".artist, .schedule-card"
      );

      items.forEach((item) => {
        const categories = (
          item.dataset.category || ""
        ).split(/\s+/);

        const show =
          selected === "all" ||
          categories.includes(selected);

        item.hidden = !show;
      });
    });
  });
})();


/* ==========================================
   04. NAVIGATION ACTIVE STATE
========================================== */

(() => {
  const currentPage =
    window.location.pathname.split("/").pop()
    || "index.html";

  const navLinks = document.querySelectorAll(
    "nav a"
  );

  navLinks.forEach((link) => {
    const target =
      link.getAttribute("href") || "";

    if (target === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });
})();


/* ==========================================
   05. 2006 → 2035 YEAR JOURNEY
========================================== */

(() => {
  const section =
    document.querySelector(".year-journey");

  if (!section) return;

  const stage =
    section.querySelector(".year-stage-inner");

  const year =
    section.querySelector(".year-number");

  const celebration =
    section.querySelector(".year-celebration");

  const progress =
    section.querySelector(".year-progress-fill");

  if (!stage || !year || !celebration || !progress) {
    return;
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {
    year.textContent = "2035";
    year.setAttribute("aria-label", "2035");
    celebration.setAttribute("aria-hidden", "false");
    return;
  }

  // 값을 0~1 범위로 제한
  const clamp = (value, min = 0, max = 1) => {
    return Math.min(max, Math.max(min, value));
  };

  let scheduled = false;

  function updateYearJourney() {
    scheduled = false;

    // 전체 스크롤 가능한 거리
    const travel = Math.max(
      1,
      section.offsetHeight - window.innerHeight
    );

    // 현재 섹션 내 스크롤 진행률
    const t = clamp(
      -section.getBoundingClientRect().top / travel
    );

    /* --------------------------------------
       STEP 01
       2006 → 2035
       스크롤 진행률 0% ~ 56%
    -------------------------------------- */

    const yearT = clamp(t / 0.56);

    const currentYear =
      2006 +
      Math.min(
        29,
        Math.floor(yearT * 29 + 0.00001)
      );

    year.textContent = String(currentYear);

    year.setAttribute(
      "aria-label",
      String(currentYear)
    );

    /* --------------------------------------
       STEP 02
       2035 숫자 잠시 유지
       스크롤 진행률 56% ~ 67%
    -------------------------------------- */

    /* --------------------------------------
       STEP 03
       2035 숫자 확대
       스크롤 진행률 67% ~ 88%
    -------------------------------------- */

    const zoomT = clamp(
      (t - 0.67) / 0.21
    );

    // 부드러운 확대를 위한 easing
    const ease =
      zoomT * zoomT * (3 - 2 * zoomT);

    const scale = 1 + ease * 24;

    stage.style.transform =
      `scale(${scale})`;

    // 확대가 끝날 때 숫자 서서히 사라짐
    stage.style.opacity = String(
      1 - clamp((t - 0.82) / 0.07)
    );

    /* --------------------------------------
       STEP 04
       30TH ANNIVERSARY 문구 등장
       스크롤 진행률 85% ~ 95%
    -------------------------------------- */

    const reveal = clamp(
      (t - 0.85) / 0.1
    );

    celebration.style.visibility =
      reveal > 0 ? "visible" : "hidden";

    celebration.style.opacity =
      String(reveal);

    celebration.style.transform =
      `scale(${0.92 + reveal * 0.08})`;

    celebration.setAttribute(
      "aria-hidden",
      reveal > 0.95 ? "false" : "true"
    );

    /* --------------------------------------
       STEP 05
       하단 스크롤 진행 표시
    -------------------------------------- */

    progress.style.width =
      `${t * 100}%`;
  }

  // 스크롤 최적화
  function requestUpdate() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateYearJourney);
    }
  }

  window.addEventListener(
    "scroll",
    requestUpdate,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    requestUpdate
  );

  // 첫 화면 상태 적용
  updateYearJourney();
})();
