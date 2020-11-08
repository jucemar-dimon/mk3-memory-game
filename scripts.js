let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let hasMatched = false;
let clickSoundFirstCard = new Audio("./assets/sounds/ui/select_first_card.mp3");
let clickSoundSecondCard = new Audio(
  "./assets/sounds/ui/select_second_card.mp3"
);
let selectingCardSound = new Audio("./assets/sounds/ui/moving_first_card.mp3");

const cards = document.querySelectorAll(".card");
const imagesBack = document.querySelectorAll(".card-back");
const firstCharName = document.querySelector(".first-char-name");
const secondCharName = document.querySelector(".second-char-name");
const firstChar = document.querySelector(".char-first-card");
const secondChar = document.querySelector(".char-second-card");

imagesBack.forEach((card) => {
  card.addEventListener("mouseover", mouseOverCard);
  card.addEventListener("mouseout", mouseOutCard);
});

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

function mouseOverCard() {
  if (lockBoard) {
    this.classList.remove("card-mouseover-first-card");
    this.classList.remove("card-mouseover-second-card");
  } else {
    if (firstCard) {
      this.src = "./assets/images/ui/card_back_2.gif";
    } else {
      this.src = "./assets/images/ui/card_back_1.gif";
    }

    if (hasFlippedCard) {
      this.classList.remove("card-mouseover-first-card");
      this.classList.add("card-mouseover-second-card");
    } else {
      this.classList.remove("card-mouseover-second-card");
      this.classList.add("card-mouseover-first-card");
    }
    playSelectingSound();
  }
}

function mouseOutCard() {
  this.src = "./assets/images/ui/card_back.gif";
}

function playSelectingSound() {
  selectingCardSound.volume = 0.3;
  selectingCardSound.play();
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    firstCharName.textContent = this.dataset.card.replace("-", " ");
    clickSoundFirstCard.play();
    clickSoundFirstCard.volume = 0.5;
    firstChar.src = `./assets/images/stand/${this.dataset.card}.gif`;

    return;
  }
  secondCard = this;
  secondCharName.textContent = this.dataset.card.replace("-", " ");
  clickSoundSecondCard.play();
  clickSoundSecondCard.volume = 0.5;
  secondChar.src = `./assets/images/stand/${this.dataset.card}.gif`;

  hasFlippedCard = false;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    lockBoard = true;
    hasMatched = true;
    playWinsSound();
    stopAnimationCharacters();
    disableCards();
    return;
  }
  unflipCards();
}

function stopAnimationCharacters() {
  firstChar.src = `./assets/images/stand/${firstCard.dataset.card}-selected.png`;
  secondChar.src = `./assets/images/stand/${secondCard.dataset.card}-selected.png`;
}

function playWinsSound() {
  const win = new Audio(`./assets/sounds/wins/${secondCard.dataset.card}.mp3`);
  win.play();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  const firstImage = firstCard.querySelector(".card-front");
  const firstBackImage = firstCard.querySelector(".card-back");
  const secondImage = secondCard.querySelector(".card-front");
  const secondBackImage = secondCard.querySelector(".card-back");
  firstBackImage.removeEventListener("mouseover", mouseOverCard);
  firstBackImage.removeEventListener("mouseout", mouseOutCard);
  secondBackImage.removeEventListener("mouseover", mouseOverCard);
  secondBackImage.removeEventListener("mouseout", mouseOutCard);

  firstImage.classList.add("card-front-finnish");
  secondImage.classList.add("card-front-finnish");

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];

  if (!hasMatched) {
    firstChar.src = "";
    secondChar.src = "";
    firstCharName.textContent = "";
    secondCharName.textContent = "";
    hasMatched = false;
  }

  setTimeout(() => {
    [hasFlippedCard, lockBoard] = [false, false];
  }, 500);
}

function shuffle() {
  cards.forEach((card) => {
    let ramdomPosition = Math.floor(Math.random() * 17);
    card.style.order = ramdomPosition;
  });
}
