const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
document.addEventListener("DOMContentLoaded", function() {
  const modal = document.getElementById("colorModal");
  const openModalBtn = document.getElementById("openModalBtn");
  const cardBackColorModal = document.getElementById("cardBackColorModal");
  const openCardBackColorModalBtn = document.getElementById("openCardBackColorModalBtn");
  const imageModal = document.getElementById("imageModal");
  const openImageModalBtn = document.getElementById("openImageModalBtn");
  const closeModalBtns = document.querySelectorAll(".close");
  const applyColorBtn = document.getElementById("applyColorBtn");
  const colorPicker = document.getElementById("colorPicker");
  const applyCardBackColorBtn = document.getElementById("applyCardBackColorBtn");
  const cardBackColorPicker = document.getElementById("cardBackColorPicker");
  const applyImageBtn = document.getElementById("applyImageBtn");
  const congratsModal = document.getElementById("congratsModal");

  const imageFiles = {};

  // Abertura e fechamento de modais
  openModalBtn.onclick = function() {
    modal.style.display = "block";
  }

  openCardBackColorModalBtn.onclick = function() {
    cardBackColorModal.style.display = "block";
  }

  openImageModalBtn.onclick = function() {
    imageModal.style.display = "block";
    populateImageSelectors();
  }

  closeModalBtns.forEach(btn => {
    btn.onclick = function() {
      modal.style.display = "none";
      cardBackColorModal.style.display = "none";
      imageModal.style.display = "none";
      congratsModal.style.display = "none";
    }
  });

  applyColorBtn.onclick = function() {
    const selectedColor = colorPicker.value;
    document.body.style.backgroundColor = selectedColor;
    modal.style.display = "none";
  }

  applyCardBackColorBtn.onclick = function() {
    const selectedColor = cardBackColorPicker.value;
    const backFaces = document.querySelectorAll('.back-face');
    backFaces.forEach(face => {
      face.style.backgroundColor = selectedColor;
    });
    cardBackColorModal.style.display = "none";
  }

  applyImageBtn.onclick = function() {
    Object.keys(imageFiles).forEach(framework => {
      const newImageSrc = imageFiles[framework];
      const frontFaces = document.querySelectorAll(`.memory-card[data-framework="${framework}"] .front-face`);
      frontFaces.forEach(face => {
        face.src = newImageSrc;
      });
    });
    imageModal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
    if (event.target === cardBackColorModal) {
      cardBackColorModal.style.display = "none";
    }
    if (event.target === imageModal) {
      imageModal.style.display = "none";
    }
    if (event.target === congratsModal) {
      congratsModal.style.display = "none";
    }
  }

  const cards = document.querySelectorAll('.memory-card');

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let matches = 0;

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    checkForMatch();
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matches += 1;

    if (matches === cards.length / 2) {
      setTimeout(() => {
        congratsModal.style.display = "block";
      }, 500);
    }

    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  (function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  })();

  cards.forEach(card => card.addEventListener('click', flipCard));

  function populateImageSelectors() {
    const imageSelectorsContainer = document.getElementById('imageSelectors');
    imageSelectorsContainer.innerHTML = '';
    const frameworks = ['abacaxi', 'berin', 'Blueberry', 'laranja', 'melancia', 'morango'];
    frameworks.forEach(framework => {
      const selectorDiv = document.createElement('div');
      selectorDiv.classList.add('image-selector');
      selectorDiv.dataset.framework = framework;
      selectorDiv.innerHTML = `
        <label for="${framework}">${framework}</label>
        <input type="file" id="${framework}" accept="image/*" onchange="handleFileSelect(event, '${framework}')">
      `;
      imageSelectorsContainer.appendChild(selectorDiv);
    });
  }

  window.handleFileSelect = function(event, framework) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      imageFiles[framework] = e.target.result;
    }
    reader.readAsDataURL(file);
  }
});
