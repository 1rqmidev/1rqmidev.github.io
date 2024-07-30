document.addEventListener("DOMContentLoaded", e => {

    const scroller = document.querySelector('section.two .recentProjects .container-card .scroller');

    let isDown = false;
    let startX;
    let scrollLeft;

    scroller.addEventListener('mousedown', (e) => {
        isDown = true;
        scroller.classList.add('active');
        startX = e.pageX - scroller.offsetLeft;
        scrollLeft = scroller.scrollLeft;
    });

    scroller.addEventListener('mouseleave', () => {
        isDown = false;
        scroller.classList.remove('active');
    });

    scroller.addEventListener('mouseup', () => {
        isDown = false;
        scroller.classList.remove('active');
    });

    scroller.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scroller.offsetLeft;
        const walk = (x - startX);
        scroller.scrollLeft = scrollLeft - walk - 10;
    });

    let bullCont = document.querySelectorAll(".bullet-fx");

    bullCont.forEach(element => {
        let numB = element.getAttribute("numB");

        element.style.setProperty("--numB", numB);
        for (let x = 0; x < numB; x++) {
            let span = document.createElement("span");
            span.classList.add("notactive")
            span.style.animation = "fade-in 0.4s linear 1"
            span.style.animationDelay = x * 0.05 + "s"

            span.addEventListener("animationend", e => {
                span.style.animation = "";
                span.classList.remove("notactive")
            })
            element.appendChild(span);
        }

    })
    document.querySelector("nav .group .menu").addEventListener("click", e => {
        let g2 = document.querySelector("nav ul .group.g-2")
        g2.classList.toggle("active")

        let hidden = document.querySelector(".hidden")
        hidden.classList.toggle("active")

        hidden.style.top = (window.scrollY) + "px"
        document.querySelector("nav .group .dmenu").style.top = (window.scrollY - 25) + "px"
        document.body.style.overflowY = "hidden"
        moveBody((document.querySelector("nav ul .group.g-2")).classList.contains("active"))
    })

    document.querySelector(".hidden").addEventListener("click", e => {
        {
            document.querySelector("nav .group .menu").click();
            document.body.style.removeProperty("overflow")
            document.body.style.removeProperty("transform")
        }

    })
    let name = document.querySelectorAll(".username-discord");
    name.forEach(e => {
        e.addEventListener("click", v => {
            navigator.clipboard.writeText(e.getAttribute("discord"))
            e.classList.add("copied");
            setTimeout(function () {
                if (e.classList.contains("copied")) {
                    e.classList.remove("copied");
                }
            }, 1000)


        })
    })


    let readmore = document.querySelectorAll(".readmore");
    readmore.forEach(element => {
        element.addEventListener("click", e => {
            if (!element.classList.contains("reading-mode")) {
                element.textContent = "read less"
                element.classList.add("reading-mode")
                element.parentElement.querySelector(".more").classList.add("uncollapse")

            } else {
                element.textContent = "read more"
                element.classList.remove("reading-mode")
                element.parentElement.querySelector(".more").classList.remove("uncollapse")
            }
        })
    })


    let ColorCards = document.querySelectorAll("section.two img");
    let ColorSquares = document.querySelectorAll("section .square img");

    ColorCards.forEach(cardImg => {

        getAverageRGB(cardImg).then(rgb => {
            console.log("RGB: -----------------------------------");
            console.log("RGB » R: " + rgb.r + " G:" + rgb.g + " B:" + rgb.b);
            cardImg.style.setProperty("--avrgcolor", `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
        }).catch(error => {
            console.error("Failed to get average RGB", error);
        });
    });
    ColorSquares.forEach(cardImg => {

        getAverageRGB(cardImg).then(rgb => {
            console.log("RGB: -----------------------------------");
            console.log("RGB » R: " + rgb.r + " G:" + rgb.g + " B:" + rgb.b);
            cardImg.parentElement.style.setProperty("--avrgcolor", `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
        }).catch(error => {
            console.error("Failed to get average RGB", error);
        });
    });


    let bullets = Math.floor(Math.random() * 16);


    let land = document.querySelector(".land")
    let widths = []
    let heights = []
    let ax = []
    let ay = []
    function isOverlapping(newTop, newLeft, newWidth, newHeight) {
        let buffer = 10; // Buffer to avoid overlap

        for (let i = 0; i < ax.length; i++) {
            let existingLeft = ax[i];
            let existingTop = ay[i];
            let existingWidth = widths[i];
            let existingHeight = heights[i];

            if (!(newLeft + newWidth + buffer < existingLeft ||
                newLeft > existingLeft + existingWidth + buffer ||
                newTop + newHeight + buffer < existingTop ||
                newTop > existingTop + existingHeight + buffer)) {
                return true;
            }
        }
        return false;
    }

    for (let v = 0; v < bullets; v++) {
        let bullContainer = document.createElement("div");
        bullContainer.classList.add("bullets-style");

        let height = Math.floor(Math.random() * 7 + 1) * 20;
        let width = Math.floor(Math.random() * 15 + 1) * 20;

        let top, left;

        do {
            top = Math.floor(Math.random() * (window.innerHeight * 2 - height));
            left = Math.floor(Math.random() * (window.innerWidth - width));
        } while (isOverlapping(top, left, width, height));

        bullContainer.style.width = width + "px";
        bullContainer.style.height = `${height}px`;
        bullContainer.style.position = "absolute";
        bullContainer.style.top = `${top}px`;
        bullContainer.style.left = `${left}px`;

        if (v % 2) {
            console.log("Yes")
            bullContainer.style.animation = "fade-bullets-x 1s ease-in-out infinite alternate-reverse"
        } else {
            console.log("no")
            bullContainer.style.animation = "fade-bullets-y 1s ease-in-out infinite alternate-reverse"

        }

        heights.push(height);
        widths.push(width);
        ax.push(left);
        ay.push(top);

        land.appendChild(bullContainer);
    }

    function handleScrollTwo() {
        let sectionTwo = document.querySelector(".two");

        if (sectionTwo) {

            let sectionTwoTop = document.querySelector(".two .recentProjects .container-card").getBoundingClientRect().top + window.scrollY;
            let viewportHeight = window.innerHeight;

            if (window.scrollY + viewportHeight > sectionTwoTop) {
                sectionTwo.classList.add("unhide");
                window.removeEventListener("scroll", handleScrollTwo);

            }
        }

    }
    function handleScrollFour() {
        let sectionFour = document.querySelector(".four");
        if (sectionFour) {

            let sectionTwoTop = document.querySelector(".four .image").getBoundingClientRect().top + window.scrollY;
            let viewportHeight = window.innerHeight;
            console.log("checked?xx")
            if (window.scrollY + viewportHeight > sectionTwoTop) {
                sectionFour.classList.add("view");
                window.removeEventListener("scroll", handleScrollFour);
            }
        }
    }

    handleScrollFour()
    handleScrollTwo()


    window.addEventListener("scroll", handleScrollTwo);
    window.addEventListener("scroll", handleScrollFour);


    let adjectives = document.querySelector("section.two .adjectives");
    let adjectiveList = adjectives.getAttribute("adjectiveList");

    let adjListed = adjectiveList.split(",");
    let adjDivs = [];

    adjListed.forEach((adj, n) => {
        let adjDiv = document.createElement("h4");
        adjDiv.textContent = adj;
        adjDiv.setAttribute("number", n);
        adjectives.appendChild(adjDiv);
        adjDivs.push(adjDiv);  // Add to adjDivs array
    });

    let activeAnimation = function (num) {
        if (num < adjDivs.length) {
            adjDivs[num].style.display = "block";
            adjDivs[num].style.animation = "fade-in-adj 3s ease-out 1";
            reGive(num);
        }

    };

    let reGive = function (num) {
        adjDivs[num].addEventListener("animationend", function animationEndHandler(e) {

            adjDivs[num].style.animation = "unset";
            adjDivs[num].style.display = "none";
            this.removeEventListener("animationend", animationEndHandler); // Clean up the event listener
            let nextDiv = adjDivs[num + 1];
            if (nextDiv) {
                activeAnimation(+nextDiv.getAttribute("number"));
            } else {
                activeAnimation(0);
                console.log("gg?")
            }
        });
    };

    activeAnimation(0);
    let left = document.querySelector("section.three .left");
    let right = document.querySelector("section.three .right");

    let current = 1; // assuming current is initialized to 1

    let leftFunction = function () {
        if (current < 1) {
            console.log("stop here " + current);
            container.style.transition = "unset";
            let cardWidth = document.querySelector(".card-container2 .card:not(.active)").getBoundingClientRect().width + 15;

            let lastChildIndex = +container.lastElementChild.getAttribute("number") - 3;
            container.style.transform = `translate(-${lastChildIndex * cardWidth}px, 0px)`;
            container.querySelector(".active").classList.remove("active");
            container.lastElementChild.previousElementSibling.classList.add("active");
            current = lastChildIndex + 1;
            setTimeout(() => {
                container.style.transition = "0.3s";
                left.removeAttribute("disabled");
                console.log("Removed disabled");
                left.click();
            }, 0);


        }
    }
    let checking = function (container) {
        console.log("LASTCHILD: " + container.lastElementChild.getAttribute("number"));

        if (current >= (+container.lastElementChild.getAttribute("number") - 2)) {
            console.log("stop here " + current);
            container.style.transition = "unset";
            container.style.transform = `translate(0px, 0px)`;
            console.log("done ------------------");
            container.querySelector(".active").classList.remove("active");
            container.firstElementChild.nextElementSibling.classList.add("active");
            current = 1;
            setTimeout(() => {
                container.style.transition = "0.3s";
                right.removeAttribute("disabled");
                console.log("Removed disabled");
            }, 0);
        }

        leftFunction()

    };

    let container = document.querySelector("section.three .cont .card-container2");

    container.addEventListener("transitionend", (event) => {
        if (event.target === container && event.propertyName === 'transform') {
            checking(container);
        }
    });

    right.addEventListener("click", (e) => {
        if (current >= (+container.lastElementChild.getAttribute("number") - 3)) {
            right.setAttribute("disabled", true);
        }

        let x = container.style.transform;
        let translateXValue = x.match(/translate\((-?\d+(\.\d+)?)px/);
        let translateX = 0;

        if (translateXValue) {
            translateX = parseFloat(translateXValue[1]);
            if (translateX > 0) {
                translateX = 0;
            }
            console.log(translateX);
        } else {
            console.log("No translateX value found.");
        }
        console.log(x);

        let active = document.querySelector("section.three .card-container2 .card.active");
        active.classList.remove("active");

        if (active.nextElementSibling) {
            active.nextElementSibling.classList.add("active");
            current++;
        }

        console.log("current: " + current);
        let cardWidth = document.querySelector(".card-container2 .card:not(.active)").getBoundingClientRect().width + 15;
        container.style.transform = `translate(-${Math.abs(translateX) + cardWidth}px, 0)`;
        console.log("sho7?");
    });

    left.addEventListener("click", (e) => {
        if (current == 1) {
            current--;
            leftFunction()
            return
        }
        if (current <= 1) {
            left.setAttribute("disabled", true);
        }

        let x = container.style.transform;
        let translateXValue = x.match(/translate\((-?\d+(\.\d+)?)px/);
        let translateX = 0;

        if (translateXValue) {
            translateX = parseFloat(translateXValue[1]);
            if (translateX > 0) {
                translateX = 0;
            }
            console.log(translateX);
        } else {
            console.log("No translateX value found.");
        }
        console.log(x);

        let active = document.querySelector("section.three .card-container2 .card.active");
        active.classList.remove("active");

        if (active.previousElementSibling) {
            active.previousElementSibling.classList.add("active");
            current--;
        }

        console.log("current: " + current);
        let cardWidth = document.querySelector(".card-container2 .card:not(.active)").getBoundingClientRect().width + 15;
        container.style.transform = `translate(${-Math.abs(translateX) + cardWidth}px, 0)`;
        console.log("sho7?");
    });
})

let moveBody = function (bol) {

    if (bol) {

        document.body.style.transform = `translate(-${document.querySelector("nav ul .group .dmenu").getBoundingClientRect().width}px, 0)`

    } else {
        document.body.style.transform = `translate(0, 0)`

    }


}