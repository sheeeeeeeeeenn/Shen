const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readButton = document.getElementById("read");
const toggleButton = document.getElementById("toggle");
const closeButton = document.getElementById("close");

const data = [
  {
    image: "drink",
    text: "I'm Thirsty",
  },
  {
    image: "food",
    text: "I'm Hungry",
  },
  {
    image: "tired",
    text: "I'm Tired",
  },
  {
    image: "hurt",
    text: "I'm Hurt",
  },
  {
    image: "happy",
    text: "I'm Happy",
  },
  {
    image: "angry",
    text: "I'm Angry",
  },
  {
    image: "sad",
    text: "I'm Sad",
  },
  {
    image: "scared",
    text: "I'm Scared",
  },
  {
    image: "outside",
    text: "I Want To Go Outside",
  },
  {
    image: "home",
    text: "I Want To Go Home",
  },
  {
    image: "school",
    text: "I Want To Go To School",
  },
  {
    image: "grandma",
    text: "I Want To Go To Grandmas",
  },
];

function createBox(item) {
  const box = document.createElement("div");
  const { image, text } = item;
  box.classList.add("box");
  box.innerHTML = `
    <img src='https://github.com/bradtraversy/vanillawebprojects/blob/master/speech-text-reader/img/${image}.jpg?raw=true' alt="${text}"/>
    <p class="info">${text}</p>
    `;
  box.addEventListener("click", () => handleSpeech(text, box));
  main.appendChild(box);
}

data.forEach(createBox);

let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voicesSelect.appendChild(option);
  });
}

function handleSpeech(text, box) {
  setTextMessage(text);
  speakText();
  box.classList.add("active");
  setTimeout(() => box.classList.remove("active"), 800);
}

const message = new SpeechSynthesisUtterance();

function setTextMessage(text) {
  message.text = text;
}

function speakText() {
  speechSynthesis.speak(message);
}

function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

// Event Listeners
toggleButton.addEventListener("click", () => {
  document.getElementById("text-box").classList.toggle("show");
});
closeButton.addEventListener("click", () => {
  document.getElementById("text-box").classList.remove("show");
});
speechSynthesis.addEventListener("voiceschanged", getVoices);
voicesSelect.addEventListener("change", setVoice);
readButton.addEventListener("click", () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();

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