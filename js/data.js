const API_KEY = "1127ba52316bc9b570b2661fbd7d2404";
const BASE_URL = `https://api.themoviedb.org/3`;

const fetchMovies = async (endPoint, query = "") => {
  try {
    const url = `${BASE_URL}${endPoint}${query}&api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const searchMovies = async (query) => {
  moviesContainer.innerHTML = "";
  try {
    let data = await fetchMovies("/search/movie?query=", query);
    if (data.total_results === 0) {
      moviesContainer.innerHTML = `<h5 style="color: #ffff">${query.replace(
        "+",
        " "
      )} not found</h5>`;
    }
    for (const movie of data.results) {
      data = await fetchMovies(`/movie/${movie.id}?`);
      createCard(data);
    }
  } catch (error) {
    console.log(error);
  }
};
