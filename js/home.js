"use strict";

const slides = document.querySelectorAll(".slide");
const slide1 = document.querySelector('.slide1');
const slide2 = document.querySelector('.slide2');
const slide3 = document.querySelector('.slide3');
const rightBtn = document.querySelector(".right-btn");
const leftBtn = document.querySelector(".left-btn");
const dotContainer = document.querySelector(".dots");
const searchBtn = document.querySelector('.search-btn');
const sbSearchInput = document.querySelector('.sb-search-input')
const sbSearchSubmit = document.querySelector('.sb-search-submit')
const form = document.querySelector('.form');
//const sbSearchInput = document.querySelector('.sb-search-input')
let curSlide = 0;
const maxSlide = slides.length;
let moviesInfo = document.querySelector('.movies-info')
//let movies = '';
let movieIDs = [];
let moviesTitle = [];

////////////////////////
function buttonUp(){
  let valux = sbSearchInput.value; 
     valux = valux.trim().length;
    //  if(valux !== 0){
    //      sbSearchSubmit.style.zIndex = '99';
    //  } else{
    //   　　sbSearchInput.value = ''; 
    //      sbSearchSubmit.style.zIndex = '-999';
    //  }
}

//$(document).ready(function(){
 const submitIcon = document.querySelector('.sb-icon-search');
 const submitInput = document.querySelector('.sb-search-input');
 const searchBox = document.querySelector('.sb-search');
 let isOpen = false;
 
 window.addEventListener('mouseup', () => {
    if(isOpen === true){
    submitInput.value = '';
    // sbSearchSubmit.style.zIndex = '-999';
    //submitIcon.click();
    }
 })
 
//  submitIcon.addEventListener('mouseup', () => {
//   return false;
//  })

//  searchBox.addEventListener('mouseup', () => {
//   return false;
//  })
         
 submitIcon.addEventListener('click', () => {
  if(isOpen == false){
    searchBox.classList.add('sb-search-open');
    isOpen = true;
  } else {
    searchBox.classList.remove('sb-search-open');
    isOpen = false;
  }  
 });

//});

////////////////////////

//create dots
const createDots = () => {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots_dot" data-slide='${i}'></button>`
    );
  });
};
createDots();

//activate dots
const activateDot = (slide) => {
  document.querySelectorAll(".dots_dot").forEach((dot) => {
    dot.classList.remove("dots_dot--active");
  });

  document
    .querySelector(`.dots_dot[data-slide="${slide}"]`)
    .classList.add("dots_dot--active");
};
activateDot(0);

//go to next/prev slide by clicking dots
const changePagebyDots = () => {
  const dotsdot = document.querySelectorAll(".dots_dot");
  dotsdot.forEach((dot) => {
    dot.addEventListener("click", () => {
      let curDot = dot.dataset.slide;
      goToSlide(curDot);
      activateDot(curDot);
    });
  });
};
changePagebyDots();

//go to prev slide by clicking arrow
const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
goToSlide(0);

//go to next slide by clicking arrow
const nextSlide = function () {
  curSlide === slides.length - 1 ? (curSlide = 0) : curSlide++;
  goToSlide(curSlide);
  activateDot(curSlide);
};

//go to prev slide by clicking arrow
const prevSlide = function () {
  curSlide === 0 ? (curSlide = slides.length - 1) : curSlide--;
  goToSlide(curSlide);
  activateDot(curSlide);
};

rightBtn.addEventListener("click", nextSlide);
leftBtn.addEventListener("click", prevSlide);

//go to next slide by time
 const time = () => {
  nextSlide();
 };
setInterval(time, 7000);

//API Key
//b87a9ea4eece329640025b4a1814d0b1
//https://api.themoviedb.org/3/movie/550?api_key=b87a9ea4eece329640025b4a1814d0b1

const getAllMovies = async function () {
  try {
    let baseURL = 'https://api.themoviedb.org/3/'
    let apiKey = 'b87a9ea4eece329640025b4a1814d0b1'
    let movies = ''
    //genre
    //let api = `${baseURL}genre/movie/list?api_key=${apiKey}&language=en-US`;

    //discover
    // let api = `${baseURL}discover/movie?api_key=${apiKey}&language=en-US
    // &sort_by=popularity.desc&page=1&with_watch_monetization_types=flatrate&year=1995`;

    //movie
    // let movieID = 16
    // let api = `${baseURL}movie/${movieID}?api_key=${apiKey}&language=en-US`;
    let api = `${baseURL}movie/now_playing?api_key=${apiKey}`;
    let fetchData = await fetch(api, {
      method: "GET",
    })
    if(!fetchData.ok) throw new Error(`${fetchData.status}`);
    const jsonData = await fetchData.json();
    movies = jsonData;
    for(let i = 0; i < jsonData.results.length; i++) {
      movieIDs.push(jsonData.results[i].id)
      moviesTitle.push(jsonData.results[i].title)
    }
    renderMovies(movies);
    clickedMovie();
checkTitle();
    console.log(movieIDs)


  } catch(err) {
    alert(`something went wrong. ${err.message}`);
  }
}
getAllMovies();
console.log(movieIDs)

const checkTitle = () => {
  moviesTitle.forEach((title, i) => {
    const index = movieIDs[i];
    console.log(title, index)


      form.addEventListener('submit', () => {
        //e.preventDefault()
        if(title === sbSearchInput.value) {
      fetchMovie(index);
       //localStorage.setItem('movietitle', JSON.stringify(sbSearchInput.value));
      //  localStorage.setItem('movieInfo', JSON.stringify(movies.results[i]))
      //  window.open("movieDetail.html")
      }
    })
  })
}


const renderMovies = (movies) => {
  let movieImageURL = "http://image.tmdb.org/t/p/w500"
  movies.results.forEach((movie, i) => {
  const moviesContainer = document.createElement("div");
  moviesContainer.setAttribute("class", "movie");
  moviesContainer.innerHTML = `
      <img class="movie-img" src="${movieImageURL}${movie.poster_path}" alt="movie" data-indexnum="${i}">
      <p>${movie.title}</p>
    `;
    moviesInfo.insertAdjacentElement("beforeend", moviesContainer);
  })

  const content1 = `
        <img
          src="${movieImageURL}${movies.results[4].backdrop_path}"
          alt="movie-information"
        />
  `
    slide1.insertAdjacentHTML('beforeend', content1)

    const content2 = `
        <img
          src="${movieImageURL}${movies.results[11].backdrop_path}"
          alt="movie-information"
        />
  `
    slide2.insertAdjacentHTML('beforeend', content2)

    const content3 = `
        <img
          src="${movieImageURL}${movies.results[1].backdrop_path}"
          alt="movie-information"
        />
  `
    slide3.insertAdjacentHTML('beforeend', content3)
}

const clickedMovie = () => {
const movieImg = document.querySelectorAll('.movie-img')
  movieImg.forEach((movie) => {
    movie.addEventListener("click", () => {
      const index = movieIDs[movie.dataset.indexnum];
      console.log(index)
      fetchMovie(index);
    });
  })
}

const fetchMovie = async function (index) {
  try {
    const baseURL = 'https://api.themoviedb.org/3/'
    const apiKey = 'b87a9ea4eece329640025b4a1814d0b1'
    const movieID = index
    const api = `${baseURL}movie/${movieID}?api_key=${apiKey}`;

    let fetchData = await fetch(api, {
      method: "GET",
    })
    if(!fetchData.ok) throw new Error(`${fetchData.status}`);
      await fetchData.json().then((movieInfo) => {
        console.log(movieInfo)
      localStorage.setItem('movieInfo', JSON.stringify(movieInfo));
      window.open("movieDetail.html")
    })


  } catch(err) {
    alert(`something went wrong. ${err.message}`);
  }
}




