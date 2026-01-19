// ELEMENTS
const startBtn = document.getElementById('startBtn');
const startScreen = document.getElementById('startScreen');
const loadingScreen = document.getElementById('loadingScreen');
const site = document.getElementById('site');

// LOADING FACTS
const facts = [
  "De Colt Z30 weegt ongeveer 1050 kg",
  "De 1.5 MIVEC levert 109 PK",
  "Geen turbo = minder slijtage",
  "Veel Colts halen 300.000 km",
  "Ideale basis voor OEM+ tuning"
];

// START SEQUENCE
startBtn.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  loadingScreen.classList.remove('hidden');
  startLoading();
});

// ENTER KEY START
document.addEventListener('keydown', (e)=>{
  if(e.key === "Enter" && !startScreen.classList.contains('hidden')){
    startBtn.click();
  }
});

function startLoading(){
  const bar = document.getElementById('loaderProgress');
  const factText = document.getElementById('factText');

  let progress = 0;
  let factIndex = 0;

  const interval = setInterval(() => {
    progress += 2.5;
    if(progress > 100) progress = 100;
    bar.style.width = progress + "%";

    if(progress >= 25*factIndex && factIndex < facts.length){
      factText.textContent = facts[factIndex];
      factIndex++;
    }

    if(progress >= 100){
      clearInterval(interval);
      loadingScreen.classList.add('hidden');
      site.classList.remove('hidden');
      scrollReveal(); // activeer reveal animaties
    }
  },100);
}

// SMOOTH SCROLL
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// MINI GAME
const budget = document.getElementById('budget');
const budgetValue = document.getElementById('budgetValue');
const gameResult = document.getElementById('gameResult');

if(budget){
  budget.addEventListener('input', () => {
    const v = budget.value;
    budgetValue.textContent = `€${v}`;
    if(v < 2500) gameResult.textContent = "Stock daily Colt";
    else if(v < 3500) gameResult.textContent = "OEM+ Colt";
    else gameResult.textContent = "Stage 1 tuned Colt";
  });
}

// REVEAL ANIMATIONS ON SCROLL
function scrollReveal(){
  const reveals = document.querySelectorAll('.reveal');
  function reveal(){
    const windowH = window.innerHeight;
    reveals.forEach(el=>{
      const top = el.getBoundingClientRect().top;
      if(top < windowH - 100){
        el.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', reveal);
  reveal(); // initial check
}

// 1️⃣ Parallax / subtle movement images
const movingImages = document.querySelectorAll('.hero img, .two-col img, .engineering-image img, .detail img');

function handleMouseMove(e) {
  const x = (e.clientX / window.innerWidth - 0.5) * 15; // max ±7.5px
  const y = (e.clientY / window.innerHeight - 0.5) * 15; // max ±7.5px

  movingImages.forEach(img => {
    img.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
  });
}

function resetImages() {
  movingImages.forEach(img => {
    img.style.transform = `translate(0,0) scale(1)`;
  });
}

document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseleave', resetImages);

// 2️⃣ Scroll reveal effect for texts & images
const revealElements = document.querySelectorAll('.reveal, .hero-overlay');

function handleScrollReveal() {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if(top < windowHeight - 100) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', handleScrollReveal);
window.addEventListener('load', handleScrollReveal);

// 3️⃣ Hero overlay fade-in after loading
const heroOverlay = document.querySelector('.hero-overlay');
window.addEventListener('load', () => {
  setTimeout(() => {
    heroOverlay.classList.add('active');
  }, 500); // half seconde delay
});

// Toggle menu voor mobiel
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
