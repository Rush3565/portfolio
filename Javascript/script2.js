var abc = document.getElementById("abc");
let isMouseTrailActive = true;
const handleMouseMove = (e) => {
  if (isMouseTrailActive) {
    var ele = document.createElement("div");
    ele.setAttribute("class", "trail");
    ele.setAttribute(
      "style",
      `left:${e.clientX - 10}px; top: ${e.clientY - 10}px;`
    );

    ele.onanimationend = () => {
      ele.remove();
    };

    abc.insertAdjacentElement("beforeend", ele); // Append the new trail element
  }
};

abc.addEventListener("mousemove", handleMouseMove);

let trail = document.getElementsByClassName("trail");

function randColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function changeTextColors() {
  Array.from(trail).forEach((e) => {
    e.style.background = randColor();
    e.style.border = randColor();
  });
}
setInterval(changeTextColors, 1);

function swapCards(direction) {
  const currentCardEl = cardsContainerEl.querySelector(".current--card");
  const previousCardEl = cardsContainerEl.querySelector(".previous--card");
  const nextCardEl = cardsContainerEl.querySelector(".next--card");

  const currentBgImageEl = appBgContainerEl.querySelector(".current--image");
  const previousBgImageEl = appBgContainerEl.querySelector(".previous--image");
  const nextBgImageEl = appBgContainerEl.querySelector(".next--image");

  changeInfo(direction);
  swapCardsClass();

  removeCardEvents(currentCardEl);

  function swapCardsClass() {
    currentCardEl.classList.remove("current--card");
    previousCardEl.classList.remove("previous--card");
    nextCardEl.classList.remove("next--card");

    currentBgImageEl.classList.remove("current--image");
    previousBgImageEl.classList.remove("previous--image");
    nextBgImageEl.classList.remove("next--image");

    currentCardEl.style.zIndex = "50";
    currentBgImageEl.style.zIndex = "-2";

    if (direction === "right") {
      previousCardEl.style.zIndex = "20";
      nextCardEl.style.zIndex = "30";

      nextBgImageEl.style.zIndex = "-1";

      currentCardEl.classList.add("previous--card");
      previousCardEl.classList.add("next--card");
      nextCardEl.classList.add("current--card");

      currentBgImageEl.classList.add("previous--image");
      previousBgImageEl.classList.add("next--image");
      nextBgImageEl.classList.add("current--image");
    } else if (direction === "left") {
      previousCardEl.style.zIndex = "30";
      nextCardEl.style.zIndex = "20";

      previousBgImageEl.style.zIndex = "-1";

      currentCardEl.classList.add("next--card");
      previousCardEl.classList.add("current--card");
      nextCardEl.classList.add("previous--card");

      currentBgImageEl.classList.add("next--image");
      previousBgImageEl.classList.add("current--image");
      nextBgImageEl.classList.add("previous--image");
    }

    // Update link visibility based on the new active card
    updateLinkVisibility();
  }
}

// Function to update link visibility
function updateLinkVisibility() {
  console.log("updated")
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const link = card.querySelector(".redirect-link");
    if (card.classList.contains("current--card")) {
      link.classList.add("visible"); // Show the link
    } else {
      link.classList.remove("visible"); // Hide the link
    }
  });
}


let toggle = document.querySelector(".toggle");
let menu = document.querySelector(".menu");

toggle.onclick = () => {
  menu.classList.toggle("active");
};

const navbarLinks = document.querySelectorAll(".navbar ul li a");
const sections = document.querySelectorAll("div[id]");

function setActiveLink() {
  const scrollPosition = window.scrollY;
  const ids = ["abc", "aboutme", "skill", "project", "contectme"];
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 30;
    const sectionHeight = section.offsetHeight;
    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      console.log(" section", section);

      const activeLink = document.querySelector(
        `.navbar ul li a[href="#${ids.includes(section.id)? section.id: "abc"}"]`
      );
      navbarLinks.forEach((link) => link.classList.remove("activeig"));
      activeLink.classList.add("activeig");
    }
  });
  console.log("scrollPosition", scrollPosition);
}

// Call the function on page load with a small timeout
setTimeout(setActiveLink, 100);

// Call the function on scroll
window.addEventListener("scroll", setActiveLink);
