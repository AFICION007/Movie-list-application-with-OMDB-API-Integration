function showMovieDetails(movieId, cacheKey) {
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
        const moviesData = JSON.parse(cachedData);
        const selectedMovie = moviesData.find(
            (movie) => movie.imdbID === movieId
        );

        if (selectedMovie) {
            displayMovieDetails(selectedMovie);
            return;
        }
    }
    //movie details not found in localStorage
    fetchMovieDetailsFromAPI(movieId);
}

function displayMovieDetails(movieData) {
    const movieDetailsSection = document.getElementById("movieDetails");
    movieDetailsSection.innerHTML = "";

    const movieDetailsElement = createMovieDetailsElement(movieData);
    movieDetailsSection.appendChild(movieDetailsElement);
}

function fetchMovieDetailsFromAPI(movieId) {
    const apiKey = "cc49bf55";
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}&plot=full`;

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((movieData) => {
            displayMovieDetails(movieData);
        })
        .catch((error) => {
            console.error("Error fetching movie details:", error);
            displayErrorMessage("Failed to fetch movie details.");
        });
}

function createMovieDetailsElement(movieData) {
    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("movie-details");

    // Create and add the movie poster image
    const posterImage = document.createElement("img");
    posterImage.src = movieData.Poster;
    posterImage.alt = `${movieData.Title} Poster`;
    detailsContainer.appendChild(posterImage);

    // Create elements for various movie details
    const titleElement = document.createElement("h2");
    titleElement.textContent = movieData.Title;

    const yearElement = document.createElement("p");
    yearElement.textContent = `Year: ${movieData.Year}`;

    const genreElement = document.createElement("p");
    genreElement.textContent = `Genre: ${movieData.Genre}`;

    const plotElement = document.createElement("p");
    plotElement.textContent = `Plot: ${movieData.Plot}`;

    // Append the elements to the container
    detailsContainer.appendChild(titleElement);
    detailsContainer.appendChild(posterImage);
    detailsContainer.appendChild(yearElement);
    detailsContainer.appendChild(genreElement);
    detailsContainer.appendChild(plotElement);

    return detailsContainer;
}

function displayErrorMessage(message) {
    const movieDetailsSection = document.getElementById("movieDetails");
    movieDetailsSection.innerHTML = `<p>${message}</p>`;
}
