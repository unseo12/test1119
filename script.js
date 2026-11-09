
/* ========================================
   PENTAPORT 2035
   COMMON INTERACTIONS
======================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ======================================
     01. CUSTOM CURSOR
  ====================================== */

  const cursor = document.querySelector('.cursor');
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorPath = document.querySelector('.cursor-path');
  const cursorSvg = document.querySelector('.cursor-trail');

  const POINT_COUNT = 14;
  const FOLLOW_SPEED = 0.48;
  const TRAIL_SPEED = 0.52;

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const finePointer = window.matchMedia(
    '(hover: hover) and (pointer: fine)'
  ).matches;

  if (
    cursor &&
    cursorDot &&
    cursorPath &&
    cursorSvg &&
    finePointer &&
    !reducedMotion
  ) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let headX = mouseX;
    let headY = mouseY;

    let cursorVisible = false;

    const points = Array.from(
      { length: POINT_COUNT },
      () => ({
        x: mouseX,
        y: mouseY
      })
    );

    cursor.style.opacity = '0';

    document.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;

      mouseX = event.clientX;
      mouseY = event.clientY;

      if (!cursorVisible) {
        cursorVisible = true;
        cursor.style.opacity = '1';

        headX = mouseX;
        headY = mouseY;

        points.forEach((point) => {
          point.x = mouseX;
          point.y = mouseY;
        });
      }
    });

    document.addEventListener('pointerout', (event) => {
      if (!event.relatedTarget) {
        cursor.style.opacity = '0';
        cursorVisible = false;
      }
    });

    window.addEventListener('blur', () => {
      cursor.style.opacity = '0';
      cursorVisible = false;
    });

    const hoverTargets = document.querySelectorAll(
      'a, button, [role="button"]'
    );

    hoverTargets.forEach((element) => {
      element.addEventListener('pointerenter', () => {
        cursor.classList.add('is-hover');
      });

      element.addEventListener('pointerleave', () => {
        cursor.classList.remove('is-hover');
      });
    });

    function createPath() {
      if (points.length < 2) return '';

      let path = `M ${points[0].x} ${points[0].y}`;

      for (let i = 1; i < points.length - 1; i++) {
        const current = points[i];
        const next = points[i + 1];

        const midX = (current.x + next.x) / 2;
        const midY = (current.y + next.y) / 2;

        path += ` Q ${current.x} ${current.y} ${midX} ${midY}`;
      }

      const last = points[points.length - 1];

      path += ` L ${last.x} ${last.y}`;

      return path;
    }

    function animateCursor() {
      headX += (mouseX - headX) * FOLLOW_SPEED;
      headY += (mouseY - headY) * FOLLOW_SPEED;

      points[0].x = headX;
      points[0].y = headY;

      for (let i = 1; i < points.length; i++) {
        const previous = points[i - 1];
        const current = points[i];

        current.x += (previous.x - current.x) * TRAIL_SPEED;
        current.y += (previous.y - current.y) * TRAIL_SPEED;
      }

      cursorDot.style.left = `${headX}px`;
      cursorDot.style.top = `${headY}px`;

      cursorPath.setAttribute('d', createPath());

      requestAnimationFrame(animateCursor);
    }

    animateCursor();
  }

  /* ======================================
     02. SCROLL REVEAL
  ====================================== */

  const revealElements = document.querySelectorAll('.reveal');

  if (
    revealElements.length &&
    'IntersectionObserver' in window &&
    !reducedMotion
  ) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    document.documentElement.classList.add('js-ready');

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add('visible');
    });
  }

  /* ======================================
     03. ACTIVE NAVIGATION
  ====================================== */

  const currentPage = window.location.pathname
    .split('/')
    .pop() || 'index.html';

  const navLinks = document.querySelectorAll(
    '.site-header nav a'
  );

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute('href');

    if (linkPage === currentPage) {
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ======================================
     04. TICKET PLACEHOLDER
  ====================================== */

  const ticketLinks = document.querySelectorAll(
    '.ticket-item[href="#"]'
  );

  ticketLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      alert('2035 페스티벌 콘셉트 페이지입니다. 실제 예매는 지원하지 않습니다.');
    });
  });

});
