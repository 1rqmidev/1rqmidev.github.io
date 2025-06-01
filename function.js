document.addEventListener("DOMContentLoaded", (e) => {
  const circles = document.querySelectorAll(".liner .circle");

  function updateLastOneClass() {
    // Remove .lastone from all circles first
    circles.forEach((c) => c.classList.remove("lastone"));

    // Find all visible circles
    const visibleCircles = [...circles].filter((c) =>
      c.classList.contains("visible")
    );

    // Add .lastone to the last visible circle
    if (visibleCircles.length > 0) {
      if (visibleCircles[visibleCircles.length - 1] != visibleCircles[0])
        visibleCircles[visibleCircles.length - 1].classList.add("lastone");
    }
  }
  circles[0].classList.add("visible");
  updateLastOneClass();

  circles.forEach((circle, index) => {
    circle.addEventListener("mouseenter", () => {
      if (index + 1 < circles.length) {
        circles[index + 1].classList.add("visible");
        updateLastOneClass();
      }
    });
  });
  const outerSwiper = new Swiper(".services-swiper", {
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 20,
    initialSlide:
      document.querySelectorAll(".services-swiper .swiper-slide").length / 2,
    breakpoints: {
      // When window width is <= 1024px (tablet)
      1024: {
        slidesPerView: 5.5,
        centeredSlides: true,
      },
      // When window width is <= 768px (mobile)
      768: {
        slidesPerView: 4,
        centeredSlides: true,
      },
      500: {
        slidesPerView: 3,
        centeredSlides: true,
      },
      0: {
        slidesPerView: 1.5,
        centeredSlides: true,
      },
    },
  });
});
let scrollCount = 0;
let maxScrolls = 2;
let isScrolling = false;
function handleCustomScroll(event) {
  event.preventDefault();
  if (isScrolling) return;
  isScrolling = true;

  if (scrollCount < maxScrolls) {
    scrollCount++;
    document.querySelector(".scroll-sections").style.transform = `translateY(-${
      scrollCount * 100
    }vh)`;
  }
  document.querySelectorAll(".scroll-sections .section").forEach((e) => {
    e.classList.remove("show");
    e?.offsetWidth; // Force reflow
    e.classList.add("fade-out");
  });

  let curr = document.querySelector(
    `.scroll-sections .section:nth-child(${scrollCount + 1})`
  );
  void curr?.offsetWidth; // Force reflow
  curr?.classList.add("show");
  curr?.classList.remove("fade-out");
  let animate = document.querySelector(".logos-container");
  if (scrollCount % 2) {
    animate.classList.add("scale");
  } else {
    animate.classList.remove("scale");
  }

  if (scrollCount === maxScrolls) {
    // Allow normal scrolling after delay
    document.querySelector("nav").classList.add("started");
    animate.classList.remove("scale");
    document.body.style.overflow = "auto";
    window.removeEventListener("wheel", handleCustomScroll);
  }

  setTimeout(() => {
    isScrolling = false;
  }, 800);
}
document.addEventListener("DOMContentLoaded", (e) => {
  if (!window.location.hash) {
    // Prevent normal scrolling initially
    document.body.style.overflow = "hidden";
    window.addEventListener("wheel", handleCustomScroll, { passive: false });
  } else if (window.location.hash === "#portfolio") {
    console.log("Ywah");
    scrollCount = 1;
    document.querySelector(".scroll-sections").style.transform = `translateY(-${
      scrollCount * 100
    }vh)`;
    window.scrollTo(0, 0);
    window.addEventListener("wheel", handleCustomScroll, { passive: false });
    document.body.style.overflow = "hidden";
  } else {
    document.querySelector("nav").classList.add("started");
    console.log(window.location.hash);
    document.querySelectorAll(".scroll-sections .section").forEach((e) => {
      if (!e.classList.contains("cards")) e.style.display = "none";
    });
  }
});
