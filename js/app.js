const moviesContainer = document.querySelector(".movies-container");
const input = document.getElementById("input-field");
const asideContainer = document.getElementById("aside-movie");
const closeButton = document.getElementById("close-button");
const pageContainer = document.querySelector(".page-container");

let defaultPages = [1, 2, 3, 4, 5];

let currentPage

const getCurrentPage = () => {
  let pages = document.createElement("div");
  pages.innerHTML = `
          <div class="btn-group">
            ${defaultPages.map((page) => {
              return `<a class="btn btn-primary active">${page}</a>`;
            })}
          </div>
          `;
    pages.querySelectorAll("a").forEach((page) => {
    page.addEventListener("click", () => {
      const pageValue = Number(page.textContent);
      getMovies("", pageValue);
      currentPage = defaultPages.indexOf(pageValue)
    });
  });
  pageContainer.appendChild(pages);
};

getCurrentPage(defaultPages);

const getMovies = async (option, page = 1) => {
  const language = `pt-BR`;
  let url;
  switch (option) {
    case `Popular`:
      url = `/movie/popular?language=${language}S&page=${page}`;
      break;
    case `Top Rated`:
      url = `/movie/top_rated?language=${language}&page=${page}`;
      break;
    default:
      url = `/movie/upcoming?language=en-US&page=${page}`;
  }
  try {
    const data = await fetchMovies(url);
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
    if (!data) {
      pages.innerHTML = "";
    }
    return createCard(data);
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
  <div class="card-container">
  <img src=${
    poster_path
      ? `https://image.tmdb.org/t/p/w500/${poster_path}`
      : "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"
  } class="card-img-top" alt="${title} img">
      <div class="card-body">
        <h6>${title}</h6>
        <div class="movie-info"
        <p>${vote_average === 0 ? "" : vote_average.toFixed(1)}</p>
        <p>${runtime ? `${runtime} min` : ""}  </p>
        </div>
        </div>
        </div>
        `;
  moviesContainer.appendChild(card);
  card.style.opacity = "1";
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

const aside = (data) => {
  if (asideContainer.querySelector(".aside-info")) {
    asideContainer.querySelector(".aside-info").remove();
  }
  asideContainer.style.transform = "translateX(0%)";
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
  asideContainer.style.transform = "translateX(100%)";
  asideContainer.querySelector(".aside-info").innerHTML = "";
};

document.querySelectorAll(".tag-container p").forEach((option) =>
  option.addEventListener("click", () => {
    moviesContainer.innerHTML = "";
    setTimeout(() => {
      const optionName = option.textContent;
      getMovies(optionName);
      getCurrentPage();
    }, 150);
  })
);
