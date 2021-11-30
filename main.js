//initialize constants
const MOVIE_API_KEY = `ae8115887a332015cc3739c9ecb9b70d`;

const API_URL = `https://api.themoviedb.org/3/movie/popular?`;

const IMAGE_URL = `https://image.tmdb.org/t/p/w1080`;

// select dom Elements
let mostPopularDocument = document.querySelector(".most-popular");
let movieContainer = document.querySelector(".movie-container");
let modalContainer = document.querySelector(".modal-container");
let close = document.querySelector(".close");
let movieTitle = document.querySelector(".movie-title");
let movieDetail = document.querySelector(".movie-detail");




//when you click on the image box
movieContainer.addEventListener("click", (event) => {

    if (event.target.classList[0] == "movie-image") {
        //gets the title of the clicked image
        let title = event.target.parentElement.children[2].children[0].innerText
        //gets the clicked image overview which is the hidden input
        let overview = event.target.parentElement.children[0].value;

        // set the title and and the deatils
        movieTitle.innerHTML = title;
        movieDetail.innerHTML = overview;

        // show the modal
        modalContainer.classList = "modal-container show";
    }

})

// click to overly to close the modal
modalContainer.addEventListener("click", (event) => {

    if (event.target.classList[0] == "modal-container") {
        modalContainer.classList = "modal-container hide";
    }
})

// when you click close button
close.addEventListener("click", () => {
    modalContainer.classList = "modal-container hide";
})

// funtion that shows all movies to the DOM
const biuldTheDom = (movies) => {

    mostPopularDocument.innerHTML = "";

    movies.forEach(movie => {

        mostPopularDocument.innerHTML += `<div class="movie">
        <input type="hidden" value="${movie.overview}">
        <img class="movie-image" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="">
       <div class="info">
        <span class="movie-title">${movie.original_title}</span>
        
           <div class="counts">
            <div class="vote-average">
                <span>${movie.vote_average}</span>
            </div>
            <div class="release-date">
                <span>${movie.release_date}</span>
            </div>
           
           </div>
        </div>
    </div>`

    })

}

const getMostPopularMoviews = async () => {

    const request = await fetch(`${API_URL}api_key=${MOVIE_API_KEY}&page=1`);

    const { results } = await request.json();

    biuldTheDom(results);
}

getMostPopularMoviews();