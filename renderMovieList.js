import showMovieDetails from "./showMovieDetails";

export default function renderMovieList(
    movies,
    currentPage,
    resultsPerPage = 10
) {
    const movieListElement = document.getElementById("movieList");
    movieListElement.innerHTML = "";

    // Calculate the start and end indices of movies to display on the current page
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = Math.min(startIndex + resultsPerPage, movies.length);

    // Loop through the movies array and create a component for each movie
    for (let i = startIndex; i < endIndex; i++) {
        const movie = movies[i];

        const movieItem = document.createElement("div");

        const posterImg = document.createElement("img");
        posterImg.src = movie.Poster;
        posterImg.alt = movie.Title;

        const movieName = document.createElement("span");
        movieName.textContent = movie.Title;

        movieItem.appendChild(posterImg);
        movieItem.appendChild(movieName);

        // Add a click event listener to the list item to show movie details when clicked
        movieItem.addEventListener("click", () =>
            showMovieDetails(movie.imdbID)
        );

        movieListElement.appendChild(movieItem);
    }
}
