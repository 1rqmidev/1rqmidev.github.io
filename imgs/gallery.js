fetch("imgs/images.json")
  .then((res) => res.json())
  .then((portfolios) => {
    // Get current HTML file name without extension
    const currentPage = window.location.pathname
      .split("/")
      .pop()
      .replace(".html", "")
      .toLowerCase(); // e.g., "design", "coding"

    // Find the matching portfolio based on current page
    const matchedPortfolio = portfolios.find(
      (p) => p.portfolio.toLowerCase() === currentPage
    );

    if (!matchedPortfolio) {
      console.warn("No matching portfolio found for:", currentPage);
      return;
    }

    // Loop through its containers
    matchedPortfolio.containers.forEach((containerData) => {
      const { container, items } = containerData;

      // Create section container
      const section = document.createElement("div");
      section.classList.add("section-gallery");

      // Create and append heading
      const heading = document.createElement("h1");
      heading.classList.add("scroll-animation");
      heading.textContent =
        container.charAt(0).toUpperCase() + container.slice(1);
      section.appendChild(heading);

      // Create gallery
      const gallery = document.createElement("div");
      gallery.classList.add("gallery");

      items.forEach((itemData) => {
        const item = document.createElement("div");
        item.classList.add("image");

        const match = itemData.image.match(/[?&]code=([^&]+)/);
        const code = match ? match[1] : "";

        item.innerHTML = `
          <h3>${itemData.title}</h3>
          <img loading="lazy" src="https://eapi.pcloud.com/getpubthumb?code=${code}&linkpassword=&size=900x900&crop=0&type=auto" alt="${itemData.title}" />
        `;

        gallery.appendChild(item);
      });

      // Append gallery to section, then insert section before footer
      section.appendChild(gallery);
      const footer = document.querySelector("footer");
      if (footer && footer.parentNode) {
        footer.parentNode.insertBefore(section, footer);
      } else {
        console.warn("Footer or its parent not found.");
      }
    });
  })
  .catch((err) => console.error("Error loading images.json:", err));
