document.onreadystatechange = function () {
    let blocked = document.body.querySelectorAll("section, nav, .land, footer");
    if (document.readyState === "complete") {
        blocked.forEach(e => {

            setVisibility(e, true);
        });
        setVisibility(document.querySelector(".loading"), false)

    } else {
        blocked.forEach(e => {
            setVisibility(e, false);
        });
        console.log("Loading...");
        setVisibility(document.querySelector(".loading"), true)
    }
};

let setVisibility = function (element, visibility) {
    if (!visibility) {
        element.style.display = "none";
    } else {
        element.style.removeProperty("display");
    }
};
