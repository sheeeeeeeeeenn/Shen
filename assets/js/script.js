'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }


/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});

/**
 * navbar toggle
 */

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {

  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);

});

/**
 * skills toggle
 */

const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", function () {

    elemToggleFunc(toggleBtnBox);
    for (let i = 0; i < toggleBtns.length; i++) { elemToggleFunc(toggleBtns[i]); }
    elemToggleFunc(skillsBox);

  });
}

/**
 * dark & light theme toggle
 */

const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {

  elemToggleFunc(themeToggleBtn);

  if (themeToggleBtn.classList.contains("active")) {
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");

    localStorage.setItem("theme", "light_theme");
  } else {
    document.body.classList.add("dark_theme");
    document.body.classList.remove("light_theme");

    localStorage.setItem("theme", "dark_theme");
  }

});

/**
 * check & apply last time selected theme from localStorage
 */

if (localStorage.getItem("theme") === "light_theme") {
  themeToggleBtn.classList.add("active");
  document.body.classList.remove("dark_theme");
  document.body.classList.add("light_theme");
} else {
  themeToggleBtn.classList.remove("active");
  document.body.classList.remove("light_theme");
  document.body.classList.add("dark_theme");
  
}
  // Function to hide the loading screen after 1 second
function hideLoadingScreen() {
  setTimeout(function() {
    document.querySelector('.loading-screen').style.display = 'none';
  }, 1000);
}

// Function to center the Omnitrix image
function centerOmnitrix() {
  var loadingScreen = document.querySelector('.loading-screen');
  var windowHeight = window.innerHeight;
  loadingScreen.style.height = windowHeight + 'px';
}

// Function to toggle the 3 dots animation
function toggleDotsAnimation() {
  var dots = document.querySelectorAll('.dot');
  var animateDots = function() {
    dots.forEach(function(dot) {
      dot.classList.toggle('active');
    });
    requestAnimationFrame(animateDots);
  };
  animateDots();
}

// Function to hide the loading screen with a fade-out animation and navigate to Home
function hideLoadingScreen() {
  var loadingScreen = document.querySelector('.loading-screen');
  loadingScreen.classList.add('fade-out');

  // After the animation completes (.5 second), navigate to the "Home" section
  setTimeout(function() {
    loadingScreen.style.display = 'none';
    window.location.href = '#home';
  }, 500);
}


// Event listener for when the window has fully loaded
window.addEventListener('load', function() {
  hideLoadingScreen();
  centerOmnitrix();
  toggleDotsAnimation();
});

// Event listener for window resize
window.onresize = function() {
  centerOmnitrix();
};


const logo = document.querySelector('.logo');

setTimeout(() => {
   logo.classList.add('animate-logo');
}, 1000);

const imageToSwap = document.getElementById("imageToSwap");
  const originalSrc = imageToSwap.src;
  const newSrc = "assets/images/Shen2.jpg"; // Replace with the path to your second image

  // Function to swap images on click
  imageToSwap.addEventListener("click", function() {
    if (imageToSwap.src === originalSrc) {
      imageToSwap.src = newSrc;
    } else {
      imageToSwap.src = originalSrc;
    }
  });

  // Function to swap images on mouseover/mouseout
  imageToSwap.addEventListener("mouseover", function() {
    imageToSwap.src = newSrc;
  });

  imageToSwap.addEventListener("mouseout", function() {
    imageToSwap.src = originalSrc;
  });
  

  // Ben 10 Feedback //
  function showPopup() {
    Swal.fire({
      title: 'THANK YOU!',
      text: 'for the FEEDBACK and TIME!',
      imageUrl: 'assets/images/Waving.gif', // BEN 10 GIF URL
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'BEN 10',
      showCloseButton: true,
      confirmButtonText: 'OK',
      customClass: {
        title: 'popup-title',
        htmlContainer: 'popup-text',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user clicks "OK," refresh the page
        location.reload();
      }
    });
  }
  

// SWAPPING TEXT
const elts = {
  text1: document.getElementById("text1"),
  text2: document.getElementById("text2")
};

const texts = [
  "PROGRAMMER",
  "GAMER",
  "EDITOR",
  "COMPUTER SCIENCE STUDENT",
  "DIGITAL ARTIST",

];

const morphTime = 1.5;
const cooldownTime = 0.50;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
  morph -= cooldown;
  cooldown = 0;

  let fraction = morph / morphTime;

  if (fraction > 1) {
      cooldown = cooldownTime;
      fraction = 1;
  }

  setMorph(fraction);
}

function setMorph(fraction) {
  elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  fraction = 1 - fraction;
  elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
  morph = 0;

  elts.text2.style.filter = "";
  elts.text2.style.opacity = "100%";

  elts.text1.style.filter = "";
  elts.text1.style.opacity = "0%";
}

function animate() {
  requestAnimationFrame(animate);

  let newTime = new Date();
  let shouldIncrementIndex = cooldown > 0;
  let dt = (newTime - time) / 1500;
  time = newTime;

  cooldown -= dt;

  if (cooldown <= 0) {
      if (shouldIncrementIndex) {
          textIndex++;
      }

      doMorph();
  } else {
      doCooldown();
  }
}

animate();



// ADS TIMER 
function displayAdvertisementPopup() {
  const ratingTexts = [
    '1 - Very Unsatisfied',
    '2 - Unsatisfied',
    '3 - Neutral',
    '4 - Satisfied',
    '5 - Very Satisfied',
  ];

  setTimeout(() => {
    Swal.fire({
      title: 'SHEN WEBSITE PORTFOLIO',
      text: 'Please rate my Portfolio',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Continue?',
      cancelButtonText: 'Close',
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user clicks "Continue?"
        Swal.fire({
          title: 'Rate my PORTFOLIO!',
          text: 'Please rate my Portfolio:',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Submit',
          cancelButtonText: 'Cancel',
          html:
            '<div id="star-rating">' +
            '<div class="star-container">' +
            '<input type="radio" name="rating" id="star1" value="1" /><label for="star1"></label>' +
            '<input type="radio" name="rating" id="star2" value="2" /><label for="star2"></label>' +
            '<input type="radio" name="rating" id="star3" value="3" /><label for="star3"></label>' +
            '<input type="radio" name="rating" id="star4" value="4" /><label for="star4"></label>' +
            '<input type="radio" name="rating" id="star5" value="5" /><label for="star5"></label>' +
            '</div>' +
            '</div>' +
            '<div id="star-text" class="star-text">Select a star rating</div>', // Add a div to display star rating text
          customClass: {
            container: 'landscape-popup',
          },
        }).then((ratingResult) => {
          if (ratingResult.isConfirmed) {
            const selectedRating = document.querySelector('input[name="rating"]:checked');
            if (selectedRating) {
              Swal.fire(
                'Thank You',
                `You rated me ${selectedRating.value} stars - ${ratingTexts[selectedRating.value - 1]}`,
                'success'
              );
            } else {
              Swal.fire('Error', 'Please select a rating!', 'error');
            }
          }
        });

        // Add hover effect to stars and display the rating text
        const starLabels = document.querySelectorAll('.star-container label');
        const starText = document.querySelector('.swal2-html-container #star-text');
        starLabels.forEach((label, index) => {
          label.addEventListener('mouseenter', () => {
            starLabels.forEach((label, index) => {
              label.addEventListener('mouseenter', () => {
                starLabels.forEach((starLabel, i) => {
                  if (i <= index) {
                    starLabel.classList.add('hovered');
                  } else {
                    starLabel.classList.remove('hovered');
                  }
                });
                starText.textContent = ratingTexts[index];
              });
              label.addEventListener('mouseleave', () => {
                starLabels.forEach((starLabel) => {
                  starLabel.classList.remove('hovered');
                });
                const selectedRating = document.querySelector('input[name="rating"]:checked');
                if (selectedRating) {
                  starText.textContent = `You rated: ${ratingTexts[selectedRating.value - 1]}`;
                } else {
                  starText.textContent = 'Select a star rating';
                }
              });
            });
          });
        });
      }
    });
  }, 180000); // 3 minutes = 180,000 milliseconds
}


displayAdvertisementPopup();

// TYPING ANIMATION IN SHEN //


function restartTypingAnimation() {
  var element = document.getElementById('typing-text');
  element.style.animation = 'none';
  element.offsetHeight; 
  element.style.animation = null;
}

setInterval(restartTypingAnimation, 8000); 


