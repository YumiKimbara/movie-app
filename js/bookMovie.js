"use strict";

const icon = document.querySelectorAll(".icon:not(.occupied)");
const totalSeat = document.querySelector(".total-seat");
const totalPrice = document.querySelector(".total-price");
const selectMovie = document.querySelector("select[name=movie]");
let Allseats = [];
let pushedSeat = JSON.parse(localStorage.getItem("seats")) || [];
let getObj, count, price;
let moviePrice = 5;
let currentSelected;
currentSelected = document.querySelector(".current-selected");
let variablestoraged = "";

//check the price of ticket depends on the movie
currentSelected.addEventListener("change", function () {
  const movieNumber = selectMovie.value;

  switch (movieNumber) {
    case "Movie1":
      moviePrice = 5;
      variablestoraged = localStorage.setItem("selectedMovie", this.value);
      break;
    case "Movie2":
      moviePrice = 10;
      variablestoraged = localStorage.setItem("selectedMovie", this.value);
      break;
    case "Movie3":
      moviePrice = 15;
      variablestoraged = localStorage.setItem("selectedMovie", this.value);
      break;
  }
});

const keepMovieInfo = () => {
  if (localStorage.hasOwnProperty("selectedMovie")) {
    //@@@localStorageのデータを使う時は一度下記のように変数にいれるようにする
    let selectedMovie = localStorage.getItem("selectedMovie");
    document.getElementById(selectedMovie).selected = "true";
  }
};
keepMovieInfo();

const increaseNum = () => {
  const checkCount = JSON.parse(localStorage.getItem("ticketInfo"));
  count = checkCount ? checkCount.count : 0;
  price = checkCount ? checkCount.price : 0;
  getObj = checkCount || [];
  console.log(getObj);
  totalSeat.innerHTML = getObj.length === 0 ? 0 : getObj.count;
  totalPrice.innerHTML = getObj.length === 0 ? 0 : getObj.price;
};
increaseNum();

const decreaseNum = () => {
  const checkCount = JSON.parse(localStorage.getItem("ticketInfo"));
  count = checkCount ? checkCount.count : 0;
  getObj = checkCount || [];
  console.log(getObj);
  totalSeat.innerHTML = getObj.length === 0 ? 0 : getObj.count;
  totalPrice.innerHTML = getObj.length === 0 ? 0 : getObj.price;
};

const renderTicketInfo = (e) => {
  const checkSelected = !e.target.classList.value.includes("selected");
  console.log(checkSelected);
  if (checkSelected) {
    count++;
    price += moviePrice;
    let obj = {
      count: count,
      price: price,
    };
    obj = JSON.stringify(obj);
    localStorage.setItem("ticketInfo", obj);
    increaseNum();
  } else {
    count--;
    price -= moviePrice;
    let obj = {
      count: count,
      price: price,
    };
    obj = JSON.stringify(obj);
    localStorage.setItem("ticketInfo", obj);
    decreaseNum();
  }
};

icon.forEach((seat, i) => {
  Allseats.push(seat);
  seat.addEventListener("click", (e) => {
    renderTicketInfo(e);

    console.log(Allseats[i], i);

    const checkSelected = !e.target.classList.value.includes("selected");
    if (checkSelected) {
      e.target.classList.add("fa-user");
      e.target.classList.remove("fa-square");
      e.target.classList.add("selected");
      console.log(i);

      pushedSeat.push(i);
      console.log(pushedSeat);
      localStorage.setItem("seats", JSON.stringify(pushedSeat));
    } else {
      console.log(checkSelected);
      e.target.classList.remove("fa-user");
      e.target.classList.add("fa-square");
      e.target.classList.remove("selected");
      let index = pushedSeat.findIndex((seat) => {
        return seat === Allseats.indexOf(e.target);
      });
      pushedSeat.splice(index, 1);
      console.log(pushedSeat);
      localStorage.setItem("seats", JSON.stringify(pushedSeat));
    }
  });
});

let seatNum = JSON.parse(localStorage.getItem("seats")) || [];
console.log(seatNum);
seatNum.forEach((i) => {
  Allseats[i].classList.add("fa-user");
  Allseats[i].classList.add("selected");
});

//@@@上記のadEventListenner(change)の中で下記の関数を実行すると、
//リロードするたびにまたchangeが発生しないと関数が呼ばれない。
//その為、ローカルストレージに保存してもリロードのたびに消えてしまう
