// Navbar
// Fonction pour déterminer si le milieu d'un élément est visible dans la fenêtre
function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2
  );
}

// Fonction pour mettre à jour la classe active de la navigation
function updateActiveNav() {
  // Récupérer toutes les sections
  var sections = document.querySelectorAll("section");

  // Parcourir chaque section
  sections.forEach(function (section) {
    // Vérifier si le milieu de la section est visible dans la fenêtre
    if (isElementInViewport(section)) {
      // Récupérer l'ID de la section actuelle
      var currentSectionId = section.id;

      // Mettre à jour la classe active dans la navigation
      document.querySelectorAll(".navList").forEach(function (navItem) {
        navItem.classList.remove("active");
        var navLink = navItem.querySelector("a");
        if (navLink.getAttribute("href") === "#" + currentSectionId) {
          navItem.classList.add("active");
        }
      });
    }
  });
}
// Écouter l'événement de défilement de la fenêtre
window.addEventListener("scroll", function () {
  // Appeler la fonction pour mettre à jour la classe active de la navigation
  updateActiveNav();
});
// Appeler la fonction une fois au chargement de la page pour gérer le cas où une section est déjà visible
updateActiveNav();

//Dark Mode
const dayNightCheckbox = document.querySelector(".dayNight input");
const body = document.body;

function toggleTheme() {
  // Ajouter ou supprimer la classe pour changer de thème
  body.classList.toggle("dark-mode");

  // Modifier la classe 'day' en fonction de l'état de la case à cocher
  body.classList.toggle("day", !dayNightCheckbox.checked);
}

// Toggle Day/Night Theme
dayNightCheckbox.addEventListener("change", function () {
  body.classList.toggle("day", !this.checked);
  toggleTheme(); // Appeler la fonction commune pour maintenir la synchronisation
});

//Scroll Button
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // Scroll back to top
  var progressPath = document.querySelector(".progress-wrap path");
  var pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = "none";
  progressPath.style.strokeDasharray = pathLength + " " + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition =
    "stroke-dashoffset 10ms linear";

  var updateProgress = function () {
    var scroll = window.scrollY || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - window.innerHeight;
    var progress = pathLength - (scroll * pathLength) / height;
    progressPath.style.strokeDashoffset = progress;
  };

  updateProgress();
  window.addEventListener("scroll", updateProgress);

  var offset = 50;
  var duration = 550;

  window.addEventListener("scroll", function () {
    if (window.scrollY > offset) {
      document.querySelector(".progress-wrap").classList.add("active-progress");
    } else {
      document
        .querySelector(".progress-wrap")
        .classList.remove("active-progress");
    }
  });

  document
    .querySelector(".progress-wrap")
    .addEventListener("click", function (event) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
});

// Home Caroussel
// Récupérer les éléments du carousel
var carousel = document.querySelector(".carousel");
var items = document.querySelectorAll(".carouselItem");
var currdeg = 0;

// Interval pour faire tourner le carrousel automatiquement
var autoRotateInterval = setInterval(function () {
  rotate("n");
}, 3000); // Réglage de l'intervalle en millisecondes (ici 3 secondes)

// Fonction de rotation
function rotate(direction) {
  if (direction === "n") {
    currdeg = currdeg - 120;
    if (currdeg === -1440) {
      currdeg = 0;
    }
  }

  // Appliquer la rotation au carousel
  carousel.style.transform = "rotateY(" + currdeg + "deg)";
  carousel.style.webkitTransform = "rotateY(" + currdeg + "deg)";
  carousel.style.mozTransform = "rotateY(" + currdeg + "deg)";
  carousel.style.oTransform = "rotateY(" + currdeg + "deg)";

  // Appliquer l'inverse de la rotation aux éléments individuels
  for (var i = 0; i < items.length; i++) {
    items[i].style.transform = "rotateY(" + -currdeg + "deg)";
    items[i].style.webkitTransform = "rotateY(" + -currdeg + "deg)";
    items[i].style.mozTransform = "rotateY(" + -currdeg + "deg)";
    items[i].style.oTransform = "rotateY(" + -currdeg + "deg)";
  }
}

// Optionnel : Arrêter la rotation automatique lorsqu'une interaction utilisateur est détectée
carousel.addEventListener("mouseover", function () {
  clearInterval(autoRotateInterval);
});

carousel.addEventListener("mouseout", function () {
  autoRotateInterval = setInterval(function () {
    rotate("n");
  }, 5000);
});

// changeImage

const images = [
  "source/step2.1.webp",
  "source/step2.2.webp",
  "source/step2.3.webp",
];
const images2 = ["source/step4.1.webp", "source/step4.2.webp"];
let currentIndex = 0;
let currentIndex2 = 0;

function changeImage() {
  const imageElement = document.getElementById("changeImage");
  const imageElement2 = document.getElementById("changeImage2");
  imageElement.style.opacity = 0;
  imageElement2.style.opacity = 0;

  setTimeout(() => {
    currentIndex = (currentIndex + 1) % images.length;
    currentIndex2 = (currentIndex2 + 1) % images2.length;
    imageElement.src = images[currentIndex];
    imageElement2.src = images2[currentIndex2];
    imageElement.style.opacity = 1;
    imageElement2.style.opacity = 1;
  }, 500); // 1000 milliseconds = 1 second
}

// Initial call
changeImage();

// Set interval to change image every 3 seconds
setInterval(changeImage, 5000); // 3000 milliseconds = 3 seconds
