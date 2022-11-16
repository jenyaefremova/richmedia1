"use strict";

const coins = document.body.querySelector(".coins");
const playButton = document.body.querySelector(".play-button");
let game = document.body.querySelector(".game");
let pageOfResults = document.body.querySelector(".page-of-results");


// переход с 1 на 2 экран
playButton.addEventListener("click", () => {
  document.body.querySelector(".first-page").classList.add('display-none');
  document.body.querySelector(".game").classList.remove('display-none');
});

// при клике - анимация кошелька/крест
coins.addEventListener("click", (event) => {
  let target = event.target;
  target.setAttribute("data-selected", '1');

  if(target.classList.contains('true-coin')) {
    showSmilingBag();
  }
  if(target.classList.contains('false-coin')) {
    showSadBag();
  }
});

let coinsArr = document.body.querySelectorAll(".coin");

//каждую 0,1 сек проверяем состояние всех монеток
setInterval (function () {
  // собираем массивы из прокликанных и непрокликанных монеток
  let uncollectedArr = [];
  let collectedArr = [];
  for (let coin of coinsArr) {
    if ('0' === coin.dataset.selected) {
      uncollectedArr.push(coin);
    }
    if ('1' === coin.dataset.selected) {
      collectedArr.push(coin);
    }
  }

  // если кликнул вообще все монетки - переход на 3 экран 
  let counter = 0;
  if (collectedArr.length === coinsArr.length) {
    setTimeout(function () {
      showResult();
      }, 800);
  }

  // если у всех непрокликанных монеток координата y больше 700 - переход на 3 экран
  for (let i=0; i < uncollectedArr.length; i++) {
    if (uncollectedArr[i].getBoundingClientRect().y < 700) {
      break;
    }
    else {
      counter++;
      if (counter === uncollectedArr.length) {
        setTimeout(function () {
          showResult();
          }, 800);
      }
    }
  }

}, 100);

//функция показа экрана с результатами
function showResult() {
  game.classList.add("display-none");
  pageOfResults.classList.remove("display-none");

  //если собрал все правильные монетки/не собрал ни одной правильной - другие надписи на странице результатов
let trueCoinsFirstPageArr = document.body.querySelectorAll(".true-coin-first-page");
let counterTrue = 0;
for (let trueCoin of trueCoinsFirstPageArr) {
  if ('1' === trueCoin.dataset.selected) {
    counterTrue++;
  }
}

  if (counterTrue === trueCoinsFirstPageArr.length) {
    showRightHeaderCollectedCoins();
  }
  if (counterTrue === 0) {
    showRightHeaderUncollectedCoins();
  }

//какие монетки показывать в результатах в каком блоке
let trueCoinsArr = document.body.querySelectorAll(".true-coin");
for (let i=0; i < (trueCoinsArr.length / 3); i++) {
  if ('0' === trueCoinsArr[i].dataset.selected) {
    trueCoinsArr[(i+(trueCoinsArr.length / 3))].classList.add("display-none");
  }
  else {
    trueCoinsArr[(i+2*(trueCoinsArr.length / 3))].classList.add("display-none");
  }
}
}

function showRightHeaderCollectedCoins() {
  document.body.querySelector(".header_collected").classList.add("display-none");
  document.body.querySelector(".header_collected_all").classList.remove("display-none");
  document.body.querySelector(".uncollected_coins").classList.add("display-none");
}
function showRightHeaderUncollectedCoins() {
  document.body.querySelector(".header_uncollected").classList.add("display-none");
  document.body.querySelector(".header_uncollected_all").classList.remove("display-none");
  document.body.querySelector(".collected_coins").classList.add("display-none");
}

function showSmilingBag() {
  document.body.querySelector(".bagNeutral").classList.add('display-none');
  document.body.querySelector(".bagBad").classList.add('display-none');
  document.body.querySelector(".bagGood").classList.remove('display-none');
  setTimeout(function () {
  document.body.querySelector(".bagGood").classList.add('display-none');
  document.body.querySelector(".bagNeutral").classList.remove('display-none');
  }, 600);
}

function showSadBag() {
    document.body.querySelector(".game").classList.add('red-layout');
    setTimeout(function () {
      document.body.querySelector(".game").classList.remove('red-layout');
      }, 500);  
}


