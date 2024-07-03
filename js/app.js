const moviesContainer = document.querySelector(".movies-container");
const input = document.getElementById("input-field");
const asideContainer = document.getElementById("aside-movie");
const closeButton = document.getElementById("close-button");


const getMostRatedMovies = async () => {
  try {
    const data = await fetchMovies(`/movie/top_rated?language=en-US&page=1`);
    for (const movieId of data.results) {
      getMovieData(movieId.id);
    }
  } catch (error) {
    console.log(error);
  }
};

const getMostPopularMovies = async () => {
  try {
    const data = await fetchMovies(`/movie/popula?language=en-US&page=1`);
    for (const movieId of data.results) {
      getMovieData(movieId.id);
    }
  } catch (error) {
    console.log(error);
  }
};

const getTrendingMovies = async () => {
  try {
    const data = await fetchMovies(`/trending/movie/day?language=en-US`);
    console.log(data);
    for (const movieId of data.results) {
      getMovieData(movieId.id);
    }
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", () => getTrendingMovies());

const getMovieData = async (movieId) => {
  try {
    const data = await fetchMovies(`/movie/${movieId}?`);
    createCard(data);
  } catch (error) {
    console.log(error);
  }
};

const createCard = (data) => {
  const { poster_path, title, vote_average, runtime } = data;

  let card = document.createElement("div");
  card.className = "card";
  card.style.border = "none";
  card.addEventListener("click", () => aside(data));
  card.innerHTML = `
    <div>
        <img src=${
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"
        } class="card-img-top" alt="${title} img">
      <div class="card-body">
        <h6>${title}</h6>
        <div class="movie-info"
          <p>${vote_average.toFixed(1)}</p>
          <p>${runtime ? runtime + " " + "min" : "runtime is undefined"}  </p>
        </div>
      </div>
    </div>
  `;
  moviesContainer.appendChild(card);
  moviesContainer.querySelector(".card");
};

let typingTimeout;

input.addEventListener("keyup", () => {
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    const inputValue = input.value.trim().replace(" ", "+");
    if (inputValue) {
      moviesContainer.innerHTML = "";
      searchMovies(inputValue);
    } else {
      moviesContainer.innerHTML = "";
      getTrendingMovies();
    }
  }, 300); // Aguarda 300ms antes de realizar a busca
});

const aside = (data) => {
  if (asideContainer.querySelector(".aside-info")) {
    asideContainer.querySelector(".aside-info").remove();
  }
  asideContainer.style.opacity = "1";
  asideContainer.style.width = "550px";
  asideContainer.style.right = "0vw";
  setTimeout(() => {
    const { poster_path, title, vote_average, runtime } = data;

    let asideInfo = document.createElement("div");
    asideInfo.classList = "aside-info";
    asideInfo.innerHTML = `
    <div>
    <img src=${
      poster_path
        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
        : "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"
    } class="card-img-top" alt="${title} img">
    <div class="card-body">
    <h6>${title}</h6>
    <div class="movie-info"
    <p>${vote_average.toFixed(1)}</p>
    <p>${runtime || "runtime is undefined"}  min</p>
    </div>
    </div>
    </div>
    `;
    asideContainer.appendChild(asideInfo);
  }, 100);
};

closeButton.addEventListener("click", () => closeAside());

const closeAside = () => {
  console.log("click");
  asideContainer.querySelector(".aside-info").innerHTML = "";
  asideContainer.style.opacity = "0";
  asideContainer.style.width = "0";
  asideContainer.style.right = "5vw";
};

document.querySelectorAll(".tag-container p").forEach()