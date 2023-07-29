function handleUserRatingAndComments(movieId) {
    // Get existing ratings and comments map object from local storage
    var storedData = localStorage.getItem("movieRatingsComments") || {};

    const data = retrieveRatingCommentsData(movieId);
    if (data) {
        storedData[movieId] = data;
    }

    localStorage.setItem("movieRatingsComments", JSON.stringify(storedData));
}

function retrieveRatingCommentsData(movieId) {
    const movie = document.querySelector(`#movie_${movieId}`);

    if (!movie) {
        console.error(`Movie with ID "${movieId}" not found.`);
        return null;
    }

    const ratingInput = movie.querySelector(".rating-input").value;
    const commentInput = movie.querySelector(".comment-input").value;

    // Check if the user provided a rating or comment
    if (rating && comment) {
        return {
            rating: parseFloat(rating),
            comment: comment.trim(),
        };
    } else if (comment) {
        return {
            rating: undefined,
            comment: comment.trim(),
        };
    } else {
        return {
            rating: parseFloat(rating),
            comment: undefined,
        };
    }

    return null;
}
