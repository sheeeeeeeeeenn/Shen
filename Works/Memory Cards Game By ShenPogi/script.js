const cardsContainer = document.getElementById("cards-container");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const currentElement = document.getElementById("current");
const showButton = document.getElementById("show");
const hideButton = document.getElementById("hide");
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const addCardButton = document.getElementById("add-card");
const clearButton = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

let currentActiveCard = 0;
const cardsElement = [];

const cardsData = [
  {
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheets",
  },
  {
    question: "What year was JavaScript launched?",
    answer: "1995",
  },
  {
    question: "What does HTML stand for?",
    answer: "Hypertext Markup Language",
  },
];
// const cardsData = getCardsData();

function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  if (index === 0) card.classList.add("active");
  card.innerHTML = `
    <div class="inner-card">
        <div class="inner-card-front">
        <p>${data.question}</p>
    </div>
    <div class="inner-card-back">
        <p>${data.answer}</p>
    </div>
    </div>
  `;
  card.addEventListener("click", () => card.classList.toggle("show-answer"));
  cardsElement.push(card);
  cardsContainer.appendChild(card);
  updateCurrentText();
}

function updateCurrentText() {
  currentElement.innerText = `${currentActiveCard + 1}/${cardsElement.length}`;
}

// function getCardsData() {
//   const cards = JSON.parse(localStorage.getItem("cards"));
//   return cards === null ? [] : cards;
// }

// function setCardsData(cards) {
//   localStorage.setItem("cards", JSON.stringify(cards));
//   history.go(0);
// }

// Event Listeners
nextButton.addEventListener("click", () => {
  cardsElement[currentActiveCard].className = "card left";
  currentActiveCard++;
  if (currentActiveCard > cardsElement.length - 1) {
    currentActiveCard = 0;
  }
  cardsElement[currentActiveCard].className = "card active";
  updateCurrentText();
});

prevButton.addEventListener("click", () => {
  cardsElement[currentActiveCard].className = "card right";
  currentActiveCard--;
  if (currentActiveCard < 0) {
    currentActiveCard = cardsElement.length - 1;
  }
  cardsElement[currentActiveCard].className = "card active";
  updateCurrentText();
});

showButton.addEventListener("click", () => addContainer.classList.add("show"));
hideButton.addEventListener("click", () =>
  addContainer.classList.remove("show")
);

addCardButton.addEventListener("click", () => {
  const question = questionElement.value;
  const answer = answerElement.value;
  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };
    createCard(newCard);
    questionElement.value = "";
    answerElement.value = "";
    addContainer.classList.remove("show");
    cardsData.push(newCard);
    // setCardsData(cardsData);
  }
});

clearButton.addEventListener("click", () => {
  //   localStorage.clear();
  cardsContainer.innerHTML = "";
  currentElement.innerText = "";
  //   history.go(0);
});

// Init
createCards();

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
