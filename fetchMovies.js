// Global variables
const apiKey = "cc49bf55";

// We use encodeURIComponent() to ensure that the search query is properly encoded before appending it to the URL.
// This handles special characters and prevents potential issues with invalid URLs.
const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
    searchQuery
)}&r=json&type=movie`;

const cacheKey = `movies_${searchQuery}`;

async function fetchMovies(resultsPerPage = 10) {
    // check if the cached data is already present in localStorage
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
        return JSON.parse(cachedData);
    }

    // else fetch it from Omdb api
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data.Response === "False") {
            throw new Error(data.Error || "No movies found.");
        }

        const totalPages = Math.ceil(data.totalResults / resultsPerPage);
        const movies = data.Search || [];

        // Cache the fetched data in localStorage for later usage
        const dataToCache = { movies, totalPages };
        localStorage.setItem(cacheKey, JSON.stringify(dataToCache));

        return {
            movies,
            totalPages,
        };
    } catch (error) {
        console.error("Error fetching movies:", error.message);
        return {
            movies: [],
            totalPages: 0,
        };
    }
}
