const URL = "https://api.themoviedb.org/3/movie/";
const KEY = "?api_key=ed5c2a659c411f0e29dc3defe777092a";
const AMP = "&&";
const LANGUAGE = "language=es-MX";
const POPULAR = "popular";
const PAGE = "page=";

let numPage = 1;

let btnNext = document.getElementById('btnNext');
btnNext.addEventListener('click', () => {
	numPage += 1;
	if (numPage <= 1000) {
		getMovies();
	}
});

let btnPrevious = document.getElementById('btnPrevious');
btnPrevious.addEventListener('click', () => {
	if (numPage > 1) {
		numPage -= 1;
		getMovies();
	}
});

let home = document.getElementById('home');
home.addEventListener('click', () => {
	numPage = 1;
	getMovies();
});

// const getMovies = () => {
//     fetch(URL + KEY + "&&" + LANGUAGE)
//       .then((response) => response.json())
//       .then((json) => console.log(json.title))
//       .catch((err) => console.error('ERROR', err.message))
// };

const getMovies = async () => {
  let response = await fetch(URL + POPULAR + KEY + AMP + LANGUAGE + AMP + PAGE + numPage);

  if (response.status === 200) {
    let json = await response.json();
    let movies = "";

    json.results.forEach((movie) => {
      movies += `
			<div class="movie">
			<img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
			<h3 class="title">${movie.title}</h3> 
			</div>`;
    });
    document.getElementById("content").innerHTML = movies;
  } else if (response.status === 404) {
    console.log("Movie not found");
  } else {
    console.log("Error");
  }
};

getMovies();
