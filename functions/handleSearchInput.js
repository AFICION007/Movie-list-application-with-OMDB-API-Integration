const searchBox = document.getElementById("searchBox");
searchBox.addEventListener("input", handleSearchInput);

// Function to handle search query input and display real-time results
function handleSearchInput(event) {
    const searchQuery = event.target.value.trim();

    if (searchQuery === "") {
        currentSearchQuery = "";

        fetchMovies(currentSearchQuery, currentPage)
            .then(({ movies }) => {
                renderMovieList(movies);
            })
            .catch((error) => console.error(error));
    } else {
        currentSearchQuery = searchQuery;

        // Call the OMDB API to get real-time search results
        fetchMovies(currentSearchQuery)
            .then(({ movies }) => {
                renderMovieList(movies);

                //resetting the global variable
                currentPage = 1;
            })
            .catch((error) => console.error(error));
    }
}
