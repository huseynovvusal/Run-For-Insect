const mainInsect = document.querySelector(".main-insect");
const enemyInsect = document.querySelector(".enemy-insect");
const gameArea = document.querySelector(".game-area");
const scoreSide = document.querySelector(".score");
const yourScore = document.querySelector(".your-score");
const alertSide = document.querySelector(".alert");
const defeatSound = document.querySelector(".defeat-sound");
const backgroundMusic = document.querySelector(".background-music");
const controlLeft = document.querySelector(".control-left");
const controlRight = document.querySelector(".control-right");

events();

function events() {
  window.addEventListener("keydown", moving);
  enemyInsect.addEventListener("animationiteration", randomPositionEnemy);
  controlLeft.addEventListener("click", moveLeft);
  controlRight.addEventListener("click", moveRight);
}

left = 100;
mainInsect.style.left = left + "px";

function moving(e) {
  if (e.key === "ArrowRight") {
    moveRight();
  }

  if (e.key === "ArrowLeft") {
    moveLeft();
  }
}

function moveRight() {
  if (left < 200) {
    left += 100;
    mainInsect.style.left = left + "px";
  }
}

function moveLeft() {
  if (left > 0) {
    left -= 100;
    mainInsect.style.left = left + "px";
  }
}

let score = 0;
let leftEnemy = 100;

function randomPositionEnemy() {
  let random = Math.floor(Math.random() * 3);
  leftEnemy = random * 100;
  enemyInsect.style.left = leftEnemy + "px";
  score++;
  setScore(scoreSide);
  increaseSpeed(0.005);
}

let second = 0;

function increaseSpeed(sec) {
  second += sec;
  enemyInsect.style.animation = `${2.5 - second}s moving infinite linear`;
}

function setScore(forElement) {
  if (score < 10) {
    forElement.innerHTML = "000" + score;
  } else if (score >= 10) {
    forElement.innerHTML = "00" + score;
  } else if (score >= 100) {
    forElement.innerHTML = "0" + score;
  } else {
    forElement.innerHTML = score;
  }
}

setInterval(checkDefeat, 1);

function checkDefeat() {
  let topEnemy = parseInt(
    window.getComputedStyle(enemyInsect).getPropertyValue("top")
  );
  let leftEnemy = parseInt(
    window.getComputedStyle(enemyInsect).getPropertyValue("left")
  );
  let leftMain = parseInt(
    window.getComputedStyle(mainInsect).getPropertyValue("left")
  );

  let minTop = window.innerHeight - 226;
  let maxTop = window.innerHeight - 48;

  if (leftEnemy == leftMain && topEnemy >= minTop && topEnemy <= maxTop) {
    window.removeEventListener("keydown", moving);
    enemyInsect.style.animation = "none";
    enemyInsect.style.top = topEnemy + "px";
    backgroundMusic.pause();
    defeatSound.play();
    controlLeft.style.pointerEvents = "none";
    controlRight.style.pointerEvents = "none";
    setTimeout(() => {
      alertSide.classList.add("alert-visible");
    }, 2000);
    yourScore.textContent = score;
  }
}
