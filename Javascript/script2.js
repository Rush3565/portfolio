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
