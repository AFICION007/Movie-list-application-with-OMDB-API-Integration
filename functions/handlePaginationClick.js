import renderMovieList from "./renderMovieList";

// Global variables to keep track of current page and results per page
const cacheKey = `movies_${searchQuery}`;
const cachedData = JSON.parse(localStorage.getItem(cacheKey));
const { movies, totalPages } = cachedData;

let currentPage = 1;
const resultsPerPage = 10;

const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

prevButton.addEventListener("click", handlePaginationClick);
nextButton.addEventListener("click", handlePaginationClick);

function handlePaginationClick(event) {
    const target = event.target;

    if (target.classList.contains("pagination-button")) {
        // Update the current page based on the clicked button
        if (target.id === "prevButton") {
            currentPage = Math.max(currentPage - 1, 1);
        } else if (target.id === "nextButton") {
            currentPage = Math.min(currentPage + 1, totalPages);
        }

        renderMovieList(movies, currentPage, resultsPerPage);
    }
}
