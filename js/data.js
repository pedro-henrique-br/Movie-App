const API_KEY = "1127ba52316bc9b570b2661fbd7d2404"

const BASE_URL = `https://api.themoviedb.org/3`

const fetchMovies = async (endPoint, query = "") => {
  const url = `${BASE_URL}${endPoint}${query}&api_key=${API_KEY}`
  const response = await fetch(url)
  const data = await response.json()
  getAllMovies(data)
}

const getPopularMovies = () => {
  return fetchMovies("/movie/12?")
}

const searchMovies = (query) => {
  return fetchMovies("/search/movie?", `query=${query}`)
}

searchMovies("harry potter".replace(" ","+"))

const getAllMovies = (data) => {
  console.log(data)
}

getPopularMovies()