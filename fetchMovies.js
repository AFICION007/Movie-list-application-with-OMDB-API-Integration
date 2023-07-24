async function fetchMovies(searchQuery, page, resultsPerPage = 10) {
    const apiKey = "cc49bf55";
    //We use encodeURIComponent() to ensure that the search query is properly encoded before appending it to the URL.
    //This handles special characters and prevents potential issues with invalid URLs.
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
        searchQuery
    )}&page=${page}&r=json&type=movie`;

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
