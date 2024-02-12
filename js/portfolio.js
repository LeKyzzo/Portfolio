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

//Typing Text
// get the element
const text = document.querySelector(".typing-text");

// make a words array
const words = ["Full Stack", "Front-end", "Back-end", "Web", "callipyge"];

// start typing effect
setTyper(text, words);

function setTyper(element, words) {
  const LETTER_TYPE_DELAY = 120;
  const WORD_STAY_DELAY = 1500;

  const DIRECTION_FORWARDS = 0;
  const DIRECTION_BACKWARDS = 1;

  var direction = DIRECTION_FORWARDS;
  var wordIndex = 0;
  var letterIndex = 0;

  var wordTypeInterval;

  startTyping();

  function startTyping() {
    wordTypeInterval = setInterval(typeLetter, LETTER_TYPE_DELAY);
  }

  function typeLetter() {
    const word = words[wordIndex];

    if (direction == DIRECTION_FORWARDS) {
      letterIndex++;

      if (letterIndex == word.length) {
        direction = DIRECTION_BACKWARDS;
        clearInterval(wordTypeInterval);
        setTimeout(startTyping, WORD_STAY_DELAY);
      }
    } else if (direction == DIRECTION_BACKWARDS) {
      letterIndex--;

      if (letterIndex == 0) {
        nextWord();
      }
    }

    const textToType = word.substring(0, letterIndex);

    element.textContent = textToType;
  }

  function nextWord() {
    letterIndex = 0;
    direction = DIRECTION_FORWARDS;
    wordIndex++;

    if (wordIndex == words.length) {
      wordIndex = 0;
    }
  }
}

//Dark Mode
const dayNightCheckbox = document.querySelector(".dayNight input");
const body = document.body;

function toggleTheme() {
  // Ajouter ou supprimer la classe pour changer de thème
  body.classList.toggle("dark-mode");
  initCardAnimation();

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

// Work Section (Card)
initCardAnimation();
function initCardAnimation() {
  const arrowBtns = document.querySelectorAll(".arrow-btn");
  const cardBtns = document.querySelectorAll(".card");
  let light = document.body.classList.contains("dark-mode")
    ? "#fff"
    : "#0b0b11";
  let light2 = document.body.classList.contains("dark-mode")
    ? "#fff"
    : "#161616";
  let currentCard = 2;
  let dir = 1;
  moveCards();

  arrowBtns.forEach((btn, i) => {
    btn.onpointerenter = (e) =>
      gsap.to(btn, {
        ease: "expo",
        "box-shadow": "0 3px 4px #00000050",
      });

    btn.onpointerleave = (e) =>
      gsap.to(btn, {
        ease: "expo",
        "box-shadow": "0 6px 8px #00000030",
      });

    btn.onclick = (e) => {
      dir = i == 0 ? 1 : -1;
      if (i == 0) {
        currentCard--;
        currentCard = Math.max(0, currentCard);
      } else {
        currentCard++;
        currentCard = Math.min(4, currentCard);
      }
      moveCards(0.95);
    };
  });

  cardBtns.forEach((btn, i) => {
    btn.onpointerenter = (e) =>
      gsap.to(btn, {
        ease: "power3",
        overwrite: "auto",
        "box-shadow": () =>
          i == currentCard ? "0 6px 11px #00000030" : "0 6px 11px #00000030",
      });

    btn.onpointerleave = (e) =>
      gsap.to(btn, {
        ease: "power3",
        overwrite: "auto",
        "box-shadow": () =>
          i == currentCard ? "0 6px 11px #00000030" : "0 0px 0px #00000030",
      });

    btn.onclick = (e) => {
      dir = i < currentCard ? 1 : -1;
      currentCard = i;
      moveCards(0.75);
    };
  });

  function moveCards(dur = 0) {
    gsap
      .timeline({
        defaults: {
          duration: dur,
          ease: "power3",
          stagger: { each: -0.03 * dir },
        },
      })
      .to(
        ".card",
        {
          x: -350 * currentCard,
          y: (i) => (i == currentCard ? 0 : 15),
          height: (i) => (i == currentCard ? 400 : 350),
          ease: "elastic.out(0.4)",
        },
        0
      )
      .to(
        ".card",
        {
          cursor: (i) => (i == currentCard ? "default" : "pointer"),
          "box-shadow": (i) =>
            i == currentCard ? "0 6px 11px #00000030" : "0 0px 0px #00000030",
          border: (i) =>
            i == currentCard ? "2px solid #26a" : "0px solid #fff",
          background: (i) =>
            i == currentCard
              ? `radial-gradient(100% 100% at top, ${light} 0%, ${light} 99%)`
              : `radial-gradient(100% 100% at top, ${light} 20%, ${light2} 175%)`,
          ease: "expo",
        },
        0
      )
      .to(
        ".icon svg",
        {
          attr: {
            stroke: (i) => (i == currentCard ? "transparent" : "#36a"),
            fill: (i) => (i == currentCard ? "#36a" : "transparent"),
          },
        },
        0
      )
      .to(
        ".arrow-btn-prev",
        {
          autoAlpha: currentCard == 0 ? 0 : 1,
        },
        0
      )
      .to(
        ".arrow-btn-next",
        {
          autoAlpha: currentCard == 4 ? 0 : 1,
        },
        0
      )
      .to(
        ".card h4",
        {
          y: (i) => (i == currentCard ? 0 : 8),
          opacity: (i) => (i == currentCard ? 1 : 0),
        },
        0
      );
  }
}

//Coole exemple

document.addEventListener("DOMContentLoaded", function () {
  var parent = document.querySelector(".splitview"),
    topPanel = parent.querySelector(".top"),
    handle = parent.querySelector(".handle"),
    skewHack = 0,
    delta = 0;

  // If the parent has .skewed class, set the skewHack var.
  if (parent.className.indexOf("skewed") != -1) {
    skewHack = 1000;
  }

  parent.addEventListener("mousemove", function (event) {
    // Get the delta between the mouse position and center point.
    delta = (event.clientX - window.innerWidth / 2) * 0.5;

    // Move the handle.
    handle.style.left = event.clientX + delta - 3 + "px";

    // Adjust the top panel width.
    topPanel.style.width = event.clientX + skewHack + delta + "px";
  });
});

const data = [
  {
    title: "Calculette",
    description:
      "Une calculette simple et fonctionnel pour faire des plus petits aux plus grands calculs ! Un projet principalement en JS pour effectuer les calculs avec bien sur du HTML et CSS pour styliser le tout.",
    banner: "../source/portfolio/calculator.jpg",
    link: "projectPortfolio/calculator.html",
  },
  {
    title: "Quiz",
    description:
      "Voila un Quiz simple principalement fais en JS afin de tester ses connaisances théorique sur le développement web !",
    banner: "../source/portfolio/quiz.jpg",
    link: "projectPortfolio/quiz.html",
  },
  {
    title: "Pierre Feuille Ciseau",
    description:
      "Le jeu le plus emblématique de nos enfances sur un écran ! Vous pouvez vous entrainer pour ne plus jamais perdre à ce jeu ;)",
    banner: "../source/portfolio/rps.jpg",
    link: "projectPortfolio/rps.html",
  },
  {
    title: "Chronomètre",
    description:
      "Chronomètrez vous dès maintenant avec notre chrono simple pour ne pas compliqué cette tâche simple.",
    banner: "../source/portfolio/chrono.jpg",
    link: "projectPortfolio/stopwatch.html",
  },
  {
    title: "Mot de passe",
    description:
      "Un générateur de mot de passe est utile si vous manquez d'inspiration ! L'utilisation du JS est nécessaire pour ce projet !",
    banner: "../source/portfolio/mdp.jpg",
    link: "projectPortfolio/passwordGen.html",
  },
  {
    title: "Vitesse de frappe",
    description:
      "Faites un rapide test pour connaitre votre vitesse de frappe et/ou entrainez vous pour devenir le meilleur ;)",
    banner: "../source/portfolio/typingText.jpg",
    link: "projectPortfolio/typingText.html",
  },
  {
    title: "Echecs",
    description:
      "Les echecs travaillent la rapidité de sa reflexion, vous êtes 2 joueurs et vous ne savez pas quoi faire ? Jouez !",
    banner: "../source/portfolio/chess.jpg",
    link: "projectPortfolio/chess.html",
  },
  {
    title: "Système Solaire",
    description:
      "Un système solaire simple pour en apprendre un peu plus sur les planètes et les étoiles qui nous entour !",
    banner: "../source/portfolio/solar.jpg",
    link: "projectPortfolio/solar.html",
  },
];

let usedIndices = [];
let used2Indices = [];

function getRandomIndex() {
  let randomIndex;

  do {
    randomIndex = Math.floor(Math.random() * 6) + 1;
  } while (usedIndices.includes(randomIndex));

  usedIndices.push(randomIndex);
  return randomIndex;
}

function updateBox(index) {
  const project = document.getElementById(`project${index}`);
  project.style.opacity = 0;

  setTimeout(() => {
    let randomData;

    do {
      randomData = data[Math.floor(Math.random() * data.length)];
    } while (used2Indices.includes(randomData));

    used2Indices.push(randomData);
    project.querySelector("#title" + index).textContent = randomData.title;
    project.querySelector("#description" + index).textContent =
      randomData.description;
    project.querySelector("#banner" + index).src = randomData.banner;

    // Mise à jour du href du lien (<a>) en remontant jusqu'à l'élément <a> parent
    const linkElement = project.closest("a");
    if (linkElement) {
      linkElement.href = randomData.link;
    }

    project.style.opacity = 1;
  }, 500); // 500 milliseconds = transition duration
}

function changeBox() {
  setInterval(() => {
    if (usedIndices.length === 6) {
      // Reset usedIndices if all indices have been used
      usedIndices = [];
    }
    if (used2Indices.length === data.length) {
      // Reset usedIndices if all indices have been used
      used2Indices = [];
    }

    const randomIndex = getRandomIndex();
    updateBox(randomIndex);
  }, 5000); // 10000 milliseconds = 10 seconds
}

changeBox();
