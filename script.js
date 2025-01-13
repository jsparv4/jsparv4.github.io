function adjustScale() {
  const container = document.querySelector(".container");

  if (!container) return;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const scaleX = viewportWidth / container.offsetWidth;
  const scaleY = viewportHeight / container.offsetHeight;

  const scale = Math.min(scaleX, scaleY);

  container.style.transform = `scale(${scale})`;
}

function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

window.addEventListener("load", adjustScale);
window.addEventListener("resize", debounce(adjustScale, 200));

const githubIcon = document.getElementById("github-icon");

// Function to soften the black part of the GitHub logo
function softenLogo() {
  githubIcon.style.filter = "brightness(1.2) contrast(0.8)"; // Increase brightness and slightly reduce contrast
}

// Function to reset the logo to its original state
function resetIcon() {
  githubIcon.style.filter = "brightness(1) contrast(1)"; // Reset to original brightness and contrast
}

// Add event listeners
githubIcon.addEventListener("mouseenter", softenLogo); // When hovering over the image
githubIcon.addEventListener("mouseleave", resetIcon);   // When hover ends

// Get the current year and set it in the span with id 'copyright-year'
document.getElementById('copyright-year').textContent = new Date().getFullYear();
