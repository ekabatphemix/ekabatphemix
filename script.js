const apiKey = 'abcd7db57a3c0318d19c260e2eb00567';

// Function to fetch and display top 10 movies
async function fetchTopMovies() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
        const data = await response.json();

        const movieGrid = document.getElementById('movieGrid');
        movieGrid.innerHTML = ''; // Clear existing content

        data.results.slice(0, 10).forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';

            // Create and populate card elements (poster, title, release date)
            const poster = document.createElement('img');
            poster.src = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;
            poster.alt = movie.title;
            poster.setAttribute('data-testid', 'movie-poster');

            const title = document.createElement('h2');
            title.textContent = movie.title;
            title.setAttribute('data-testid', 'movie-title');

            const releaseDate = document.createElement('p');
            releaseDate.textContent = `Release Date: ${movie.release_date}`;
            releaseDate.setAttribute('data-testid', 'movie-release-date');

            // Append elements to the movieCard
            movieCard.appendChild(poster);
            movieCard.appendChild(title);
            movieCard.appendChild(releaseDate);

            // Append the movieCard to the movieGrid
            movieGrid.appendChild(movieCard);
        });
    } catch (error) {
        console.error('Error fetching top movies:', error);
    }
}

// Function to fetch and display movies based on user search query
async function searchMovies(query) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`);
        const data = await response.json();

        const movieGrid = document.getElementById('movieGrid');
        movieGrid.innerHTML = ''; // Clear existing content

        data.results.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';

            // Create and populate card elements (poster, title, release date)
            const poster = document.createElement('img');
            poster.src = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;
            poster.alt = movie.title;
            poster.setAttribute('data-testid', 'movie-poster');

            const title = document.createElement('h2');
            title.textContent = movie.title;
            title.setAttribute('data-testid', 'movie-title');

            const releaseDate = document.createElement('p');
            releaseDate.textContent = `Release Date: ${movie.release_date}`;
            releaseDate.setAttribute('data-testid', 'movie-release-date');

            // Append elements to the movieCard
            movieCard.appendChild(poster);
            movieCard.appendChild(title);
            movieCard.appendChild(releaseDate);

            // Append the movieCard to the movieGrid
            movieGrid.appendChild(movieCard);
        });
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
}

// Event listener for the search input field
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query.length >= 3) {
            searchMovies(query);
        }
    }
});

// Call the fetchTopMovies function to load top movies on page load
fetchTopMovies();
