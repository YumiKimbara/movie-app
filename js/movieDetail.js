const movieDetail = document.querySelector('.movie-detail');

////////////////////////
const sbSearchInput = document.querySelector('.sb-search-input')
const sbSearchSubmit = document.querySelector('.sb-search-submit')
function buttonUp(){
  let valux = sbSearchInput.value; 
  console.log(valux)
     valux = valux.trim().length;
     if(valux !== 0){
         sbSearchSubmit.style.zIndex = '99';
     } else{
      　　sbSearchInput.value = ''; 
         sbSearchSubmit.style.zIndex = '-999';
     }
}

//$(document).ready(function(){
 const submitIcon = document.querySelector('.sb-icon-search');
 const submitInput = document.querySelector('.sb-search-input');
 const searchBox = document.querySelector('.sb-search');
 let isOpen = false;
 
 window.addEventListener('mouseup', () => {
    if(isOpen == true){
    submitInput.value = '';
    sbSearchSubmit.style.zIndex = '-999';
    //submitIcon.click();
    }
 })
 /////////////////////////////
 
 submitIcon.addEventListener('mouseup', () => {
  return false;
 })

 searchBox.addEventListener('mouseup', () => {
  return false;
 })
         
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

const getVideo = async () => {
    try {
        let movieImageURL = "http://image.tmdb.org/t/p/w500"
        const getJsonData = JSON.parse(localStorage.getItem("movieInfo"));
        const baseURL = 'https://api.themoviedb.org/3/'
        const apiKey = 'b87a9ea4eece329640025b4a1814d0b1'
        const api = `${baseURL}movie/${getJsonData.id}/videos?api_key=${apiKey}`
        const fetchData = await fetch(api, {
            method: 'GET',
        })
        fetchData.json().then((movieInfo) => {
            const movieKey = movieInfo.results[0].key
            console.log(movieInfo)
            console.log(getJsonData)
            const allGenres = getJsonData.genres.map((genre) => {
                return genre.name
            });
            contents = `
            <div class="detail-wrapper">
            <div class="detail-container">
            <h2 class="title">${getJsonData.title}</h2>
            <p class="overview">${getJsonData.overview}</p><br>
            <p>genres: ${allGenres}</p>
            <p>release date: ${getJsonData.release_date}</p>
            <p>runtime: ${getJsonData.runtime}m</p>
            <p>${getJsonData.status}</p>
            <div class="buy-ticket-btn"><span>buy ticket</span></div>
            </div>
            <div class="img-container">
            <img src="${movieImageURL}${getJsonData.backdrop_path}" alt="movie" class="main-img img-shadow"/>
            </div>
            </div>
            <h2 class="sub-title">Trailer</h2>
            <iframe width="640" height="360"
            src="https://www.youtube.com/embed/${movieKey}">
            </iframe>
            <h2 class="sub-title">More trailers and videos</h2>


            `
            movieDetail.insertAdjacentHTML("beforeend", contents)
            goToBookkingPage();
            // const imgShadow = document.querySelector('.img-shadow');
            // imgShadow.style.background = `linear-gradient(rgba(248, 229, 197, 0.8), rgba(239, 113, 1, 0.8)),url(${movieImageURL}${getJsonData.backdrop_path})`;

        })

    } catch(err) {
        alert(`Something went wrong. ${err.message}`)
    }
}
getVideo();

const goToBookkingPage = () => {
    const buyTicketBtn = document.querySelector('.buy-ticket-btn')
    buyTicketBtn.addEventListener('click', () => {
      window.open("bookMovie.html");
    })
}
