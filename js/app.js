const moviesContainer = document.querySelector(".movies-container")
const input = document.getElementById("input-field")
const asideContainer = document.getElementById("aside-movie")

const getMovies = async (maxIndex = 25) => {
  for(let index = 1; index <= maxIndex; index++){
    try {
      const data = await fetchMovies(`/movie/${index}?`)
      if(!data.hasOwnProperty("status_code")){
        createCard(data)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

window.addEventListener("load", () => getMovies())

const createCard = (data) => {
  const { poster_path, title, vote_average, runtime } = data

  let card = document.createElement("div")
  card.className = "card"
  card.style.border = "none"
  card.addEventListener("click", () => aside(data))
  card.innerHTML = `
    <div>
        <img src=${poster_path ? (`https://image.tmdb.org/t/p/w500/${poster_path}`) : ("https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg")} class="card-img-top" alt="${title} img">
      <div class="card-body">
        <h6>${title}</h6>
        <div class="movie-info"
          <p>${(vote_average).toFixed(1)}</p>
          <p>${runtime || "runtime is undefined"}  min</p>
        </div>
      </div>
    </div>
  `
  moviesContainer.appendChild(card)
  moviesContainer.querySelector(".card")
}

const aside = (data) => {
  asideContainer.style.opacity = "1"
  asideContainer.style.display = "flex"
  asideContainer.style.width = "450px"
  console.log(data.title)
}

let typingTimeout;

input.addEventListener("keyup", () => {
  clearTimeout(typingTimeout)
  typingTimeout = setTimeout(() => {
    const inputValue = input.value.trim().replace(" ", "+")
    if(inputValue) {
      moviesContainer.innerHTML = ""
      searchMovies(inputValue)
    } else {
      moviesContainer.innerHTML = ""
      getMovies()
    }
  }, 300) // Aguarda 300ms antes de realizar a busca
})


