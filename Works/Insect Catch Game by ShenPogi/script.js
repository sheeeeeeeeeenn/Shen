const screens = document.querySelectorAll(".screen");
const chooseInsectButtons = document.querySelectorAll(".choose-insect-btn");
const startButton = document.getElementById("start-btn");
const gameContainer = document.getElementById("game-container");
const timeElement = document.getElementById("time");
const scoreElement = document.getElementById("score");
const message = document.getElementById("message");
let seconds = 0;
let score = 0;
let selectedInsect = {};

startButton.addEventListener("click", () => screens[0].classList.add("up"));

const increaseScore = () => {
  score++;
  if (score > 19) message.classList.add("visible");
  scoreElement.innerHTML = `Score: ${score}`;
};

const addInsects = () => {
  setTimeout(createInsect, 1000);
  setTimeout(createInsect, 1500);
};

const catchInsect = function () {
  increaseScore();
  this.classList.add("caught");
  setTimeout(() => this.remove, 2000);
  addInsects();
};

const getRandomLocation = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x, y };
};

const createInsect = () => {
  const insect = document.createElement("div");
  insect.classList.add("insect");
  const { x, y } = getRandomLocation();
  insect.style.top = `${y}px`;
  insect.style.left = `${x}px`;
  insect.innerHTML = `<img src="${selectedInsect.src}" 
  alt="${selectedInsect.alt}" 
  style="transform: rotate(${Math.random() * 360}deg)" />`;
  insect.addEventListener("click", catchInsect);
  gameContainer.appendChild(insect);
};

const increaseTime = () => {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeElement.innerHTML = `Time: ${m}:${s}`;
  seconds++;
};

const startGame = () => setInterval(increaseTime, 1000);

chooseInsectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    const src = image.getAttribute("src");
    const alt = image.getAttribute("alt");
    selectedInsect = { src, alt };
    screens[1].classList.add("up");
    setTimeout(createInsect, 1000);
    startGame();
  });
});

 // Function to show the SweetAlert2 rating dialog
 function showRatingDialog() {
  Swal.fire({
      title: 'Rate Now',
      html: `
          <div id="rating-container">
              <i class="star far fa-star" data-rating="1"></i>
              <i class="star far fa-star" data-rating="2"></i>
              <i class="star far fa-star" data-rating="3"></i>
              <i class="star far fa-star" data-rating="4"></i>
              <i class="star far fa-star" data-rating="5"></i>
          </div>
          <div id="rating-text">Select a rating</div>`,
      showCancelButton: true,
      showConfirmButton: false,
  });

  const ratingText = document.getElementById('rating-text');
  const stars = document.querySelectorAll('.star');

  stars.forEach(star => {
      star.addEventListener('click', () => {
          const rating = star.getAttribute('data-rating');
          Swal.close();
          showThankYouMessage(rating);
      });

      star.addEventListener('mouseover', () => {
          const rating = star.getAttribute('data-rating');
          updateRatingText(rating);
          applyHoverEffect(rating);
      });

      star.addEventListener('mouseout', () => {
          resetStars();
          ratingText.innerText = 'Select a rating';
      });
  });

  function updateRatingText(rating) {
      let ratingDescription = '';
      switch (parseInt(rating)) {
          case 1:
              ratingDescription = 'Poor';
              break;
          case 2:
              ratingDescription = 'Unsatisfactory';
              break;
          case 3:
              ratingDescription = 'Satisfactory';
              break;
          case 4:
              ratingDescription = 'Very Satisfactory';
              break;
          case 5:
              ratingDescription = 'Outstanding';
              break;
          default:
              ratingDescription = 'Select a rating';
      }
      ratingText.innerText = ratingDescription;
  }

  function applyHoverEffect(rating) {
      resetStars();
      for (let i = 1; i <= rating; i++) {
          const star = document.querySelector(`.star[data-rating="${i}"]`);
          star.classList.add('fas');
          star.classList.remove('far');
      }
  }

  function resetStars() {
      stars.forEach(star => {
          star.classList.add('far');
          star.classList.remove('fas');
      });
  }
}

// Function to show the "THANK YOU" message with the selected rating
function showThankYouMessage(rating) {
  Swal.fire({
      text: `THANK YOU FOR RATING MY APPLICATION! You rated it as ${ratingDescription(rating)}.`,
      onClose: () => {
          // Redirect to the main page after the dialog is closed
          window.location.href = '../index2.html';
      }
  });
}

function ratingDescription(rating) {
  switch (parseInt(rating)) {
      case 1:
          return 'Poor';
      case 2:
          return 'Unsatisfactory';
      case 3:
          return 'Satisfactory';
      case 4:
          return 'Very Satisfactory';
      case 5:
          return 'Outstanding';
      default:
          return 'Unknown';
  }
}

document.getElementById('rateButton').addEventListener('click', showRatingDialog);