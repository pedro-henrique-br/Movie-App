const moviesContainer = document.querySelector(".movies-container");
const input = document.getElementById("input-field");
const asideContainer = document.getElementById("aside-movie");
const closeButton = document.getElementById("close-button");
const pageContainer = document.querySelector(".page-container");
const menuButton = document.getElementById("menu-hamburguer");
const favoritesButton = document.getElementById("favorites")

menuButton.addEventListener("click", () => {
  menuButton.style.display = "none"
  menuButton.style.opacity = 0;
  document.querySelector("nav").style.left = "50px"
  document.querySelector("aside").style.transform = "translateX(0%)";
  document.querySelector(".main").style.marginLeft = "150px"
  if(window.screen.width <= 600){
    document.querySelector("#close-button-aside").style.marginLeft = "85vw"
    document.querySelector("#close-button-aside").style.marginTop = "1vh"
    document.querySelector(".main").style.display = "none"
    document.querySelectorAll(".link").forEach((link) => link.style.width = "100vw")
  }
});

const getMovies = async (option, page = 1) => {
  pageContainer.style.display = "none"
  const language = `pt-BR`;
  document
    .querySelectorAll(".tag-container p")
    .forEach((tag) => (tag.style.background = `none`));
  let url;
  switch (option) {
    case `Popular`:
      document.querySelector("#popular-button").style.background = `#1f2a30`;
      url = `/movie/popular?language=${language}S&page=${page}`;
      break;
    case `Top Rated`:
      document.querySelector("#topRated-button").style.background = "#1f2a30";
      url = `/movie/top_rated?language=${language}&page=${page}`;
      break;
    default:
      document.querySelector("#trending-button").style.background = "#1f2a30";
      url = `/movie/upcoming?language=en-US&page=${page}`;
  }
  try {
    const data = await fetchMovies(url);
    pageContainer.style.display = "none"
    for (const movieId of data.results) {
      getMovieData(movieId.id);
    }
  } catch (error) {
    console.log(error);
  }
  return page;
};

window.addEventListener("load", () => getMovies());

const getMovieData = async (movieId) => {
  moviesContainer.innerHTML = "";
  try {
    const data = await fetchMovies(`/movie/${movieId}?`);
    return createCard(data);
  } catch (error) {
    console.log(error);
  }
};

let cardLoadCount = 0

const createCard = (data) => {
  let card = document.createElement("div");
  card.style.opacity = "0";

  card.style.border = "none";
  card.className = "card";
  setTimeout(() => {
    const { poster_path, title, runtime } = data;

    card.addEventListener("click", () => aside(data));
    card.style.background = "none"
    card.innerHTML = `
    <img src=${
      poster_path
        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
        : "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"
    } class="card-img-top" alt="${title} img"
      style="height: ${poster_path ? "" : "450px"}">
      <div class="card-body">
        <h6 class="card-title">${title}</h6>
          ${
          runtime === 0
            ? ""
            : `<h6 class="card-runtime" style="background: none; color: #ffff">${runtime} min</h6>`
        }
        </div>
          `;
    card.style.opacity = "1";
    moviesContainer.appendChild(card);
    cardLoadCount++
    if(document.querySelectorAll(".card").length <= 20){
      getCurrentPage(defaultPages)
    }
  }, 300);
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
      getMovies();
    }
  }, 300);
});

let defaultPages = [1, 2, 3, 4, 5];

let currentPage;

const getCurrentPage = (defaultPages) => {
  pageContainer.innerHTML = "";
  setTimeout(() => {
    let pages = document.createElement("div");
    pages.className = "page-container";
    pages.innerHTML = `
    <div class="btn-group">
    ${defaultPages
    .map((page) => {
      return `<a class="btn btn-primary">${page}</a>`;
    })
    .join("")}
    </div>
    `;
    pages.querySelectorAll("a").forEach((page) => {
      page.addEventListener("click", () => {
        const pageValue = Number(page.textContent);
        getMovies("", pageValue);
        currentPage = defaultPages.indexOf(pageValue);
      });
    });
    pageContainer.appendChild(pages);
  }, 300);
};

const aside = (data) => {
  if (asideContainer.querySelector(".aside-info")) {
    asideContainer.querySelector(".aside-info").remove();
  }
  asideContainer.style.transform = "translateX(0%)";
  setTimeout(() => {
    const {
      title,
      vote_average,
      runtime,
      genres,
      release_date,
      overview,
      backdrop_path,
      production_companies,
    } = data;
    const genresArray = new Array();
    genres.forEach((genre) => genresArray.push(genre.name));

    let asideInfo = document.createElement("div");
    asideInfo.classList = "aside-info";
    asideInfo.style.background = "#192227";
    asideInfo.innerHTML = `
    <img
      id="close-button"
      width="48"
      height="48"
      src="https://img.icons8.com/fluency/48/close-window--v1.png"
      alt="close-window--v1" />
    </div>
    <div class="card-body">
      <img src=${
        backdrop_path
          ? `https://image.tmdb.org/t/p/w500/${backdrop_path}`
          : "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"
      } 
      class="card-img-top">
      <div class="card-title" style="background: none;" >
        <h4 style="background: none; color: #ffff">${title}</h6>
        <h4 style="background: none; color: #ffffff96">${release_date.slice(
          0,
          4
        )}</h4>
      </div>
      <div class="movie-info"
        <div class="sub-info" style="word-wrap: wrap;">
          <h6 style="color: #508aa7; background: none;">${
            production_companies[0] ? production_companies[0].name : ""
          }</h6>
          <h6 style="background: none; margin-left: 20px;">${genresArray.map(
            (genre) => ` ${genre}`
          )}</h6>
        </div>
        <p class="overview" style="background: none; color: #ffffff96; border-top: 1px solid #ffffff3f; padding-top: 10px;">
          ${overview}
        </p>
        <div id="movie-info" class="sub-info" style="background: none;">
          ${
            vote_average === 0.0
              ? ""
              : `<p style="background: none; color: #ffff"><span style="color: #d3830afb; background: none;">IMDb</span> ${vote_average.toFixed(
                  1
                )}</p>`
          }
          ${
            runtime === 0
              ? ""
              : `<p style="background: none; color: #ffff">\uD83D\uDD57 ${runtime} min</p>`
          }
        </div>
        <div class="buttons-container">
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-primary">Favorite</button>
            <button type="button" class="btn btn-primary">Watch later</button>
            <button type="button" class="btn btn-primary">Home Page</button>
          </div>
        </div>
        </div>
      </div>
    `;

    asideContainer.appendChild(asideInfo);
    document
      .querySelector("#close-button")
      .addEventListener("click", () => closeAside());
  }, 100);
};

const closeAside = () => {
  asideContainer.style.transform = "translateX(100%)";
  asideContainer.querySelector(".aside-info").innerHTML = "";
};

document.querySelectorAll(".tag-container p").forEach((option) => {
  option.style.background = "none";
  option.addEventListener("click", () => {
    option.style.background = "none";
    moviesContainer.innerHTML = "";
    setTimeout(() => {
      const optionName = option.textContent;
      getMovies(optionName);
    }, 150);
  });
});

document.querySelector("aside img").addEventListener("click", () => {
  menuButton.style.display = "flex";
  document.querySelector("aside").style.transform = "translateX(-100%)";
  document.querySelector("nav").style.left = "0px"
  document.querySelector(".main").style.marginLeft = "0px"
  if(window.screen.width <= 600){
    setTimeout(() => {
      document.querySelector(".main").style.display = "block"
    }, 300)
  }
  setTimeout(() => {
    menuButton.style.opacity = "1";
  }, 200)
});

getCurrentPage(defaultPages)

favoritesButton.addEventListener("click", () => {
  window.location.href = "favorites.html"
})
