document.addEventListener("DOMContentLoaded", async () => {
  const swiperContainer = document.querySelector(
    ".review-small .swiper .swiper-wrapper"
  );

  try {
    const response = await fetch("reviews.json");
    const reviews = await response.json();

    reviews.forEach((review) => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
      slide.innerHTML = `
        <div class="review-card">
          <img src="${review.pfp}" alt="${review.name}" class="pfp" />
          <div class="info">
            <h4>${review.name}</h4>
            <p class="stars">${"⭐".repeat(review.stars)}</p>
            <p class="date op">${new Date(review.date).toLocaleDateString()}</p>
          </div>
        </div>
        <p class="desc">${review.description}</p>
      `;
      swiperContainer.appendChild(slide);
    });
    let swiperInstance;

    function initSwiper() {
      const direction = window.innerWidth >= 1024 ? "vertical" : "horizontal";

      // Destroy existing instance if it exists
      if (swiperInstance) swiperInstance.destroy(true, true);

      // Re-initialize Swiper
      swiperInstance = new Swiper(".review-small .swiper", {
        slidesPerView:
          window.innerWidth >= 1024 ? 2 : window.innerWidth >= 600 ? 2 : 1, // 🔹 New breakpoint: <500px gets 1 slide per view
        spaceBetween:
          window.innerWidth >= 1024
            ? 30
            : window.innerWidth >= 1000
            ? 20
            : window.innerWidth >= 500
            ? 10
            : 5, // Optional: tighter spacing below 500px
        loop: true,
        direction: direction,
        pagination: {
          el: document.querySelector(".review-small .pagination"),
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }

    // Initialize on load
    initSwiper();

    // Re-init on resize (debounced for performance)
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        initSwiper();
      }, 200);
    });

    new Swiper(".review-big .swiper", {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  } catch (err) {
    console.error("Failed to fetch reviews:", err);
  }
});
