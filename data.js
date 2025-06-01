fetch("/data.json")
  .then((res) => res.json())
  .then((slideData) => {
    const mainSwiperWrapper = document.querySelector(
      ".mySwiper .swiper-wrapper"
    );

    slideData.slides.forEach((slide) => {
      // Create anchor element
      const anchorEl = document.createElement("a");
      anchorEl.href = slide.anchor;
      anchorEl.classList.add("swiper-slide");

      // Create card (inside anchor)
      let slideEl = document.createElement("div");
      slideEl.classList.add("card");

      // Image Swiper
      const imageSwiper = document.createElement("div");
      imageSwiper.className = "image-swiper swiper";

      const swiperWrapper = document.createElement("div");
      swiperWrapper.className = "swiper-wrapper";

      slide.images.forEach((src) => {
        const imgSlide = document.createElement("div");
        imgSlide.className = "image-slide swiper-slide";
        imgSlide.innerHTML = `<img src="${src}" alt="" />`;
        swiperWrapper.appendChild(imgSlide);
      });

      imageSwiper.appendChild(swiperWrapper);
      slideEl.appendChild(imageSwiper);

      // Background Info
      slideEl.insertAdjacentHTML(
        "beforeend",
        `
    <div class="background">
      <div class="features">
        <div class="content">
          <span class="gamemode">${slide.gamemode}</span>
          <span class="money">${slide.price}</span>
          <span class="preview">${slide.preview}</span>
        </div>
        <div class="content">
          <span class="views">${slide.views}</span>
        </div>
      </div>
      <div class="container">
        <div class="title">
          <span>${slide.title}</span>
          <div class="image-pagination swiper-pagination"></div>
        </div>
        <div class="sub-title">
          ${slide.subtitle}
        </div>
      </div>
    </div>
  `
      );

      // Nest card inside anchor
      anchorEl.appendChild(slideEl);
      mainSwiperWrapper.appendChild(anchorEl);
    });

    // Initialize the main Swiper
    const outerSwiper = new Swiper(".mySwiper", {
      slidesPerView: 1.5,
      centeredSlides: true,
      spaceBetween: 0,
      pagination: {
        el: ".cards-pagination",
        clickable: true,
      },
      initialSlide: Math.floor(slideData.slides.length / 2),
      breakpoints: {
        // When window width is <= 1024px (tablet)
        1024: {
          slidesPerView: 1.5,
          centeredSlides: true,
        },
        // When window width is <= 768px (mobile)
        768: {
          slidesPerView: 1.3,
          centeredSlides: true,
        },
        500: {
          slidesPerView: 1,
          centeredSlides: true,
        },
        0: {
          slidesPerView: 1,
          centeredSlides: true,
        },
      },
    });

    // Initialize all nested image Swipers
    document.querySelectorAll(".image-swiper").forEach((el) => {
      const swiper = new Swiper(el, {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: el.parentElement.querySelector(".image-pagination"),
          clickable: true,
        },
      });

      const parentSlide = el.closest(".swiper-slide");

      const controlAutoplay = () => {
        if (parentSlide.classList.contains("swiper-slide-active")) {
          swiper.autoplay.start();
        } else {
          swiper.autoplay.stop();
        }
      };

      outerSwiper.on("slideChange", controlAutoplay);
      outerSwiper.on("transitionEnd", controlAutoplay);
      controlAutoplay(); // Initial autoplay check
    });
  })
  .catch((err) => console.error("Error loading slide data:", err));
